<?php

namespace App\Services\Project;

use Illuminate\Support\Facades\DB;

class ProjectListService
{
    const PROJECT_COUNT_QUERY = '
         select
            count(*) as count
          from
            tbl_Project P with(nolock)
            inner join tbl_UserProfile UP with(nolock) on p.UserID = UP.UserID
            inner join tbl_CertificateP Cert with(nolock) on Cert.ProjectID = P.ID
            inner join tbl_userstatussubmapping U with(nolock) on U.ProjectID = P.ID and isnull(IsWithdraw,0)=0 and isnull(IsRevoc,0)=0
            inner join tbl_UserHearingDetails UH with(nolock) on P.ID = UH.projectid
            and P.UserID = UH.userid outer apply (
              select
                top 1 Latitude,
                Longitude
              from
                tbl_GISDetails with(nolock)
              where
                tbl_GISDetails.ProjectID = P.ID
              order by
                CreatedDate
            ) GIS
            left join tbl_ExtensionMapping EA with(nolock) on P.ID = EA.projectid
            and P.UserID = EA.userid
            and EA.IsCertificateGenerated = 1
            and EA.ID =(
              select
                max(ID)
              from
                tbl_ExtensionMapping
              where
                projectid = EA.projectid
                and IsCertificateGenerated = 1
            )
            outer apply(
        select distinct ProjectID,DocID from [Kerala_RERA_Docs].[dbo].[tbl_UserDocument]
        where P.ID=ProjectID and DocID=121
        )doc
            LEft join mstDistrict ds on p.District = ds.Districtcode
            and ds.Langid = 1
            left join mstVillage v on p.Village = v.Villagecode
            and v.Langid = 1
            left join mstTaluka t on p.Taluka = t.SubDistrictcode
            and t.Langid = 1
            left join tbl_CommonDDMaster cc on p.PType = cc.Id
          where
            UH.issubmit = 1
            and U.IsCertificateGenerated = 1
    ';

    private int $resultRowCount = 0;

    private ?string $queryProjectName;

    private ?string $queryDistrict;

    private ?string $queryTaluk;

    private ?string $queryVillage;

    private ?string $queryWorkStatus;

    private ?string $queryPromoterName;

    private ?string $queryRegistrationNumber;

    private ?string $queryStartDate;

    private ?string $queryCompletionDate;

    /** @var string[] */
    private array $queryParams = [];

    public function fetchMeta(
        ?string $queryProjectName,
        ?string $queryDistrict,
        ?string $queryTaluk,
        ?string $queryVillage,
        ?string $queryWorkStatus,
        ?string $queryPromoterName,
        ?string $queryRegistrationNumber,
        ?string $queryStartDate,
        ?string $queryCompletionDate
    ): void {
        $this->queryProjectName = $queryProjectName;
        $this->queryDistrict = $queryDistrict;
        $this->queryTaluk = $queryTaluk;
        $this->queryVillage = $queryVillage;
        $this->queryWorkStatus = $queryWorkStatus;
        $this->queryPromoterName = $queryPromoterName;
        $this->queryRegistrationNumber = $queryRegistrationNumber;
        $this->queryStartDate = $queryStartDate;
        $this->queryCompletionDate = $queryCompletionDate;
        $this->calculateCount();
    }

    private function calculateCount(): void
    {
        $this->queryParams = [];
        $result = DB::connection('k_rera')->select(
            self::PROJECT_COUNT_QUERY.
            $this->projectNameQuery().
            $this->talukQuery().
            $this->villageQuery().
            $this->districtQuery().
            $this->promoterQuery().
            $this->registrationNumberQuery().
            $this->startDateQuery().
            $this->completionDateQuery().
            $this->statusQuery(),
            $this->queryParams
        );

        if ($result == null || count($result) < 1) {
            $this->resultRowCount = 0;

            return;
        }

        $this->resultRowCount = $result[0]->count;
    }

    private function projectNameQuery(): string
    {
        if ($this->queryProjectName == null) {
            return '';
        }
        $this->queryParams[] = "%$this->queryProjectName%";

        return ' and p.Name like ?';
    }

    private function talukQuery(): string
    {
        if ($this->queryTaluk == null) {
            return '';
        }
        $this->queryParams[] = $this->queryTaluk;

        return ' and p.Taluka = ?';
    }

    private function villageQuery(): string
    {
        if ($this->queryVillage == null) {
            return '';
        }
        $this->queryParams[] = $this->queryVillage;

        return ' and p.Village = ?';
    }

    private function districtQuery(): string
    {
        if ($this->queryDistrict == null) {
            return '';
        }
        $this->queryParams[] = $this->queryDistrict;

        return ' and p.District = ?';
    }

    private function promoterQuery(): string
    {
        if ($this->queryPromoterName == null) {
            return '';
        }
        $this->queryParams[] = "%$this->queryPromoterName%";

        return "
            and UPPER(
              case when (
                UP.InfoTypeValue in (1)
              ) then (
                isnull(UP.IndivisualName, '')+ ' ' + isnull(UP.IndivisualMName, '')+ ' ' + isnull(UP.IndivisualLName, '')
              ) WHEN isnull(UP.CompanyName, '') = '' THEN (
                isnull(UP.IndivisualName, '')+ ' ' + isnull(UP.IndivisualMName, '')+ ' ' + isnull(UP.IndivisualLName, '')
              ) else isnull(UP.CompanyName, '') end
            ) like ?
        ";
    }

    private function registrationNumberQuery(): string
    {
        if ($this->queryRegistrationNumber == null) {
            return '';
        }
        $this->queryParams[] = "%$this->queryRegistrationNumber%";

        return ' and cert.CertificateNo like ?';
    }

    private function startDateQuery(): string
    {
        if ($this->queryStartDate == null) {
            return '';
        }
        $this->queryParams[] = "$this->queryStartDate";

        return ' and  p.ProposedDateOfCompletion >= ? ';
    }

    private function completionDateQuery(): string
    {
        if ($this->queryCompletionDate == null) {
            return '';
        }
        $this->queryParams[] = "$this->queryCompletionDate";

        return ' and p.ProposedDateOfCompletion <= ?';
    }

    private function statusQuery(): string
    {
        if ($this->queryWorkStatus == null) {
            return '';
        }
        $this->queryParams[] = $this->queryWorkStatus;

        return " and case when isnull(doc.DocID, 0)= 0 then 'In Progress' else 'completed' end = ?";
    }

    public function getCount(): int
    {
        return $this->resultRowCount;
    }

    public function getData(int $offset = 1): array
    {
        $this->queryParams = [];

        return DB::connection('k_rera')->select(
            "
                WITH Results_Projects AS (
                  select
                    distinct p.id,
                    p.Name as Project,
                    case when (
                      UP.InfoTypeValue in (1)
                    ) then (
                      isnull(UP.IndivisualName, '')+ ' ' + isnull(UP.IndivisualMName, '')+ ' ' + isnull(UP.IndivisualLName, '')
                    ) WHEN isnull(UP.CompanyName, '') = '' THEN (
                      isnull(UP.IndivisualName, '')+ ' ' + isnull(UP.IndivisualMName, '')+ ' ' + isnull(UP.IndivisualLName, '')
                    ) else isnull(UP.CompanyName, '') end as PromoterName,
                    ds.Districtname District,
                    t.SubDistrictname Taluka,
                    v.Villagename Village,
                    cc.TypeName ProjectType,
                    convert(
                      date, case when ProjectStartDate = '1900-01-01 00:00:00.000' then ProjectEndDate else ProjectStartDate end
                    ) as ProjectStartDate,
                    convert(
                      date, p.ProposedDateOfCompletion
                    ) DateOfCompletion,
                    cert.CertificateNo as CertiNo,
                    convert(date, cert.CreatedOn) Certificate_Date,
                    (
                      select
                        Convert(
                          varchar(10),
                          [dbo].[fun_GetLastModifiedDate](p.id, p.userid),
                          103
                        )
                    ) as lastModifiedDate,
                    case when p.PType = 15 then (
                      select
                        sum(
                          convert(int, bt.PlotNumberForPlotType)
                        )
                      from
                        tbl_Plots bt
                      where
                        p.id = bt.ProjectID
                    ) else (
                      select
                        sum(
                          convert(int, bt.ApartmentNumber)
                        )
                      from
                        tbl_BuildingApartmentType bt
                      where
                        p.id = bt.ProjectID
                    ) end Total,
                    case when p.PType = 15 then (
                      select
                        sum(
                          convert(int, bt.BookedPlots)
                        )
                      from
                        tbl_Plots bt
                      where
                        p.id = bt.ProjectID
                    ) else (
                      select
                        sum(
                          convert(int, bt.BookedApartment)
                        ) Sold
                      from
                        tbl_BuildingApartmentType bt
                      where
                        p.id = bt.ProjectID
                    ) end Sold,
                    case when isnull(doc.DocID, 0)= 0 then 'Inprogress' else 'Completed' end Status,
                    ROW_NUMBER() OVER (
                      ORDER BY
                        p.Name
                    ) AS RowNum
                  from
                    tbl_Project P with(nolock)
                    inner join tbl_UserProfile UP with(nolock) on p.UserID = UP.UserID
                    inner join tbl_CertificateP Cert with(nolock) on Cert.ProjectID = P.ID
                    inner join tbl_userstatussubmapping U with(nolock) on U.ProjectID = P.ID and isnull(IsWithdraw,0)=0 and isnull(IsRevoc,0)=0
                    inner join tbl_UserHearingDetails UH with(nolock) on P.ID = UH.projectid
                    and P.UserID = UH.userid outer apply (
                      select
                        top 1 Latitude,
                        Longitude
                      from
                        tbl_GISDetails with(nolock)
                      where
                        tbl_GISDetails.ProjectID = P.ID
                      order by
                        CreatedDate
                    ) GIS
                    left join tbl_ExtensionMapping EA with(nolock) on P.ID = EA.projectid
                    and P.UserID = EA.userid
                    and EA.IsCertificateGenerated = 1
                    and EA.ID =(
                      select
                        max(ID)
                      from
                        tbl_ExtensionMapping
                      where
                        projectid = EA.projectid
                        and IsCertificateGenerated = 1
                    )
                    outer apply(
                select distinct ProjectID,DocID from [Kerala_RERA_Docs].[dbo].[tbl_UserDocument]
                where P.ID=ProjectID and DocID=121 and FileName IS NOT NULL
                )doc
                    LEft join mstDistrict ds on p.District = ds.Districtcode
                    and ds.Langid = 1
                    left join mstVillage v on p.Village = v.Villagecode
                    and v.Langid = 1
                    left join mstTaluka t on p.Taluka = t.SubDistrictcode
                    and t.Langid = 1
                    left join tbl_CommonDDMaster cc on p.PType = cc.Id
                  where
                    UH.issubmit = 1
                    and U.IsCertificateGenerated = 1".
            $this->projectNameQuery().
            $this->talukQuery().
            $this->villageQuery().
            $this->districtQuery().
            $this->promoterQuery().
            $this->registrationNumberQuery().
            $this->startDateQuery().
            $this->completionDateQuery().
            $this->statusQuery().
            ")
                SELECT
                *
                FROM
                Results_Projects -- offset=$offset, rows=20
                WHERE
                RowNum >= $offset
                AND RowNum < $offset + 20
                order by
                RowNum
                ",
            $this->queryParams
        );
    }

    public function dataWithoutLastModifiedDate(int $offset = 1): array
    {
        $this->queryParams = [];

        return DB::connection('k_rera')->select(
            "
            select
                    distinct p.id,
                    p.Name as Project,
                    case when (
                      UP.InfoTypeValue in (1)
                    ) then (
                      isnull(UP.IndivisualName, '')+ ' ' + isnull(UP.IndivisualMName, '')+ ' ' + isnull(UP.IndivisualLName, '')
                    ) WHEN isnull(UP.CompanyName, '') = '' THEN (
                      isnull(UP.IndivisualName, '')+ ' ' + isnull(UP.IndivisualMName, '')+ ' ' + isnull(UP.IndivisualLName, '')
                    ) else isnull(UP.CompanyName, '') end as PromoterName,
                    ds.Districtname District,
                    t.SubDistrictname Taluka,
                    v.Villagename Village,
                    cc.TypeName ProjectType,
                    convert(
                      date, case when ProjectStartDate = '1900-01-01 00:00:00.000' then ProjectEndDate else ProjectStartDate end
                    ) as ProjectStartDate,
                    convert(
                      date, p.ProposedDateOfCompletion
                    ) DateOfCompletion,
                    cert.CertificateNo as CertiNo,
                    convert(date, cert.CreatedOn) Certificate_Date,
                    case when p.PType = 15 then (
                      select
                        sum(
                          convert(int, bt.PlotNumberForPlotType)
                        )
                      from
                        tbl_Plots bt
                      where
                        p.id = bt.ProjectID
                    ) else (
                      select
                        sum(
                          convert(int, bt.ApartmentNumber)
                        )
                      from
                        tbl_BuildingApartmentType bt
                      where
                        p.id = bt.ProjectID
                    ) end Total,
                    case when p.PType = 15 then (
                      select
                        sum(
                          convert(int, bt.BookedPlots)
                        )
                      from
                        tbl_Plots bt
                      where
                        p.id = bt.ProjectID
                    ) else (
                      select
                        sum(
                          convert(int, bt.BookedApartment)
                        ) Sold
                      from
                        tbl_BuildingApartmentType bt
                      where
                        p.id = bt.ProjectID
                    ) end Sold,
                    case when isnull(doc.DocID, 0)= 0 then 'Inprogress' else 'Completed' end Status,
                    ROW_NUMBER() OVER (
                      ORDER BY
                        p.Name
                    ) AS RowNum
                  from
                    tbl_Project P with(nolock)
                    inner join tbl_UserProfile UP with(nolock) on p.UserID = UP.UserID
                    inner join tbl_CertificateP Cert with(nolock) on Cert.ProjectID = P.ID
                    inner join tbl_userstatussubmapping U with(nolock) on U.ProjectID = P.ID and isnull(IsWithdraw,0)=0 and isnull(IsRevoc,0)=0
                    inner join tbl_UserHearingDetails UH with(nolock) on P.ID = UH.projectid
                    and P.UserID = UH.userid outer apply (
                      select
                        top 1 Latitude,
                        Longitude
                      from
                        tbl_GISDetails with(nolock)
                      where
                        tbl_GISDetails.ProjectID = P.ID
                      order by
                        CreatedDate
                    ) GIS
                    left join tbl_ExtensionMapping EA with(nolock) on P.ID = EA.projectid
                    and P.UserID = EA.userid
                    and EA.IsCertificateGenerated = 1
                    and EA.ID =(
                      select
                        max(ID)
                      from
                        tbl_ExtensionMapping
                      where
                        projectid = EA.projectid
                        and IsCertificateGenerated = 1
                    )
                    outer apply(
                select distinct ProjectID,DocID from [Kerala_RERA_Docs].[dbo].[tbl_UserDocument]
                where P.ID=ProjectID and DocID=121
                )doc
                    LEft join mstDistrict ds on p.District = ds.Districtcode
                    and ds.Langid = 1
                    left join mstVillage v on p.Village = v.Villagecode
                    and v.Langid = 1
                    left join mstTaluka t on p.Taluka = t.SubDistrictcode
                    and t.Langid = 1
                    left join tbl_CommonDDMaster cc on p.PType = cc.Id
                  where
                    UH.issubmit = 1
                    and U.IsCertificateGenerated = 1
            ".
            $this->projectNameQuery().
            $this->talukQuery().
            $this->villageQuery().
            $this->districtQuery().
            $this->promoterQuery().
            $this->registrationNumberQuery().
            $this->startDateQuery().
            $this->completionDateQuery().
            $this->statusQuery(),
            $this->queryParams
        );
    }
}
