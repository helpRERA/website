<?php

namespace App\Http\Controllers\Promoters;

use App\Http\Controllers\Controller;
use App\Models\KRERA\ProjectDocument;
use App\Models\KRERA\UserProfile;
use App\Services\ProjectDocument\ConsideredDocuments;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Inertia\Inertia;
use Inertia\Response;

class PromoterDetailController extends Controller
{
    public function __invoke(string $id): Response
    {
        $promoter = UserProfile::where('ID', $id)
            ->with([
                'partners' => function ($query) {
                    $query->select([
                        'ID',
                        'Userid',
                        'MDMID',
                        'RoleID',
                        'FName',
                        'MName',
                        'LName',
                        'Designation',
                        //                        "ProfileImage",
                        'MimeType',
                        'FileName',
                        'PanNo',
                        'HouseNo',
                        'Building',
                        'Street',
                        'Locality',
                        'Landmark',
                        'StateID',
                        'DivisionID',
                        'DistrictID',
                        'TalukaID',
                        'VillageID',
                        'PinCode',
                        'CreatedBy',
                        'CreatedOn',
                        'ModifiedBy',
                        'ModifiedOn',
                        //                        "AadharNo",
                        'MemberType',
                        'other',
                        'MobileNo',
                        'OfficeNo',
                        'FaxNo',
                        'EmailID',
                        'ContactPerson',
                        'ContactPersonDesignation',
                        'MemberOtherTaluka',
                        'MemberOtherVillage',
                        'OtherVillage',
                        'SecondaryMobileNo',
                        'deleteUserId',
                    ])
                        ->with('district.state', 'memberDesignation');
                },
                'individualDistrict',
                'companyDistrict',
                'experience',
                'trackRecord',
                'orgType',
                'logo' => function ($query) {
                    $query->select('UserID', 'LogoImageType', 'LogoImagefileName');
                },
                'project' => function ($query) {
                    $query->select('UserID', 'Name', 'ID', 'ProposedDateOfCompletion')
                        ->whereHas('certificateInfo')
                        ->whereHas('statusMap', function ($query) {
                            $query->whereNull('IsWithdraw');
                        })
                        /** @var HasMany<ProjectDocument> $query */
                        ->with('documents', function (HasMany $query) {
                            $query->select('ID', 'DocID', 'ProjectID')
                                ->where('DocID', ConsideredDocuments::FORM_SIX)
                                ->whereNotNull('FileName');
                        });
                },
            ])
            ->firstOrFail();

        return Inertia::render('Promoter/PromoterDetailPage', [
            'promoter' => $promoter,
            'today' => now()->toDateString(),
        ]);
    }
}
