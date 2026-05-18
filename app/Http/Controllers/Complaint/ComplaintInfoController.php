<?php

namespace App\Http\Controllers\Complaint;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ComplaintInfoController extends Controller
{
    public function __invoke(Request $request): JsonResponse
    {
        $complaint = DB::connection('k_rera')
            ->select("
            select ROW_NUMBER() over(order by ARC.AlreadyRegisteredComplaintsId desc) AS Row, count(1) OVER() as TotalCount,
                                ARC.AlreadyRegisteredComplaintsId as AlreadyRegisteredComplaintsId, ARC.Complainant as Complainant,
                                ARC.ComplaintNo as ComplaintNo,ARC.ProjRegNo as ProjRegNo,
                                case when isnull(ARC.ProjectId,'')='' then ISNULL(ARC.ProjectName,'') else p.name end as ProjectName, ARC.Respondent as
                                Respondent, ISNULL(ARC.OrderTypeId,0) as OrderTypeId, ARC.OrderIsValue as OrderIsValue,isnull(ComplaintYear,0)ComplaintYear
                                ,isnull(ARC.DocName,'') DocumentName,c.ComplaintType,c.ComplaintTypeId,ot.OrderTypeValue
                                ,isnull(isDisposed,0) Disposed,DateofFiling,isnull(Bench,0)BanchValueId,ReliefSought,Orderspassed,RemarksStatus,EpDetails
                                ,AvailableReliefSought,AvailableReliefSoughtId,isnull(projectId,'0')projectId,isnull(AlreadyRegisteredProject,'No')AlreadyRegisteredProject
                from AlreadyRegisteredComplaints ARC with(nolock)
                left join ComplaintTypeTable c on ARC.ComplaintTypeId=c.ComplaintTypeId
                LEFT join OrderTypeTable ot on arc.OrderTypeId=ot.OrderTypeId
                left join tbl_Project p on ARC.ProjectId=p.ID
                where ARC.AlreadyRegisteredComplaintsId= ?
                order by ARC.AlreadyRegisteredComplaintsId desc
            ", [$request->input('complaint_id')]);

        return response()->json($complaint);
    }
}
