<?php

namespace App\Http\Controllers\Promoters;

use App\Http\Controllers\Controller;
use App\Models\KRERA\UserProfile;
use App\Services\ProjectDocument\ConsideredDocuments;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class PromoterListController extends Controller
{
    public function __invoke(Request $request): Response
    {

        $promoters = UserProfile::whereHas('project', function ($query) {
            $query->where('RoleID', 1)
                ->whereHas('certificateInfo')
                ->registered();
        })
            ->with(['individualDistrict', 'companyDistrict',
                'logo' => function ($query) {
                    $query->select('UserID', 'LogoImageType', 'LogoImagefileName');
                },
                'project' => function ($query) {
                    $query->select('UserID', 'Name', 'ID')
                        ->whereHas('certificateInfo')
                        ->whereHas('statusMap', function ($query) {
                            $query->whereNull('IsWithdraw');
                        })
                        ->with('documents', function ($query) {
                            $query->select('ID', 'DocID', 'ProjectID')
                                ->where('DocID', ConsideredDocuments::FORM_SIX)
                                ->whereNotNull('FileName');
                        });
                },
            ])
            ->when($request->filled('search'), function ($query) use ($request) {
                $query->where(function ($query) use ($request) {
                    $query->where(DB::raw("IndivisualName + ' ' + IndivisualMName + ' ' + IndivisualLName"), 'LIKE', '%'.$request->search.'%')
                        ->orWhere('CompanyName', 'LIKE', '%'.$request->search.'%')
                        ->orWhereHas('companyDistrict', function ($query) use ($request) {
                            $query->where('Districtname', 'LIKE', '%'.$request->search.'%');
                        })
                        ->orWhereHas('individualDistrict', function ($query) use ($request) {
                            $query->where('Districtname', 'LIKE', '%'.$request->search.'%');
                        });
                });
            })
            ->paginate(20)
            ->withQueryString();

        return Inertia::render('Promoter/PromoterListPage', [
            'promoters' => $promoters,
            'oldSearch' => $request->search ?? '',
        ]);

    }
}
