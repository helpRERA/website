<?php

namespace App\Http\Controllers;

use App\Models\KRERA\ProjectMaster;
use App\Repository\Project\ProjectDocumentRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;

class TestController extends Controller
{
    public function __invoke(ProjectDocumentRepository $documentRepository, Request $request)
    {
        //        return [
        //            'order' => Schema::connection('k_rera')->getColumnListing('tbl_ExtensionDeskStatus'),
        //            'file' => Schema::connection('k_rera_docs')->getColumnListing('tbl_ExtMoreInfoDocs'),
        //        ];

        return [
            'Area' => ProjectMaster::whereHas('certificateInfo')
                ->registered()
                ->leftJoin('tbl_certificateP', 'tbl_Project.ID', '=', 'tbl_certificateP.ProjectID')
                ->groupByRaw('Right(tbl_certificateP.CertificateNo, 4), ProjectType')
                ->whereNotNull('Area')
                ->whereNot('Area', '.00')
                ->selectRaw(
                    'Right(tbl_certificateP.CertificateNo, 4) as ProjectYear, ProjectType,'
                    .'SUM(tbl_Project.Area) as Area'
                )
                ->get(),
            'TotalFloorAreaOfProjectProposedForRegistration' => ProjectMaster::whereHas('certificateInfo')
                ->registered()
                ->leftJoin('tbl_certificateP', 'tbl_Project.ID', '=', 'tbl_certificateP.ProjectID')
                ->groupByRaw('Right(tbl_certificateP.CertificateNo, 4), ProjectType')
                ->whereNotNull('TotalFloorAreaOfProjectProposedForRegistration')
                ->whereNot('TotalFloorAreaOfProjectProposedForRegistration', '.00')
                ->selectRaw(
                    'Right(tbl_certificateP.CertificateNo, 4) as ProjectYear, ProjectType, '
                    .'SUM(tbl_Project.TotalFloorAreaOfProjectProposedForRegistration) as TotalFloorAreaOfProjectProposedForRegistration'
                )
                ->get(),
            'TotalFloorAreaUnderResidentialUse' => ProjectMaster::whereHas('certificateInfo')
                ->registered()
                ->leftJoin('tbl_certificateP', 'tbl_Project.ID', '=', 'tbl_certificateP.ProjectID')
                ->groupByRaw('Right(tbl_certificateP.CertificateNo, 4), ProjectType')
                ->whereNotNull('TotalFloorAreaUnderResidentialUse')
                ->whereNot('TotalFloorAreaUnderResidentialUse', '.00')
                ->selectRaw(
                    'Right(tbl_certificateP.CertificateNo, 4) as ProjectYear, ProjectType,'
                    .'SUM(tbl_Project.TotalFloorAreaUnderResidentialUse) as TotalFloorAreaUnderResidentialUse'
                )
                ->get(),
            'TotalFloorAreaUnderOtherUse' => ProjectMaster::whereHas('certificateInfo')
                ->registered()
                ->leftJoin('tbl_certificateP', 'tbl_Project.ID', '=', 'tbl_certificateP.ProjectID')
                ->groupByRaw('Right(tbl_certificateP.CertificateNo, 4), ProjectType')
                ->whereNotNull('TotalFloorAreaUnderOtherUse')
                ->whereNot('TotalFloorAreaUnderOtherUse', '.00')
                ->selectRaw(
                    'Right(tbl_certificateP.CertificateNo, 4) as ProjectYear, ProjectType, '
                    .'SUM(tbl_Project.TotalFloorAreaUnderOtherUse) as TotalFloorAreaUnderOtherUse'
                )
                ->get(),
        ];

    }
}
