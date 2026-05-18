<?php

namespace App\Http\Controllers\Project;

use App\Exports\ProjectListExport;
use App\Http\Controllers\Controller;
use App\Libs\CustomPagination;
use App\Services\Locality\LocalityListService;
use App\Services\Project\ProjectListService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Maatwebsite\Excel\Facades\Excel;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class ProjectListController extends Controller
{
    public function index(Request $request, ProjectListService $projectListService, LocalityListService $localityListService): Response
    {

        $projectListService->fetchMeta(
            $request->project_name,
            $request->district,
            $request->taluk,
            $request->village,
            $request->work_status,
            $request->promoter_name,
            $request->registration_number,
            $request->from,
            $request->to
        );

        $page = $request->page ?? 1;

        $offset = (((int)$page - 1) * 20) + 1;

        $pagination = new CustomPagination($projectListService->getData($offset), 20, $projectListService->getCount());

        return Inertia::render('ProjectList/ProjectListPage', [
            'projects' => $pagination->paginate(),
            'districts' => $localityListService->getDistricts(),
            'oldProjectName' => $request->project_name ?? '',
            'oldDistrict' => $request->district ?? '',
            'oldTaluk' => $request->taluk ?? '',
            'oldVillage' => $request->village ?? '',
            'oldPincode' => $request->pincode ?? '',
            'oldFrom' => $request->from ?? '',
            'oldTo' => $request->to ?? '',
            'oldWorkStatus' => $request->work_status ?? '',
            'oldPromoterName' => $request->promoter_name ?? '',
            'oldRegistrationNumber' => $request->registration_number ?? '',
        ]);
    }

    public function exportExcel(): BinaryFileResponse
    {
        return Excel::download(new ProjectListExport(), 'project_list.xlsx');
    }
}
