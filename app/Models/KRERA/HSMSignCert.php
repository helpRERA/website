<?php

namespace App\Models\KRERA;

use Eloquent;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\KRERA\HSMSignCert
 *
 * @property int $DgnID
 * @property string|null $UserID
 * @property string|null $AppId
 * @property int|null $ProjectID
 * @property int|null $Division
 * @property int|null $RoleID
 * @property string|null $FileName
 * @property mixed|null $DigitalCert
 * @property int|null $ServiceID
 * @property string|null $ContentType
 * @property string|null $CreatedDate
 * @property string|null $SignatureStatus
 * @property int|null $SignCount
 * @property string|null $FirstSignDt
 * @property string|null $SecondSignDt
 * @property mixed|null $AppPreview
 * @property mixed|null $AppPublicPreview
 * @property bool|null $IsReissued
 * @property int|null $ReissueCount
 * @property string|null $ReissueReason
 * @property string|null $ModifiedBy
 * @property string|null $ModifiedOn
 * @property bool|null $IsDigitalSign
 * @property int|null $deleteuserid
 * @property int|null $deleteappid
 * @method static Builder|HSMSignCert newModelQuery()
 * @method static Builder|HSMSignCert newQuery()
 * @method static Builder|HSMSignCert notEmpty()
 * @method static Builder|HSMSignCert query()
 * @method static Builder|HSMSignCert user($userID)
 * @method static Builder|HSMSignCert whereAppId($value)
 * @method static Builder|HSMSignCert whereAppPreview($value)
 * @method static Builder|HSMSignCert whereAppPublicPreview($value)
 * @method static Builder|HSMSignCert whereContentType($value)
 * @method static Builder|HSMSignCert whereCreatedDate($value)
 * @method static Builder|HSMSignCert whereDeleteappid($value)
 * @method static Builder|HSMSignCert whereDeleteuserid($value)
 * @method static Builder|HSMSignCert whereDgnID($value)
 * @method static Builder|HSMSignCert whereDigitalCert($value)
 * @method static Builder|HSMSignCert whereDivision($value)
 * @method static Builder|HSMSignCert whereFileName($value)
 * @method static Builder|HSMSignCert whereFirstSignDt($value)
 * @method static Builder|HSMSignCert whereIsDigitalSign($value)
 * @method static Builder|HSMSignCert whereIsReissued($value)
 * @method static Builder|HSMSignCert whereModifiedBy($value)
 * @method static Builder|HSMSignCert whereModifiedOn($value)
 * @method static Builder|HSMSignCert whereProjectID($value)
 * @method static Builder|HSMSignCert whereReissueCount($value)
 * @method static Builder|HSMSignCert whereReissueReason($value)
 * @method static Builder|HSMSignCert whereRoleID($value)
 * @method static Builder|HSMSignCert whereSecondSignDt($value)
 * @method static Builder|HSMSignCert whereServiceID($value)
 * @method static Builder|HSMSignCert whereSignCount($value)
 * @method static Builder|HSMSignCert whereSignatureStatus($value)
 * @method static Builder|HSMSignCert whereUserID($value)
 * @mixin Eloquent
 */
class HSMSignCert extends Model
{
    use HasFactory;

    protected $table = 'HSMSignCert';
    protected $connection = 'k_rera_docs';

    /**
     * @param Builder<HSMSignCert> $query
     * @param $userID
     * @return Builder<HSMSignCert>
     */
    public function scopeUser(Builder $query, $userID): Builder
    {
        return $query->where('UserID', $userID)
            ->where('RoleID', 2)
            ->where('SignatureStatus', 'Y');
    }


    /**
     * @param Builder<HSMSignCert> $query
     * @return Builder<HSMSignCert>
     */
    public function scopeNotEmpty(Builder $query): Builder
    {
        return $query->whereNotNull('DigitalCert')
            ->whereNotNull('FileName')
            ->whereNotNull('ContentType');
    }

}
