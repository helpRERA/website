<?php

namespace App\Models\KRERA;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\KRERA\CertificateInfo
 *
 * @property int $ID
 * @property int|null $ApprovalID
 * @property int|null $UserID
 * @property int|null $ProjectID
 * @property int|null $Division
 * @property int|null $RoleID
 * @property string|null $RegistrationNo
 * @property string|null $CertificateNo
 * @property int|null $CreatedBy
 * @property string|null $Createdon
 * @property int|null $StateCount
 * @property string|null $deletecomment
 * @property string|null $TermsConditions
 * @property int|null $DeleteProjectId
 * @property int|null $DeleteUserId
 * @property string|null $ManualRegDate
 * @method static \Illuminate\Database\Eloquent\Builder|CertificateInfo newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|CertificateInfo newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|CertificateInfo query()
 * @method static \Illuminate\Database\Eloquent\Builder|CertificateInfo whereApprovalID($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CertificateInfo whereCertificateNo($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CertificateInfo whereCreatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CertificateInfo whereCreatedon($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CertificateInfo whereDeleteProjectId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CertificateInfo whereDeleteUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CertificateInfo whereDeletecomment($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CertificateInfo whereDivision($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CertificateInfo whereID($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CertificateInfo whereManualRegDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CertificateInfo whereProjectID($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CertificateInfo whereRegistrationNo($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CertificateInfo whereRoleID($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CertificateInfo whereStateCount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CertificateInfo whereTermsConditions($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CertificateInfo whereUserID($value)
 * @mixin \Eloquent
 */
class CertificateInfo extends Model
{
    use HasFactory;

    protected $table = 'tbl_CertificateP';
    protected $connection = 'k_rera';
}
