<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\KRERA\ApartmentType;
use App\Models\KRERA\CertificateInfo;
use App\Models\KRERA\CommonDDMaster;
use App\Models\KRERA\District;
use App\Models\KRERA\ProjectMaster;
use App\Services\PageBuilder\FetchDataDependencyService;
use App\Services\Complaints\ComplaintsListService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DataDashboardController extends Controller
{
    public function __invoke(
        Request $request,
        FetchDataDependencyService $dataDependencyService,
        ComplaintsListService $complaintsListService
    ): Response {

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

     
            'complaintDashboard' => $this->buildComplaintDashboard($complaintsListService, $request->query('year')),
        ]);
    }

    private function buildComplaintDashboard(ComplaintsListService $complaintsListService, ?string $year = null): array
    {
        $complaintDashboardData = $complaintsListService->getDashboardData();

   
        $complaintDashboardData = collect($complaintDashboardData)
            ->filter(function ($item) {
                $y = $item['complaintYear'] ?? ($item->complaintYear ?? null);
                return $y !== null && $y !== '' && $y !== '0';
            })
            ->values();

    
        $complaintsByYear = $complaintDashboardData
            ->groupBy('complaintYear')
            ->map(function ($items, $year) {
                return [
                    'year' => $year,
                    'count' => $items->count(),
                ];
            })
            ->sortByDesc('year')
            ->values()
            ->toArray();

      
        $filtered = $year
            ? $complaintDashboardData->where('complaintYear', $year)->values()
            : $complaintDashboardData;

        $complaintsByType = [
            [
                'type' => 'K-RERA Authority',
                'count' => $filtered->where('rulingByMaharera', 1)->count(),
            ],
            [
                'type' => 'Adjudicating Officer',
                'count' => $filtered->where('judgementByOfficer', 1)->count(),
            ],
        ];

        $complaintsBySource = $filtered
            ->groupBy('tableName')
            ->map(function ($items, $source) {
                return [
                    'source' => $source,
                    'count' => $items->count(),
                ];
            })
            ->values()
            ->toArray();

        $complaintsWithFinalOrder = $filtered->where('finalOrder', 1)->count();
        $complaintsWithInterimOrder = $filtered->where('interiumOrder', 1)->count();

        return [
            'total' => $filtered->count(),
            'byYear' => $complaintsByYear,
            'byType' => $complaintsByType,
            'bySource' => $complaintsBySource,
            'finalOrders' => $complaintsWithFinalOrder,
            'interimOrders' => $complaintsWithInterimOrder,
            'recent' => $filtered->take(10)->values()->toArray(),
            'selectedYear' => $year,
        ];
    }
}