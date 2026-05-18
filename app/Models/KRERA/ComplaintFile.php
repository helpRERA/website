<?php

namespace App\Models\KRERA;

use Eloquent;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\KRERA\ComplaintFile
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
 * @method static Builder|ComplaintFile complaint(string $complaintNo, string $complaintYear, string $complainant)
 * @method static Builder|ComplaintFile newModelQuery()
 * @method static Builder|ComplaintFile newQuery()
 * @method static Builder|ComplaintFile query()
 * @method static Builder|ComplaintFile whereAddby($value)
 * @method static Builder|ComplaintFile whereAlreadyRegisteredComplaintsId($value)
 * @method static Builder|ComplaintFile whereAlreadyRegisteredProject($value)
 * @method static Builder|ComplaintFile whereAvailableReliefSought($value)
 * @method static Builder|ComplaintFile whereAvailableReliefSoughtId($value)
 * @method static Builder|ComplaintFile whereBench($value)
 * @method static Builder|ComplaintFile whereComplainant($value)
 * @method static Builder|ComplaintFile whereComplaintNo($value)
 * @method static Builder|ComplaintFile whereComplaintTypeId($value)
 * @method static Builder|ComplaintFile whereComplaintYear($value)
 * @method static Builder|ComplaintFile whereCreatedBy($value)
 * @method static Builder|ComplaintFile whereCreatedDate($value)
 * @method static Builder|ComplaintFile whereDateofFiling($value)
 * @method static Builder|ComplaintFile whereDocName($value)
 * @method static Builder|ComplaintFile whereDocType($value)
 * @method static Builder|ComplaintFile whereDocUpload($value)
 * @method static Builder|ComplaintFile whereEpDetails($value)
 * @method static Builder|ComplaintFile whereIPAddress($value)
 * @method static Builder|ComplaintFile whereIsDisposed($value)
 * @method static Builder|ComplaintFile whereOrderIsValue($value)
 * @method static Builder|ComplaintFile whereOrderTypeId($value)
 * @method static Builder|ComplaintFile whereOrderspassed($value)
 * @method static Builder|ComplaintFile whereProjRegNo($value)
 * @method static Builder|ComplaintFile whereProjectId($value)
 * @method static Builder|ComplaintFile whereProjectName($value)
 * @method static Builder|ComplaintFile whereReliefSought($value)
 * @method static Builder|ComplaintFile whereRemarksStatus($value)
 * @method static Builder|ComplaintFile whereRespondent($value)
 * @method static Builder|ComplaintFile whereSlNo($value)
 * @method static Builder|ComplaintFile whereUpdatedBy($value)
 * @method static Builder|ComplaintFile whereUpdatedDate($value)
 * @mixin Eloquent
 */
class ComplaintFile extends Model
{
    use HasFactory;

    protected $table = 'AlreadyRegisteredComplaints';
    protected $connection = 'k_rera';

    /**
     * @return Builder<ComplaintFile>
     */
    public function scopeComplaint(
        Builder $query,
        string $complaintNo,
        string $complaintYear,
        string $complainant
    ): Builder {
        return $query->where('ComplaintNo', $complaintNo)
            ->where('ComplaintYear', $complaintYear)
            ->where('Complainant', $complainant);
    }
}
