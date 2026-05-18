<?php

namespace App\Models\KRERA;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\KRERA\Litigation
 *
 * @property int $AlreadyRegisteredComplaintsId
 * @property int|null $SlNo
 * @property string|null $ComplaintNo
 * @property string|null $Complainant
 * @property string|null $Respondent
 * @property string|null $ProjRegNo
 * @property string|null $ProjectName
 * @property int|null $OrderTypeId
 * @property string|null $OrderIsValue
 * @property string|null $DocName
 * @property string|null $DocType
 * @property mixed|null $DocUpload
 * @property string|null $IPAddress
 * @property int|null $CreatedBy
 * @property int|null $UpdatedBy
 * @property string|null $CreatedDate
 * @property string|null $UpdatedDate
 * @property int|null $ComplaintYear
 * @property string|null $addby
 * @property int|null $ComplaintTypeId
 * @property bool|null $isDisposed
 * @property string|null $DateofFiling
 * @property string|null $ReliefSought
 * @property int|null $Bench
 * @property string|null $Orderspassed
 * @property string|null $RemarksStatus
 * @property string|null $EpDetails
 * @property string|null $AvailableReliefSought
 * @property string|null $AvailableReliefSoughtId
 * @property string|null $ProjectId
 * @property string|null $AlreadyRegisteredProject
 * @method static \Illuminate\Database\Eloquent\Builder|Litigation newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Litigation newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Litigation query()
 * @method static \Illuminate\Database\Eloquent\Builder|Litigation whereAddby($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Litigation whereAlreadyRegisteredComplaintsId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Litigation whereAlreadyRegisteredProject($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Litigation whereAvailableReliefSought($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Litigation whereAvailableReliefSoughtId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Litigation whereBench($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Litigation whereComplainant($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Litigation whereComplaintNo($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Litigation whereComplaintTypeId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Litigation whereComplaintYear($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Litigation whereCreatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Litigation whereCreatedDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Litigation whereDateofFiling($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Litigation whereDocName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Litigation whereDocType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Litigation whereDocUpload($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Litigation whereEpDetails($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Litigation whereIPAddress($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Litigation whereIsDisposed($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Litigation whereOrderIsValue($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Litigation whereOrderTypeId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Litigation whereOrderspassed($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Litigation whereProjRegNo($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Litigation whereProjectId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Litigation whereProjectName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Litigation whereReliefSought($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Litigation whereRemarksStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Litigation whereRespondent($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Litigation whereSlNo($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Litigation whereUpdatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Litigation whereUpdatedDate($value)
 * @mixin \Eloquent
 */
class Litigation extends Model
{
    public $timestamps = false;
    protected $table = 'AlreadyRegisteredComplaints';
    protected $connection = 'k_rera';
}
