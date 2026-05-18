<?php

namespace App\Models\KRERA;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\KRERA\RegisteredAppeal
 *
 * @property int $RegisteredAppealId
 * @property string|null $AppellateRequestNumber
 * @property string|null $ComplaintNo
 * @property string|null $AppellantName
 * @property string|null $Respondent
 * @property string|null $ProjectRegistrationNumber
 * @property string|null $ProjectName
 * @property int|null $OrderTypeId
 * @property string|null $DocName
 * @property string|null $DocType
 * @property mixed|null $DocUpload
 * @property string|null $IPAddress
 * @property int|null $CreatedBy
 * @property int|null $UpdatedBy
 * @property string|null $CreatedDate
 * @property string|null $UpdatedDate
 * @property int|null $ComplaintYear
 * @method static \Illuminate\Database\Eloquent\Builder|RegisteredAppeal newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|RegisteredAppeal newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|RegisteredAppeal query()
 * @method static \Illuminate\Database\Eloquent\Builder|RegisteredAppeal whereAppellantName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RegisteredAppeal whereAppellateRequestNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RegisteredAppeal whereComplaintNo($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RegisteredAppeal whereComplaintYear($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RegisteredAppeal whereCreatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RegisteredAppeal whereCreatedDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RegisteredAppeal whereDocName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RegisteredAppeal whereDocType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RegisteredAppeal whereDocUpload($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RegisteredAppeal whereIPAddress($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RegisteredAppeal whereOrderTypeId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RegisteredAppeal whereProjectName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RegisteredAppeal whereProjectRegistrationNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RegisteredAppeal whereRegisteredAppealId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RegisteredAppeal whereRespondent($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RegisteredAppeal whereUpdatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RegisteredAppeal whereUpdatedDate($value)
 * @mixin \Eloquent
 */
class RegisteredAppeal extends Model
{
    public $timestamps = false;

    public $table = 'RegisteredAppeal';

    public $connection = 'k_rera';
}
