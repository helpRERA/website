<?php

namespace App\Repository\Agent;

use App\Models\KRERA\UserProfile;
use App\Repository\Locality\DistrictRepository;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Query\JoinClause;
use Illuminate\Support\Facades\DB;

class UserProfileRepository
{

    public function __construct(private DistrictRepository $districtRepository)
    {
    }

    /**
     * @return Builder<UserProfile>
     */
    public function search(
        ?string $name = null,
        ?string $district = null,
        ?string $taluk = null,
        ?string $village = null,
        ?string $pinCode = null,
    ): Builder {

        $districtQuery = $this->districtRepository->malayalamDistrict();

        return UserProfile::selectRaw(
            "
                case when (
                    tbl_UserProfile.InfoTypeValue in (1)
                ) then (
                    isnull(tbl_UserProfile.IndivisualName, '')+ ' ' + isnull(tbl_UserProfile.IndivisualMName, '')
                    + ' ' + isnull(tbl_UserProfile.IndivisualLName, '')
                ) WHEN isnull(tbl_UserProfile.CompanyName, '') = '' THEN (
                    isnull(tbl_UserProfile.IndivisualName, '')+ ' ' + isnull(tbl_UserProfile.IndivisualMName, '')
                    + ' ' + isnull(tbl_UserProfile.IndivisualLName, '')
                ) else isnull(tbl_UserProfile.CompanyName, '') end as AgentName,
                case when (
                    tbl_UserProfile.InfoTypeValue in (1)
                ) then
                    IndivisualHouseNo + ', ' + IndivisualBuilding + ', ' + IndivisualStreet + ', ' + IndivisualLocality
                else
                    companyHouseNo + ', ' + CompanyBuilding + ', ' + CompanyStreet + ', ' + CompanyLocality end Address,
                case when (
                    tbl_UserProfile.InfoTypeValue in (1)
                ) then IndivisualLandmark else CompanyLandmark end Landmark,
                IndivisualEmailID,
                IndivisualMobileNo,
                CompanyEmailID,
                CompanyMobileNo,
                case when (
                    tbl_UserProfile.InfoTypeValue in (1)
                ) then IndivisualPinCode else CompanyPinCode end Pincode,
                case when (
                    tbl_UserProfile.InfoTypeValue in (1)
                ) then d.Districtname else d1.Districtname end DistrictName,
                c.CertificateNo
            "
        )
            ->join(
                'tbl_CertificateA as c',
                function (JoinClause $join) {
                    $join->on('tbl_UserProfile.UserID', '=', 'c.UserID');
                }
            )
            ->leftJoinSub($districtQuery, 'd', function (JoinClause $join) {
                $join->on('tbl_UserProfile.IndivisualDistrictValue', '=', 'd.Districtcode');
            })
            ->leftJoinSub($districtQuery, 'd1', function (JoinClause $join) {
                $join->on('tbl_UserProfile.CompanyDistrictValue', '=', 'd1.Districtcode');
            })
            ->when($name != null, function (Builder $query) use ($name) {
                $query->where(function (Builder $query) use ($name) {
                    $query->where('tbl_UserProfile.IndivisualName', 'LIKE', '%' . $name . '%')
                        ->orWhere('tbl_UserProfile.CompanyName', 'LIKE', '%' . $name . '%');
                });
            })
            ->when($district != null, function (Builder $query) use ($district) {
                $query->where(function (Builder $query) use ($district) {
                    $query->where('tbl_UserProfile.IndivisualDistrictValue', '=', $district)
                        ->orWhere('tbl_UserProfile.CompanyDistrictValue', '=', $district);
                });
            })
            ->when($taluk != null, function (Builder $query) use ($taluk) {
                $query->where(function (Builder $query) use ($taluk) {
                    $query->where('tbl_UserProfile.IndivisualTalukaValue', '=', $taluk)
                        ->orWhere('tbl_UserProfile.CompanyTalukaValue', '=', $taluk);
                });
            })
            ->when($village != null, function (Builder $query) use ($village) {
                $query->where(function (Builder $query) use ($village) {
                    $query->where('tbl_UserProfile.IndivisualVillageValue', '=', $village)
                        ->orWhere('tbl_UserProfile.CompanyVillageValue', '=', $village);
                });
            })
            ->when($pinCode != null, function (Builder $query) use ($pinCode) {
                $query->where(function (Builder $query) use ($pinCode) {
                    $query->where('tbl_UserProfile.IndivisualPinCode', '=', $pinCode)
                        ->orWhere('tbl_UserProfile.CompanyPinCode', '=', $pinCode);
                });
            })
            ->where('tbl_UserProfile.RoleID', 2);
    }

    public function registeredAgents(): int
    {
        $results = DB::connection('k_rera')
            ->select("
                    select sum(AgentCount)AgentCount from(
                    select count(*)AgentCount from tbl_UserProfile u
                    inner join tbl_CertificateA c on u.UserID=c.UserID
                    where u.RoleID=2 and c.CertificateNo not in(select RegistrationNumber from tbl_Agent_Manual )
                    union all
                    select count(*)AgentCount from tbl_Agent_Manual
                    ) t
            ");

        if (empty($results)) {
            return 0;
        }

        return $results[0]->AgentCount;
    }
}
