<?php

namespace App\Models\KRERA;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\KRERA\Facility
 *
 * @property int $ID
 * @property int|null $FDetailID
 * @property string|null $FDetailName
 * @property int|null $ProjectID
 * @property string|null $Available
 * @property string|null $Percent
 * @property string|null $Details
 * @property int|null $CreatedBy
 * @property string|null $CreatedOn
 * @property int|null $ModifiedBy
 * @property string|null $ModifiedOn
 * @property int|null $NoofUnits
 * @property int|null $CarpetArea
 * @property int|null $DeleteProjectId
 * @property string|null $Quoter
 * @property string|null $QuoterYear
 * @property string|null $TempPercent
 * @property string|null $TempQuoter
 * @property int|null $TempQuoterYear
 * @method static \Illuminate\Database\Eloquent\Builder|Facility newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Facility newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Facility query()
 * @method static \Illuminate\Database\Eloquent\Builder|Facility whereAvailable($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Facility whereCarpetArea($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Facility whereCreatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Facility whereCreatedOn($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Facility whereDeleteProjectId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Facility whereDetails($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Facility whereFDetailID($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Facility whereFDetailName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Facility whereID($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Facility whereModifiedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Facility whereModifiedOn($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Facility whereNoofUnits($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Facility wherePercent($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Facility whereProjectID($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Facility whereQuoter($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Facility whereQuoterYear($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Facility whereTempPercent($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Facility whereTempQuoter($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Facility whereTempQuoterYear($value)
 * @mixin \Eloquent
 */
class Facility extends Model
{
    use HasFactory;

    protected $table = 'tbl_FacilityDetails';
    protected $connection = 'k_rera';

    /**
     * Query Unique FDetailName
     *
     * @return Collection<int, Facility>
     */
    public function amenities(): Collection
    {
        return $this->groupBy('FDetailName')
            ->whereNotNull('FDetailName')
            ->select('FDetailName')
            ->get();
    }
}
