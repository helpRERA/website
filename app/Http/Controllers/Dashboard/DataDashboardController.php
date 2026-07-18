<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\KRERA\ApartmentType;
use App\Models\KRERA\CertificateInfo;
use App\Models\KRERA\CommonDDMaster;
use App\Models\KRERA\District;
use App\Models\KRERA\ProjectMaster;
use App\Services\PageBuilder\FetchDataDependencyService;
use Inertia\Inertia;
use Inertia\Response;

class DataDashboardController extends Controller
{
    public function __invoke(FetchDataDependencyService $dataDependencyService): Response
    {

        // last four characters of CertificateNo
        /** @var array<int, object{year: string}> $years */
        $years = [];
        CertificateInfo::query()
            ->groupByRaw('RIGHT(CertificateNo, 4)')
            ->selectRaw('Right(CertificateNo, 4) as year')
            ->orderByRaw('RIGHT(CertificateNo, 4) DESC')
            ->get()
            ->each(function ($item) use (&$years) {
                if ($item->year != null && $item->year != '' && $item->year != '0') {
                    $years[] = $item;
                }
            });

        $projectTypes = CommonDDMaster::whereIn(
            'Id',
            ProjectMaster::whereHas('certificateInfo')
                ->registered()->groupBy('ProjectType')
                ->selectRaw('ProjectType')
                ->pluck('ProjectType')
        )->get();

        $registeredProjects = ProjectMaster::whereHas('certificateInfo')
            ->registered()
            ->with([
                'projectType' => function ($query) {
                    $query->select('Id', 'TypeName');
                },
            ])
            ->leftJoin('tbl_certificateP', 'tbl_Project.ID', '=', 'tbl_certificateP.ProjectID')
            ->selectRaw(
                'tbl_Project.ID,
                tbl_Project.Name,
                District,
                PType,
                ProjectStartDate,
                ProjectEndDate,
                TotalFloorAreaOfProjectProposedForRegistration,
                TotalFloorAreaUnderResidentialUse,
                TotalFloorAreaUnderOtherUse,
                NumberOfResidentialUnits,
                NumberOfCommercialUnits,
                Area,
                ProjectType, Right(tbl_certificateP.CertificateNo, 4) as ProjectYear ',
            )
            ->get();

        $districts = District::whereHas('state', function ($query) {
            $query->where('statename', 'KERALA');
        })
            ->english()
            ->get();

        $apartmentTypeSubQuery = ApartmentType::leftJoin(
            'tbl_CommonDDMaster',
            'tbl_BuildingApartmentType.ApartmentTypeDD',
            '=',
            'tbl_CommonDDMaster.Id'
        )
            ->groupByRaw('tbl_CommonDDMaster.TypeName, tbl_BuildingApartmentType.ProjectID')
            ->selectRaw('tbl_CommonDDMaster.TypeName as type, tbl_BuildingApartmentType.ProjectID,  count(*) as count');

        $apartmentCount = ProjectMaster::whereHas('certificateInfo')
            ->registered()
            ->leftJoinSub($apartmentTypeSubQuery, 'apartment_type', function ($join) {
                $join->on('tbl_Project.ID', '=', 'apartment_type.ProjectID');
            })
            ->leftJoin('tbl_certificateP', 'tbl_Project.ID', '=', 'tbl_certificateP.ProjectID')
            ->whereNotNull('apartment_type.type')
            ->groupByRaw('tbl_Project.District, apartment_type.type, tbl_Project.ProjectType, Right(tbl_certificateP.CertificateNo, 4)')
            ->selectRaw(
                'apartment_type.type, SUM(apartment_type.count) as count, tbl_Project.District, tbl_Project.ProjectType, Right(tbl_certificateP.CertificateNo, 4) as ProjectYear'
            )
            ->get();

        return Inertia::render('DataDashboard/DataDashboardPage', [
            'registeredProjects' => $registeredProjects,
            'districts' => $districts,
            'today' => now()->toDateString(),
            'promotersCount' => $dataDependencyService->promotersCount(),
            'complaintsCount' => $dataDependencyService->complaintsCount(),
            'registeredAgents' => $dataDependencyService->registeredAgents(),
            'years' => $years,
            'projectTypes' => $projectTypes,
            'apartmentTypeSummary' => $apartmentCount,
        ]);
    }
}
