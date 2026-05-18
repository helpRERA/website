<?php

namespace App\Services\Agent;

use App\Libs\ArrayPagination;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\DB;

class AgentListService
{
    /** @var string[] */
    private array $queryParams = [];

    public function getData(
        ?string $name = null,
        ?string $district = null,
        ?string $taluk = null,
        ?string $village = null,
        ?string $pinCode = null,
        ?string $registrationNumber = null
    ): LengthAwarePaginator {

        $list = $this->runQuery(
            $name,
            $district,
            $taluk,
            $village,
            $pinCode,
            $registrationNumber
        );

        $arrayPagination = new ArrayPagination($list, 20);

        return $arrayPagination->paginate();
    }

    public function runQuery(
        ?string $name = null,
        ?string $district = null,
        ?string $taluk = null,
        ?string $village = null,
        ?string $pinCode = null,
        ?string $registrationNumber = null
    ): array {
        $this->queryParams = [];

        return DB::connection('k_rera')->select(
            "
                select
                  UserID,
                  DistrictName,
                  AgentName,
                  (
                    Address + ', ' + DistrictName + ', ' + Pincode
                  ) Address,
                  Landmark,
                  Pincode,
                  IndivisualEmailID,
                  IndivisualMobileNo,
                  CompanyEmailID,
                  CompanyMobileNo,
                  CertificateNo,
                  RoleID,
                  InfoTypeValue
                from
                  (
                    select
                      UP.UserID,
                      UP.InfoTypeValue,
                      case when (
                        UP.InfoTypeValue in (1)
                      ) then (
                        isnull(UP.IndivisualName, '')+ ' ' + isnull(UP.IndivisualMName, '')+ ' ' + isnull(UP.IndivisualLName, '')
                      ) WHEN isnull(UP.CompanyName, '') = '' THEN (
                        isnull(UP.IndivisualName, '')+ ' ' + isnull(UP.IndivisualMName, '')+ ' ' + isnull(UP.IndivisualLName, '')
                      ) else isnull(UP.CompanyName, '') end as AgentName,
                      case when (
                        UP.InfoTypeValue in (1)
                      ) then d.Districtname else d1.Districtname end DistrictName,
                      case when (
                        UP.InfoTypeValue in (1)
                      ) then IndivisualHouseNo + ', ' + IndivisualBuilding + ', ' + IndivisualStreet + ', ' + IndivisualLocality else companyHouseNo + ', ' + CompanyBuilding + ', ' + CompanyStreet + ', ' + CompanyLocality end Address,
                      case when (
                        UP.InfoTypeValue in (1)
                      ) then IndivisualLandmark else CompanyLandmark end Landmark,
                      IndivisualEmailID,
                      IndivisualMobileNo,
                      CompanyEmailID,
                      CompanyMobileNo,
                      case when (
                        UP.InfoTypeValue in (1)
                      ) then IndivisualPinCode else CompanyPinCode end Pincode,
                      c.CertificateNo,
                      c.ID as CertificateID,
                      UP.RoleID
                    from
                      tbl_UserProfile UP
                      inner join tbl_CertificateA c on UP.UserID = c.UserID
                 inner join tbl_UserStatusSubMapping US on UP.UserID=US.UserID and  isnull(US.IsWithdraw,0)=0 and isnull(US.IsRevoc,0)=0
                      left join mstDistrict d on UP.IndivisualDistrictValue = d.Districtcode
                      and d.Langid = 1
                      left join mstDistrict d1 on UP.CompanyDistrictValue = d1.Districtcode
                      and d1.Langid = 1
                    where
                      UP.RoleID = 2
                ".
            $this->queryDistrict($district)
            .$this->queryTaluk($taluk)
            .$this->queryVillage($village)
            .'
            ) t
            where RoleID = 2 '
            .$this->queryAgentName($name)
            .$this->queryPincode($pinCode)
            .$this->queryRegistrationNumber($registrationNumber)
            .' order by t.CertificateID DESC ',
            $this->queryParams
        );
    }

    private function queryDistrict(?string $district): string
    {
        if ($district == null) {
            return '';
        }
        $this->queryParams[] = $district;
        $this->queryParams[] = $district;

        return ' and (UP.IndivisualDistrictValue = ? or UP.CompanyDistrictValue = ? ) ';
    }

    private function queryTaluk(?string $taluk): string
    {
        if ($taluk == null) {
            return '';
        }
        $this->queryParams[] = $taluk;
        $this->queryParams[] = $taluk;

        return ' and (UP.IndivisualTalukaValue = ? or UP.CompanyTalukaValue = ? ) ';
    }

    private function queryVillage(?string $village): string
    {
        if ($village == null) {
            return '';
        }
        $this->queryParams[] = $village;
        $this->queryParams[] = $village;

        return ' and (UP.IndivisualVillageValue = ? or UP.CompanyVillageValue = ? ) ';
    }

    private function queryAgentName(?string $name): string
    {
        if ($name == null) {
            return '';
        }
        $this->queryParams[] = "%$name%";

        return ' and AgentName like ?';
    }

    private function queryPincode(?string $pincode): string
    {
        if ($pincode == null) {
            return '';
        }
        $this->queryParams[] = "%$pincode%";

        return ' and Pincode like ?';
    }

    private function queryRegistrationNumber(?string $registrationNumber): string
    {
        if ($registrationNumber == null) {
            return '';
        }
        $this->queryParams[] = "%$registrationNumber%";

        return ' and CertificateNo like ?';
    }
}
