/* Run the entire script in one SSMS session.
   Each result set is a separate Excel sheet, linked through ProjectID/UserID.
   Eligibility matches ProjectMaster::registered() plus certificateInfo existence.
   Completed/expired projects remain eligible: the application does not exclude them.
   This script only reads source tables; its working table is in tempdb.
   Database names below follow the application's hard-coded service queries.
*/
USE [Kerala_RERA];
SET NOCOUNT ON;

IF OBJECT_ID('tempdb..#ExportProjects') IS NOT NULL
    DROP TABLE #ExportProjects;

SELECT p.ID AS ProjectID, p.UserID
INTO #ExportProjects
FROM dbo.tbl_Project p
WHERE EXISTS (
    SELECT 1 FROM dbo.tbl_UserStatusSubMapping s
    WHERE s.ProjectID = p.ID
      AND ISNULL(s.IsWithdraw, 0) = 0
      AND ISNULL(s.IsRevoc, 0) = 0
)
AND EXISTS (
    SELECT 1 FROM dbo.tbl_CertificateP c WHERE c.ProjectID = p.ID
);

/* Sheet: Projects. No project ID filter and no pagination.
   Defaults are separate below because multiple default records could duplicate p.*.
*/
SELECT p.ID AS ExportProjectID, p.*,
    d.Districtname AS DistrictName,
    t.SubDistrictname AS TalukName,
    v.Villagename AS VillageName,
    a.apartment_count, a.booked_count, a.available_count,
    pl.plot_count, pl.booked_plots,
    ext.ProjectEndDate AS LatestExtensionDate,
    CASE WHEN EXISTS (
        SELECT 1 FROM dbo.tbl_ProjectDefaults pd
        WHERE pd.ProjectId = p.ID AND ISNULL(pd.DefaultReason, '') <> ''
    ) THEN 1 ELSE 0 END AS IsDefault
FROM dbo.tbl_Project p
JOIN #ExportProjects ep ON ep.ProjectID = p.ID
LEFT JOIN dbo.mstDistrict d ON d.Districtcode = p.District AND d.Langid = 1
LEFT JOIN dbo.mstTaluka t ON t.Subdistrictcode = p.Taluka AND t.Langid = 1
LEFT JOIN dbo.mstVillage v ON v.Villagecode = p.Village AND v.Langid = 1
LEFT JOIN (
    SELECT ProjectID,
        SUM(CAST(ApartmentNumber AS INT)) AS apartment_count,
        SUM(CAST(BookedApartment AS INT)) AS booked_count,
        SUM(CAST(ApartmentNumber AS INT)) - SUM(CAST(BookedApartment AS INT)) AS available_count
    FROM dbo.tbl_BuildingApartmentType GROUP BY ProjectID
) a ON a.ProjectID = p.ID
LEFT JOIN (
    SELECT ProjectID, SUM(CAST(NumberPlot AS INT)) AS plot_count,
        SUM(CAST(BookedPlots AS INT)) AS booked_plots
    FROM dbo.tbl_Plots GROUP BY ProjectID
) pl ON pl.ProjectID = p.ID
OUTER APPLY (
    SELECT TOP (1) e.ProjectEndDate
    FROM dbo.tbl_ExtensionProject e WHERE e.ProjectID = p.ID
    ORDER BY e.CreatedOn DESC, e.ID DESC
) ext
ORDER BY p.ID;

/* Sheet: Promoters. Includes the company/individual district names. */
SELECT ep.ProjectID AS ExportProjectID, u.*,
    cd.Districtname AS CompanyDistrictName,
    id.Districtname AS IndividualDistrictName
FROM #ExportProjects ep
JOIN dbo.tbl_UserProfile u ON u.UserID = ep.UserID
LEFT JOIN dbo.mstDistrict cd ON cd.Districtcode = u.CompanyDistrictValue AND cd.Langid = 1
LEFT JOIN dbo.mstDistrict id ON id.Districtcode = u.IndivisualDistrictValue AND id.Langid = 1
ORDER BY ep.ProjectID;

/* Sheets: Buildings and apartment breakdown used by the detail page. */
SELECT b.* FROM dbo.tbl_Building b
JOIN #ExportProjects ep ON ep.ProjectID = b.ProjectID
WHERE b.Delete_UserId IS NULL AND b.Delete_ProjectId IS NULL;

SELECT b.ProjectID AS ExportProjectID, a.BuidingID, a.ApartmentType,
    a.TotalArea * 10.7639 AS TotalAreaSqFt,
    SUM(CAST(a.ApartmentNumber AS INT)) AS apartment_count,
    SUM(CAST(a.BookedApartment AS INT)) AS booked_count
FROM dbo.tbl_BuildingApartmentType a
JOIN dbo.tbl_Building b ON b.ID = a.BuidingID
JOIN #ExportProjects ep ON ep.ProjectID = b.ProjectID
WHERE b.Delete_UserId IS NULL AND b.Delete_ProjectId IS NULL
  AND a.Delete_UserId IS NULL AND a.Delete_ProjectId IS NULL
GROUP BY b.ProjectID, a.BuidingID, a.ApartmentType, a.TotalArea;

/* Related records: one result set per table, labelled ExportSheet.
   This exports underlying records, including historical documents/certificates.
   Binary file contents are excluded: Excel receives file metadata, not PDF/image bytes.
*/
DECLARE @Tables TABLE (Seq INT, DbName SYSNAME, TableName SYSNAME);
INSERT INTO @Tables VALUES
 (1, 'Kerala_RERA', 'tbl_CertificateP'),
 (2, 'Kerala_RERA', 'tbl_ProjectDefaults'),
 (3, 'Kerala_RERA', 'tbl_FacilityDetails'),
 (4, 'Kerala_RERA', 'tbl_GISDetails'),
 (5, 'Kerala_RERA', 'tbl_Plots'),
 (6, 'Kerala_RERA', 'tbl_ExtensionProject'),
 (7, 'Kerala_RERA', 'tbl_ExtensionMapping'),
 (8, 'Kerala_RERA', 'ExtensionHSMSignCert'),
 (9, 'Kerala_RERA', 'ExtensionDigitalSignCert'),
 (10, 'Kerala_RERA_Docs', 'tbl_UploadPhoto'),
 (11, 'Kerala_RERA_Docs', 'tbl_UserDocument'),
 (12, 'Kerala_RERA_Docs', 'HSMSignCert');

DECLARE @Db SYSNAME, @Table SYSNAME, @Columns NVARCHAR(MAX), @Sql NVARCHAR(MAX);
DECLARE ExportTables CURSOR LOCAL FAST_FORWARD FOR
    SELECT DbName, TableName FROM @Tables ORDER BY Seq;
OPEN ExportTables;
FETCH NEXT FROM ExportTables INTO @Db, @Table;
WHILE @@FETCH_STATUS = 0
BEGIN
    SET @Columns = NULL;
    SET @Sql = N'SELECT @Cols = STUFF((
        SELECT N'', x.'' + QUOTENAME(c.name)
        FROM ' + QUOTENAME(@Db) + N'.sys.columns c
        JOIN ' + QUOTENAME(@Db) + N'.sys.tables t ON t.object_id = c.object_id
        JOIN ' + QUOTENAME(@Db) + N'.sys.schemas s ON s.schema_id = t.schema_id
        WHERE s.name = N''dbo'' AND t.name = @TableName
          AND c.system_type_id NOT IN (34, 165, 173, 189)
          AND LOWER(c.name) NOT IN (N''filecontent'', N''digitalcert'', N''imagefile'')
        ORDER BY c.column_id
        FOR XML PATH(''''), TYPE).value(''.'', ''nvarchar(max)''), 1, 2, N'''');';
    EXEC sys.sp_executesql @Sql,
        N'@TableName sysname, @Cols nvarchar(max) OUTPUT',
        @TableName = @Table, @Cols = @Columns OUTPUT;
    IF @Columns IS NULL
    BEGIN
        SELECT @Table AS ExportSheet,
            'Unavailable: table is missing or metadata access is denied.' AS ExportWarning;
    END
    ELSE
    BEGIN
        SET @Sql = N'SELECT @Sheet AS ExportSheet, ' + @Columns
            + N' FROM ' + QUOTENAME(@Db) + N'.dbo.' + QUOTENAME(@Table)
            + N' x WHERE EXISTS (SELECT 1 FROM #ExportProjects ep WHERE ep.ProjectID = x.ProjectID);';
        EXEC sys.sp_executesql @Sql, N'@Sheet sysname', @Sheet = @Table;
    END;
    FETCH NEXT FROM ExportTables INTO @Db, @Table;
END;
CLOSE ExportTables;
DEALLOCATE ExportTables;

/* Order files: metadata for the actions used by the detail-page order list. */
SELECT s.ProjectID AS ExportProjectID, s.Action, d.DocID, d.FileName,
    d.MoreInfoID, d.FileType
FROM dbo.tbl_DeskStatus s
JOIN #ExportProjects ep ON ep.ProjectID = s.ProjectID
JOIN Kerala_RERA_Docs.dbo.tbl_MoreInfoDocs d
    ON d.MoreInfoID = s.ID AND d.ProjectID = s.ProjectID
WHERE s.Action IN (37, 88)
  AND d.FileType IS NOT NULL AND d.FileContent IS NOT NULL;

SELECT s.ProjectID AS ExportProjectID, s.Action, d.DocID, d.FileName,
    d.MoreInfoID, d.FileType
FROM dbo.tbl_ExtensionDeskStatus s
JOIN #ExportProjects ep ON ep.ProjectID = s.ProjectID
JOIN Kerala_RERA_Docs.dbo.tbl_ExtMoreInfoDocs d ON d.MoreInfoID = s.ID
WHERE s.Action = 36;

SELECT s.* FROM dbo.tbl_CorrectionDeskStatus s
JOIN #ExportProjects ep ON ep.ProjectID = s.ProjectID
WHERE s.Action = 39;

/* The complaints result set appended below uses the application's query. */


    select
  row_number() OVER (
    ORDER BY
      temptable_citizencomplaint.ID
  ) as SrNo,
  temptable_citizencomplaint.ID,
  temptable_citizencomplaint.ComplaintID,
  temptable_citizencomplaint.UserID,
  CNO,
  ComplaintNo,
  ComplaintYear,
  RegistrationNO as CertiNo,
  ComplainantName,
  temptable_citizencomplaint.RulingByMaharera,
  temptable_citizencomplaint.JudgementByOfficer,
  RulingorJudge_Date,
  RespondentName,
  CitizenComplaint_ID,
  COUNT(1) OVER () as TotalCount,
  temptable_citizencomplaint.Tbl_Name,
  CASE WHEN temptable_citizencomplaint.RulingByMaharera = 1 THEN '1' WHEN temptable_citizencomplaint.JudgementByOfficer = 1 THEN '2' ELSE '' END AS Type,
  temptable_citizencomplaint.ProjectName,
  temptable_citizencomplaint.InteriumOrder,
  temptable_citizencomplaint.FinalOrder,
  temptable_citizencomplaint.ProjectId,
  '1' as Division
from
  (
    SELECT
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
      UH.ComplaintYear,
      CAST(NULL AS varchar(50)) AS ProjectId
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
      ISNULL(UR.ordertype, UR1.ordertype) in (59, 60)
    UNION ALL
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
      a.ComplaintYear,
      CAST(ISNULL(a.ProjectId, '0') AS varchar(50)) AS ProjectId
    FROM
      AlreadyRegisteredComplaints a
    union all
    SELECT
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
      a.ComplaintNo,
      a.ComplaintYear,
      CAST(NULL AS varchar(50)) AS ProjectId
    FROM
      RegisteredAppeal a
  ) temptable_citizencomplaint
where
  CASE WHEN temptable_citizencomplaint.RulingByMaharera = 1 THEN temptable_citizencomplaint.RulingByMaharera WHEN temptable_citizencomplaint.JudgementByOfficer = 1 THEN temptable_citizencomplaint.JudgementByOfficer ELSE 0 END = 1
    
 AND EXISTS (SELECT 1 FROM #ExportProjects ep WHERE CONVERT(varchar(50), ep.ProjectID) = temptable_citizencomplaint.ProjectId);

DROP TABLE #ExportProjects;

