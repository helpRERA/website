<?php

namespace App\Services\Causes;

use App\Libs\ArrayPagination;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\DB;

class CauseListService
{
    public function getData(?string $date, string $authority): LengthAwarePaginator
    {
        $queryParams = [];

        if ($date !== null) {
            $queryParams = [
                $date,
                $authority,
                $date,
                $date,
            ];
        }

        $list = DB::connection('k_rera')->select(
            "
            SELECT
                ComplaintNumber,
                RegistrationNo,
                ComplainantName,
                Nameofrespondent,
                HearingDate,
                HearingTime,
                Cause,
                DailyProceedings,
                COUNT(1) OVER () AS TotalCount
            FROM
            (
                SELECT
                    ROW_NUMBER() OVER (
                        ORDER BY CAST(HearingTime AS datetime), ComplaintNumber
                    ) AS srno,
                    *
                FROM
                (
                    -- =========================
                    -- 1. Regular Hearings
                    -- =========================
                    SELECT
                        UH.RegistrationNo COLLATE SQL_Latin1_General_CP1_CI_AS AS ComplaintNumber,
                        hr.certificateno AS RegistrationNo,
                        (
                            SELECT TOP 1 ComplainantName
                            FROM tbl_CitizenComplaint comp WITH (NOLOCK)
                            WHERE comp.complaintid = hr.complainantid
                            AND comp.division = hr.divisionid
                        ) AS ComplainantName,
                        (
                            SELECT TOP 1 Nameofrespondent
                            FROM tbl_CitizenRespondentDetails res WITH (NOLOCK)
                            WHERE res.complaintid = hr.complainantid
                            AND res.division = hr.divisionid
                        ) AS Nameofrespondent,
                        CAST(hr.HearingDate AS varchar) AS HearingDate,
                        hr.HearingTime,
                        ISNULL(TypeName, 'For Appearance') AS Cause,
                        NULL AS DailyProceedings
                    FROM tbl_ScheduleHearing hr WITH (NOLOCK)
                    INNER JOIN tbl_complaint a WITH (NOLOCK) ON hr.ComplaintNo = a.CNO
                    LEFT JOIN tbl_CommonddMaster CD WITH (NOLOCK) ON hr.CasueID = CD.ID
                    LEFT JOIN tbl_UserHearingDetails UH WITH (NOLOCK)
                        ON hr.ComplainantID = UH.ProjectID AND UH.RoleID = 3
                    WHERE hr.IsActive = 1
                    " . ($date === null ? '' : ' AND hr.HearingDate = CAST(? AS DATE) ') . "

                    AND hr.ComplaintNo COLLATE SQL_Latin1_General_CP1_CI_AS NOT IN (
                        SELECT ComplaintNo
                        FROM tbl_complaintapproval WITH (NOLOCK)
                        WHERE status = 58
                    )

                    UNION ALL

                    -- =========================
                    -- 2. Suo Moto (with DailyProceedings)
                    -- =========================
                    SELECT
                        hr.ComplaintNo COLLATE SQL_Latin1_General_CP1_CI_AS AS ComplaintNumber,
                        hr.ProjectRegNo AS RegistrationNo,
                        hr.ComplainantName,
                        hr.RespondentName AS Nameofrespondent,
                        CAST(hr.HearingDate AS varchar) AS HearingDate,
                        hr.TimeSlotId AS HearingTime,
                        'For Appearance' AS Cause,
                        hr.DailyProceedings AS DailyProceedings
                    FROM CauseListSuoMoto hr WITH (NOLOCK)
                    WHERE hr.PostedValueId = ?
                    " . ($date === null ? '' : ' AND hr.HearingDate = CAST(? AS DATE) ') . "

                    UNION ALL

                    -- =========================
                    -- 3. Compliance Hearings
                    -- =========================
                    SELECT
                        UH.RegistrationNo COLLATE SQL_Latin1_General_CP1_CI_AS AS ComplaintNumber,
                        hr.certificateno AS RegistrationNo,
                        (
                            SELECT TOP 1 ComplainantName
                            FROM tbl_CitizenComplaint comp WITH (NOLOCK)
                            WHERE comp.complaintid = hr.complainantid
                            AND comp.division = hr.divisionid
                        ) AS ComplainantName,
                        (
                            SELECT TOP 1 Nameofrespondent
                            FROM tbl_CitizenRespondentDetails res WITH (NOLOCK)
                            WHERE res.complaintid = hr.complainantid
                            AND res.division = hr.divisionid
                        ) AS Nameofrespondent,
                        CAST(hr.HearingDate AS varchar) AS HearingDate,
                        hr.HearingTime,
                        ISNULL(TypeName, 'For Appearance') AS Cause,
                        NULL AS DailyProceedings
                    FROM tbl_ComplianceScheduleHearing hr WITH (NOLOCK)
                    INNER JOIN tbl_complaint a WITH (NOLOCK) ON hr.ComplaintNo = a.CNO
                    LEFT JOIN tbl_CommonddMaster CD WITH (NOLOCK) ON hr.CasueID = CD.ID
                    LEFT JOIN tbl_UserHearingDetails UH WITH (NOLOCK)
                        ON hr.ComplainantID = UH.ProjectID AND UH.RoleID = 3
                    WHERE hr.IsActive = 1
                    " . ($date === null ? '' : ' AND hr.HearingDate = CAST(? AS DATE) ') . "
                ) A
            ) B
            ORDER BY srno ASC
            ",
            $queryParams
        );

        $arrayPagination = new ArrayPagination($list, 20);
        return $arrayPagination->paginate();
    }
}
