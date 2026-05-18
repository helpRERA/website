<?php

namespace App\Models\KRERA;

use Eloquent;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

/**
 * App\Models\KRERA\MemberDetail
 *
 * @property int $ID
 * @property int|null $Userid
 * @property int|null $MDMID
 * @property int|null $RoleID
 * @property string|null $FName
 * @property string|null $MName
 * @property string|null $LName
 * @property string|null $Designation
 * @property mixed|null $ProfileImage
 * @property string|null $MimeType
 * @property string|null $FileName
 * @property string|null $PanNo
 * @property string|null $HouseNo
 * @property string|null $Building
 * @property string|null $Street
 * @property string|null $Locality
 * @property string|null $Landmark
 * @property int|null $StateID
 * @property int|null $DivisionID
 * @property int|null $DistrictID
 * @property int|null $TalukaID
 * @property int|null $VillageID
 * @property string|null $PinCode
 * @property int|null $CreatedBy
 * @property string|null $CreatedOn
 * @property int|null $ModifiedBy
 * @property string|null $ModifiedOn
 * @property string|null $AadharNo
 * @property string|null $MemberType
 * @property string|null $other
 * @property string|null $MobileNo
 * @property string|null $OfficeNo
 * @property string|null $FaxNo
 * @property string|null $EmailID
 * @property string|null $ContactPerson
 * @property string|null $ContactPersonDesignation
 * @property string|null $MemberOtherTaluka
 * @property string|null $MemberOtherVillage
 * @property string|null $OtherVillage
 * @property string|null $SecondaryMobileNo
 * @property int|null $deleteUserId
 * @property-read District|null $district
 *
 * @method static Builder|MemberDetail newModelQuery()
 * @method static Builder|MemberDetail newQuery()
 * @method static Builder|MemberDetail query()
 * @method static Builder|MemberDetail whereAadharNo($value)
 * @method static Builder|MemberDetail whereBuilding($value)
 * @method static Builder|MemberDetail whereContactPerson($value)
 * @method static Builder|MemberDetail whereContactPersonDesignation($value)
 * @method static Builder|MemberDetail whereCreatedBy($value)
 * @method static Builder|MemberDetail whereCreatedOn($value)
 * @method static Builder|MemberDetail whereDeleteUserId($value)
 * @method static Builder|MemberDetail whereDesignation($value)
 * @method static Builder|MemberDetail whereDistrictID($value)
 * @method static Builder|MemberDetail whereDivisionID($value)
 * @method static Builder|MemberDetail whereEmailID($value)
 * @method static Builder|MemberDetail whereFName($value)
 * @method static Builder|MemberDetail whereFaxNo($value)
 * @method static Builder|MemberDetail whereFileName($value)
 * @method static Builder|MemberDetail whereHouseNo($value)
 * @method static Builder|MemberDetail whereID($value)
 * @method static Builder|MemberDetail whereLName($value)
 * @method static Builder|MemberDetail whereLandmark($value)
 * @method static Builder|MemberDetail whereLocality($value)
 * @method static Builder|MemberDetail whereMDMID($value)
 * @method static Builder|MemberDetail whereMName($value)
 * @method static Builder|MemberDetail whereMemberOtherTaluka($value)
 * @method static Builder|MemberDetail whereMemberOtherVillage($value)
 * @method static Builder|MemberDetail whereMemberType($value)
 * @method static Builder|MemberDetail whereMimeType($value)
 * @method static Builder|MemberDetail whereMobileNo($value)
 * @method static Builder|MemberDetail whereModifiedBy($value)
 * @method static Builder|MemberDetail whereModifiedOn($value)
 * @method static Builder|MemberDetail whereOfficeNo($value)
 * @method static Builder|MemberDetail whereOther($value)
 * @method static Builder|MemberDetail whereOtherVillage($value)
 * @method static Builder|MemberDetail wherePanNo($value)
 * @method static Builder|MemberDetail wherePinCode($value)
 * @method static Builder|MemberDetail whereProfileImage($value)
 * @method static Builder|MemberDetail whereRoleID($value)
 * @method static Builder|MemberDetail whereSecondaryMobileNo($value)
 * @method static Builder|MemberDetail whereStateID($value)
 * @method static Builder|MemberDetail whereStreet($value)
 * @method static Builder|MemberDetail whereTalukaID($value)
 * @method static Builder|MemberDetail whereUserid($value)
 * @method static Builder|MemberDetail whereVillageID($value)
 *
 * @mixin Eloquent
 */
class MemberDetail extends Model
{
    public $timestamps = false;

    protected $table = 'tbl_MemberDetails';

    protected $connection = 'k_rera';

    protected $hidden = ['ProfileImage'];

    /**
     * @return HasOne<District>
     */
    public function district(): HasOne
    {
        return $this->hasOne(District::class, 'Districtcode', 'DistrictID');
    }

    /**
     * @return HasOne<MemberCount>
     */
    public function memberDesignation(): HasOne
    {
        return $this->hasOne(MemberCount::class, 'ID', 'Designation');
    }
}
