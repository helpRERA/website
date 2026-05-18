<?php

namespace App\Models\KRERA;

use Eloquent;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

/**
 * App\Models\KRERA\UserProfile
 *
 * @property int $ID
 * @property int|null $UserID
 * @property int $RoleID
 * @property int|null $InfoTypeValue
 * @property string|null $IndivisualName
 * @property string|null $IndivisualMName
 * @property string|null $IndivisualLName
 * @property string|null $IndivisualPanNo
 * @property string|null $IndivisualFatherName
 * @property string|null $IndivisualAadharNumber
 * @property string|null $IndivisualOccupation
 * @property string|null $IndivisualHouseNo
 * @property string|null $IndivisualBuilding
 * @property string|null $IndivisualStreet
 * @property string|null $IndivisualLocality
 * @property string|null $IndivisualLandmark
 * @property string|null $IndivisualState
 * @property string|null $IndivisualDivisionValue
 * @property string|null $IndivisualDistrictValue
 * @property string|null $IndivisualTalukaValue
 * @property string|null $IndivisualVillageValue
 * @property string|null $IndivisualPinCode
 * @property string|null $IndivisualMobileNo
 * @property string|null $IndivisualOfficeNo
 * @property string|null $IndivisualFaxNo
 * @property string|null $IndivisualEmailID
 * @property string|null $CompanyName
 * @property string|null $CompanyPanNo
 * @property string|null $CompanyHouseNo
 * @property string|null $CompanyBuilding
 * @property string|null $CompanyStreet
 * @property string|null $CompanyLocality
 * @property string|null $CompanyLandmark
 * @property string|null $CompanyState
 * @property string|null $CompanyDivisionValue
 * @property string|null $CompanyDistrictValue
 * @property string|null $CompanyTalukaValue
 * @property string|null $CompanyVillageValue
 * @property string|null $ContactPerson
 * @property string|null $ContactPersonDesignation
 * @property string|null $ComapanyDinNo
 * @property string|null $CompanyPinCode
 * @property string|null $CompanyMobileNo
 * @property string|null $CompanySecMobileNo
 * @property string|null $CompanyOfficeNo
 * @property string|null $CompanyFaxNo
 * @property string|null $CompanyEmailID
 * @property string|null $ChairmanName
 * @property string|null $ChairmanMName
 * @property string|null $ChairmanLName
 * @property string|null $ChairmanPanNo
 * @property string|null $ChairmanHouseNo
 * @property string|null $ChairmanBuilding
 * @property string|null $ChairmanStreet
 * @property string|null $ChairmanLocality
 * @property string|null $ChairmanLandmark
 * @property string|null $ChairmanState
 * @property string|null $ChairmanDivisionValue
 * @property string|null $ChairmanDistrictValue
 * @property string|null $ChairmanTalukaValue
 * @property string|null $ChairmanVillageValue
 * @property string|null $ChairmanPinCode
 * @property int|null $OrgType
 * @property int|null $MemberCount
 * @property string|null $IndvWebsiteURL
 * @property string|null $CompWebsiteURL
 * @property string|null $CreatedBy
 * @property string|null $CreatedOn
 * @property string|null $ModifiedBy
 * @property string|null $ModifiedOn
 * @property string|null $ChairmanAadharNumber
 * @property int|null $IsCriminal
 * @property int|null $OtherStateRegistration
 * @property string|null $CompanyMobileNo1
 * @property string|null $IsPastExperience
 * @property string|null $other
 * @property string|null $CompanyOtherTaluka
 * @property string|null $CompanyOtherVillage
 * @property string|null $IndivisualOtherTaluka
 * @property string|null $IndivisualOtherVillage
 * @property string|null $IndivisualGSTIN
 * @property string|null $CompanyGSTIN
 * @property string|null $OfficialIndivisualHouseNo
 * @property string|null $OfficialIndivisualBuilding
 * @property string|null $OfficialIndivisualStreet
 * @property string|null $OfficialIndivisualLocality
 * @property string|null $OfficialIndivisualLandmark
 * @property string|null $OfficialIndivisualState
 * @property string|null $OfficialIndivisualDivisionValue
 * @property string|null $OfficialIndivisualDistrictValue
 * @property string|null $OfficialIndivisualTalukaValue
 * @property string|null $OfficialIndivisualVillageValue
 * @property string|null $OfficialIndivisualPinCode
 * @property string|null $OfficialIndivisualOtherTaluka
 * @property string|null $OfficialIndivisualOtherVillage
 * @property string|null $IsIncorporatedRegisteredEntity
 * @property int|null $EntityOrgType
 * @property string|null $EntityName
 * @property string|null $EntityCompanyHouseNo
 * @property string|null $EntityCompanyBuilding
 * @property string|null $EntityCompanyStreet
 * @property string|null $EntityCompanyLocality
 * @property string|null $EntityCompanyLandmark
 * @property string|null $EntityCompanyState
 * @property string|null $EntityCompanyDistrictValue
 * @property string|null $EntityCompanyTalukaValue
 * @property string|null $EntityCompanyVillageValue
 * @property string|null $EntityCompanyOtherVillage
 * @property string|null $EntityCompanyPinCode
 * @property string|null $OfficialCompanyHouseNo
 * @property string|null $OfficialCompanyBuilding
 * @property string|null $OfficialCompanyStreet
 * @property string|null $OfficialCompanyLocality
 * @property string|null $OfficialCompanyLandmark
 * @property string|null $OfficialCompanyState
 * @property string|null $OfficialCompanyDistrictValue
 * @property string|null $OfficialCompanyTalukaValue
 * @property string|null $OfficialCompanyVillageValue
 * @property string|null $OfficialCompanyOtherVillage
 * @property string|null $OfficialCompanyPinCode
 * @property string|null $Entityother
 * @property string|null $AgentIsExists
 * @property string|null $AgentRegistrationNumber
 * @property string|null $ReasonForChange
 * @property string|null $AgentRegistrationDate
 * @property string|null $AgentCaseIsExists
 * @property string|null $CaseDetails
 * @property-read District|null $companyDistrict
 * @property-read Collection<int, PromoterExperience> $experience
 * @property-read int|null $experience_count
 * @property-read District|null $individualDistrict
 * @property-read UserLogo|null $logo
 * @property-read Collection<int, MemberDetail> $partners
 * @property-read int|null $partners_count
 * @property-read Collection<int, ProjectMaster> $project
 * @property-read int|null $project_count
 * @property-read TrackRecord|null $trackRecord
 *
 * @method static Builder|UserProfile newModelQuery()
 * @method static Builder|UserProfile newQuery()
 * @method static Builder|UserProfile query()
 * @method static Builder|UserProfile whereAgentCaseIsExists($value)
 * @method static Builder|UserProfile whereAgentIsExists($value)
 * @method static Builder|UserProfile whereAgentRegistrationDate($value)
 * @method static Builder|UserProfile whereAgentRegistrationNumber($value)
 * @method static Builder|UserProfile whereCaseDetails($value)
 * @method static Builder|UserProfile whereChairmanAadharNumber($value)
 * @method static Builder|UserProfile whereChairmanBuilding($value)
 * @method static Builder|UserProfile whereChairmanDistrictValue($value)
 * @method static Builder|UserProfile whereChairmanDivisionValue($value)
 * @method static Builder|UserProfile whereChairmanHouseNo($value)
 * @method static Builder|UserProfile whereChairmanLName($value)
 * @method static Builder|UserProfile whereChairmanLandmark($value)
 * @method static Builder|UserProfile whereChairmanLocality($value)
 * @method static Builder|UserProfile whereChairmanMName($value)
 * @method static Builder|UserProfile whereChairmanName($value)
 * @method static Builder|UserProfile whereChairmanPanNo($value)
 * @method static Builder|UserProfile whereChairmanPinCode($value)
 * @method static Builder|UserProfile whereChairmanState($value)
 * @method static Builder|UserProfile whereChairmanStreet($value)
 * @method static Builder|UserProfile whereChairmanTalukaValue($value)
 * @method static Builder|UserProfile whereChairmanVillageValue($value)
 * @method static Builder|UserProfile whereComapanyDinNo($value)
 * @method static Builder|UserProfile whereCompWebsiteURL($value)
 * @method static Builder|UserProfile whereCompanyBuilding($value)
 * @method static Builder|UserProfile whereCompanyDistrictValue($value)
 * @method static Builder|UserProfile whereCompanyDivisionValue($value)
 * @method static Builder|UserProfile whereCompanyEmailID($value)
 * @method static Builder|UserProfile whereCompanyFaxNo($value)
 * @method static Builder|UserProfile whereCompanyGSTIN($value)
 * @method static Builder|UserProfile whereCompanyHouseNo($value)
 * @method static Builder|UserProfile whereCompanyLandmark($value)
 * @method static Builder|UserProfile whereCompanyLocality($value)
 * @method static Builder|UserProfile whereCompanyMobileNo($value)
 * @method static Builder|UserProfile whereCompanyMobileNo1($value)
 * @method static Builder|UserProfile whereCompanyName($value)
 * @method static Builder|UserProfile whereCompanyOfficeNo($value)
 * @method static Builder|UserProfile whereCompanyOtherTaluka($value)
 * @method static Builder|UserProfile whereCompanyOtherVillage($value)
 * @method static Builder|UserProfile whereCompanyPanNo($value)
 * @method static Builder|UserProfile whereCompanyPinCode($value)
 * @method static Builder|UserProfile whereCompanySecMobileNo($value)
 * @method static Builder|UserProfile whereCompanyState($value)
 * @method static Builder|UserProfile whereCompanyStreet($value)
 * @method static Builder|UserProfile whereCompanyTalukaValue($value)
 * @method static Builder|UserProfile whereCompanyVillageValue($value)
 * @method static Builder|UserProfile whereContactPerson($value)
 * @method static Builder|UserProfile whereContactPersonDesignation($value)
 * @method static Builder|UserProfile whereCreatedBy($value)
 * @method static Builder|UserProfile whereCreatedOn($value)
 * @method static Builder|UserProfile whereEntityCompanyBuilding($value)
 * @method static Builder|UserProfile whereEntityCompanyDistrictValue($value)
 * @method static Builder|UserProfile whereEntityCompanyHouseNo($value)
 * @method static Builder|UserProfile whereEntityCompanyLandmark($value)
 * @method static Builder|UserProfile whereEntityCompanyLocality($value)
 * @method static Builder|UserProfile whereEntityCompanyOtherVillage($value)
 * @method static Builder|UserProfile whereEntityCompanyPinCode($value)
 * @method static Builder|UserProfile whereEntityCompanyState($value)
 * @method static Builder|UserProfile whereEntityCompanyStreet($value)
 * @method static Builder|UserProfile whereEntityCompanyTalukaValue($value)
 * @method static Builder|UserProfile whereEntityCompanyVillageValue($value)
 * @method static Builder|UserProfile whereEntityName($value)
 * @method static Builder|UserProfile whereEntityOrgType($value)
 * @method static Builder|UserProfile whereEntityother($value)
 * @method static Builder|UserProfile whereID($value)
 * @method static Builder|UserProfile whereIndivisualAadharNumber($value)
 * @method static Builder|UserProfile whereIndivisualBuilding($value)
 * @method static Builder|UserProfile whereIndivisualDistrictValue($value)
 * @method static Builder|UserProfile whereIndivisualDivisionValue($value)
 * @method static Builder|UserProfile whereIndivisualEmailID($value)
 * @method static Builder|UserProfile whereIndivisualFatherName($value)
 * @method static Builder|UserProfile whereIndivisualFaxNo($value)
 * @method static Builder|UserProfile whereIndivisualGSTIN($value)
 * @method static Builder|UserProfile whereIndivisualHouseNo($value)
 * @method static Builder|UserProfile whereIndivisualLName($value)
 * @method static Builder|UserProfile whereIndivisualLandmark($value)
 * @method static Builder|UserProfile whereIndivisualLocality($value)
 * @method static Builder|UserProfile whereIndivisualMName($value)
 * @method static Builder|UserProfile whereIndivisualMobileNo($value)
 * @method static Builder|UserProfile whereIndivisualName($value)
 * @method static Builder|UserProfile whereIndivisualOccupation($value)
 * @method static Builder|UserProfile whereIndivisualOfficeNo($value)
 * @method static Builder|UserProfile whereIndivisualOtherTaluka($value)
 * @method static Builder|UserProfile whereIndivisualOtherVillage($value)
 * @method static Builder|UserProfile whereIndivisualPanNo($value)
 * @method static Builder|UserProfile whereIndivisualPinCode($value)
 * @method static Builder|UserProfile whereIndivisualState($value)
 * @method static Builder|UserProfile whereIndivisualStreet($value)
 * @method static Builder|UserProfile whereIndivisualTalukaValue($value)
 * @method static Builder|UserProfile whereIndivisualVillageValue($value)
 * @method static Builder|UserProfile whereIndvWebsiteURL($value)
 * @method static Builder|UserProfile whereInfoTypeValue($value)
 * @method static Builder|UserProfile whereIsCriminal($value)
 * @method static Builder|UserProfile whereIsIncorporatedRegisteredEntity($value)
 * @method static Builder|UserProfile whereIsPastExperience($value)
 * @method static Builder|UserProfile whereMemberCount($value)
 * @method static Builder|UserProfile whereModifiedBy($value)
 * @method static Builder|UserProfile whereModifiedOn($value)
 * @method static Builder|UserProfile whereOfficialCompanyBuilding($value)
 * @method static Builder|UserProfile whereOfficialCompanyDistrictValue($value)
 * @method static Builder|UserProfile whereOfficialCompanyHouseNo($value)
 * @method static Builder|UserProfile whereOfficialCompanyLandmark($value)
 * @method static Builder|UserProfile whereOfficialCompanyLocality($value)
 * @method static Builder|UserProfile whereOfficialCompanyOtherVillage($value)
 * @method static Builder|UserProfile whereOfficialCompanyPinCode($value)
 * @method static Builder|UserProfile whereOfficialCompanyState($value)
 * @method static Builder|UserProfile whereOfficialCompanyStreet($value)
 * @method static Builder|UserProfile whereOfficialCompanyTalukaValue($value)
 * @method static Builder|UserProfile whereOfficialCompanyVillageValue($value)
 * @method static Builder|UserProfile whereOfficialIndivisualBuilding($value)
 * @method static Builder|UserProfile whereOfficialIndivisualDistrictValue($value)
 * @method static Builder|UserProfile whereOfficialIndivisualDivisionValue($value)
 * @method static Builder|UserProfile whereOfficialIndivisualHouseNo($value)
 * @method static Builder|UserProfile whereOfficialIndivisualLandmark($value)
 * @method static Builder|UserProfile whereOfficialIndivisualLocality($value)
 * @method static Builder|UserProfile whereOfficialIndivisualOtherTaluka($value)
 * @method static Builder|UserProfile whereOfficialIndivisualOtherVillage($value)
 * @method static Builder|UserProfile whereOfficialIndivisualPinCode($value)
 * @method static Builder|UserProfile whereOfficialIndivisualState($value)
 * @method static Builder|UserProfile whereOfficialIndivisualStreet($value)
 * @method static Builder|UserProfile whereOfficialIndivisualTalukaValue($value)
 * @method static Builder|UserProfile whereOfficialIndivisualVillageValue($value)
 * @method static Builder|UserProfile whereOrgType($value)
 * @method static Builder|UserProfile whereOther($value)
 * @method static Builder|UserProfile whereOtherStateRegistration($value)
 * @method static Builder|UserProfile whereReasonForChange($value)
 * @method static Builder|UserProfile whereRoleID($value)
 * @method static Builder|UserProfile whereUserID($value)
 *
 * @mixin Eloquent
 */
class UserProfile extends Model
{
    protected $table = 'tbl_UserProfile';

    protected $connection = 'k_rera';

    /**
     * @return HasMany<ProjectMaster>
     */
    public function project(): HasMany
    {
        return $this->hasMany(ProjectMaster::class, 'UserID', 'UserID');
    }

    /**
     * @return HasOne<District>
     */
    public function companyDistrict(): HasOne
    {
        return $this->hasOne(District::class, 'Districtcode', 'CompanyDistrictValue')
            ->where('Langid', '1');
    }

    /**
     * @return HasOne<District>
     */
    public function individualDistrict(): HasOne
    {
        return $this->hasOne(District::class, 'Districtcode', 'IndivisualDistrictValue')
            ->where('Langid', '1');
    }

    /**
     * @return HasMany<MemberDetail>
     */
    public function partners(): HasMany
    {
        return $this->hasMany(MemberDetail::class, 'Userid', 'UserID');
    }

    /**
     * @return HasOne<TrackRecord>
     */
    public function trackRecord(): HasOne
    {
        return $this->hasOne(TrackRecord::class, 'UserID', 'UserID');
    }

    /**
     * @return HasMany<PromoterExperience>
     */
    public function experience(): HasMany
    {
        return $this->hasMany(PromoterExperience::class, 'UserID', 'UserID');
    }

    /**
     * @return HasOne<CommonDDMaster>
     */
    public function orgType(): HasOne
    {
        return $this->hasOne(CommonDDMaster::class, 'Id', 'OrgType');
    }

    /**
     * @return HasOne<UserLogo>
     */
    public function logo(): HasOne
    {
        return $this->hasOne(UserLogo::class, 'UserID', 'UserID');
    }
}
