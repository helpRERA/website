<?php

namespace App\Http\Controllers\Dashboard\api;

use App\Http\Controllers\Controller;
use App\Models\KRERA\ProjectMaster;
use Illuminate\Support\Facades\DB;

class ProjectDataController extends Controller
{
    public function __invoke()
    {

        return ProjectMaster::whereHas('certificateInfo')
            ->registered()
            ->first();
        //        return DB::connection('k_rera')->table('AlreadyRegisteredComplaints')->first();

        $complaintsTable = DB::connection('k_rera')
            ->select(
                "SELECT
              a.ID,
              UH.RegistrationNo as ComplaintID,
              a.UserID,
              a.CNO,
              a.CertificateNo as RegistrationNO,
              ur.RulingbyMahaRERA as RulingByMaharera,
              ur.JudgementByOfficer as JudgementByOfficer,
              '0' Appellate,
              ur.CreatedOn RulingorJudge_Date,
              a.DivisionId,
              '' as CitizenComplaint_ID,
              ur.createdby as deskuser,
              (
                select
                  TOP 1 ComplainantName
                from
                  tbl_CitizenComplaint comp with(nolock)
                where
                  comp.complaintid = a.ID
              ) as ComplainantName,
              (
                select
                  TOP 1 Nameofrespondent
                from
                  tbl_CitizenRespondentDetails res with(nolock)
                where
                  res.complaintid = a.ID
              ) as RespondentName,
              ROW_NUMBER() OVER(
                PARTITION BY a.cno,
                a.CertificateNo
                order by
                  a.ID
              ) num,
              ur.OrderType as OrderType,
              'tbl_Complaint' AS Tbl_Name,
              a.AgentName as ProjectName,
              ISNULL(ur.ComplaintID, 0) AS InteriumOrder,
              ISNULL(ur1.ComplaintID, 0) AS FinalOrder,
              (
                UH.ComplaintNo + '/' + CONVERT(varchar, UH.ComplaintYear)
              ) ComplaintNo,
              UH.ComplaintYear
            FROM
              tbl_Complaint a
              left join tbl_UserHearingDetails UH on a.id = UH.ProjectID
              and UH.RoleID = 3
              and a.CreatedBy = UH.UserID outer Apply (
                select
                  top 1 RulingByMaharera,
                  JudgementByOfficer,
                  createdon,
                  createdby,
                  ComplaintID,
                  ordertype
                from
                  tbl_UploadRuling ura
                Where
                  a.id = URa.complaintid
                  and ura.OrderType = 59
                  and ura.divisionid = 1
                order by
                  createdon DESC
              ) UR outer Apply (
                select
                  top 1 RulingByMaharera,
                  JudgementByOfficer,
                  createdon,
                  createdby,
                  ComplaintID,
                  ordertype
                from
                  tbl_UploadRuling urb
                Where
                  a.id = urb.complaintid
                  and urb.OrderType = 60
                  and urb.divisionid = 1
                order by
                  createdon DESC
              ) UR1
            where
              ISNULL(UR.ordertype, UR1.ordertype) in (59, 60) "
            );

        //complaintNo recreated
        $appeal = DB::connection('k_rera')
            ->select(
                "SELECT
      a.RegisteredAppealId AS id,
      cast (
        a.ComplaintNo as varchar(50)
      ) as ComplaintID,
      a.CreatedBy AS UserID,
      a.ComplaintNo AS CNO,
      a.ProjectRegistrationNumber as RegistrationNO,
      '0' RulingByMaharera,
      '0' JudgementByOfficer,
      '1' Appellate,
      A.CreatedDate RulingorJudge_Date,
      '1' AS DivisionId,
      '' as CitizenComplaint_ID,
      A.CreatedBy as deskuser,
      A.AppellantName as ComplainantName,
      A.Respondent as RespondentName,
      ROW_NUMBER() OVER(
        PARTITION BY a.ComplaintNo,
        a.ProjectRegistrationNumber
        order by
          a.RegisteredAppealId
      ) num,
      A.OrderTypeId as OrderType,
      'RegisteredAppeal' AS Tbl_Name,
      a.ProjectName,
      CASE WHEN a.OrderTypeId = 1
      and isnull(DocName, '')<> '' THEN '1' else '0' END AS InteriumOrder,
      CASE WHEN a.OrderTypeId = 2
      and isnull(DocName, '')<> '' THEN '1' else '0' END AS FinalOrder,
      (
        a.ComplaintNo + '/' + CONVERT(varchar, a.ComplaintYear)
      ) ComplaintNo,
      a.ComplaintYear
    FROM
      RegisteredAppeal a
  "
            );

        $alreadyRegistered = DB::connection('k_rera')->select("
       SELECT
      a.AlreadyRegisteredComplaintsId AS id,
      cast (
        a.ComplaintNo as varchar(50)
      ) as ComplaintID,
      a.CreatedBy AS UserID,
      a.ComplaintNo AS CNO,
      a.ProjRegNo as RegistrationNO,
      CASE WHEN OrderIsValue = 1 THEN '1' ELSE '0' END AS RulingByMaharera,
      CASE WHEN OrderIsValue = 2 THEN '1' ELSE '0' END AS JudgementByOfficer,
      '0' Appellate,
      A.CreatedDate RulingorJudge_Date,
      '1' AS DivisionId,
      '' as CitizenComplaint_ID,
      A.CreatedBy as deskuser,
      A.Complainant as ComplainantName,
      A.Respondent as RespondentName,
      ROW_NUMBER() OVER(
        PARTITION BY a.ComplaintNo,
        a.ProjRegNo
        order by
          a.AlreadyRegisteredComplaintsId
      ) num,
      A.OrderTypeId as OrderType,
      'AlreadyRegisteredComplaints' AS Tbl_Name,
      a.ProjectName,
      CASE WHEN a.OrderTypeId = 1
      and isnull(DocName, '')<> '' THEN '1' else '0' END AS InteriumOrder,
      CASE WHEN a.OrderTypeId = 2
      and isnull(DocName, '')<> '' THEN '1' else '0' END AS FinalOrder,
      (
        a.ComplaintNo + '/' + CONVERT(varchar, a.ComplaintYear)
      ) ComplaintNo,
      a.ComplaintYear
    FROM
      AlreadyRegisteredComplaints a
        ");

        return response()->json($alreadyRegistered);
    }
}
