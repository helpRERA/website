<?php

namespace App\Models\KRERA;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\KRERA\Certificate
 *
 * @property int $ID
 * @property int|null $ApprovalID
 * @property int|null $UserID
 * @property int|null $ProjectID
 * @property int|null $DivisionID
 * @property int|null $DistrictID
 * @property int|null $TalukaID
 * @property int|null $VillageID
 * @property int|null $RoleID
 * @property string|null $RegistrationNo
 * @property string|null $CertificateNo
 * @property int|null $CreatedBy
 * @property string|null $CreatedOn
 * @property string|null $deletecomment
 * @property int|null $DeleteProjectId
 * @property int|null $DeleteIserId
 * @method static \Illuminate\Database\Eloquent\Builder|Certificate newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Certificate newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Certificate query()
 * @method static \Illuminate\Database\Eloquent\Builder|Certificate whereApprovalID($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Certificate whereCertificateNo($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Certificate whereCreatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Certificate whereCreatedOn($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Certificate whereDeleteIserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Certificate whereDeleteProjectId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Certificate whereDeletecomment($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Certificate whereDistrictID($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Certificate whereDivisionID($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Certificate whereID($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Certificate whereProjectID($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Certificate whereRegistrationNo($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Certificate whereRoleID($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Certificate whereTalukaID($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Certificate whereUserID($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Certificate whereVillageID($value)
 * @mixin \Eloquent
 */
class Certificate extends Model
{
    use HasFactory;

    protected $table = 'tbl_Certificate';
    protected $connection = 'k_rera';
}
