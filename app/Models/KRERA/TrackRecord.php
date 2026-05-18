<?php

namespace App\Models\KRERA;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\KRERA\TrackRecord
 *
 * @property int $ID
 * @property int|null $UserID
 * @property int|null $RoleID
 * @property int|null $StateExperianceYearCount
 * @property int|null $UTExperianceYearCount
 * @property int|null $NumberofProjectExperianceCount
 * @property int|null $ProjectAreaConstructed
 * @property int|null $OngoingPoroject
 * @property int|null $AreatobeConstructed
 * @property string|null $CreatedOn
 * @property string|null $CreatedBy
 * @property string|null $ModifiedOn
 * @property string|null $ModifiedBY
 * @method static \Illuminate\Database\Eloquent\Builder|TrackRecord newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|TrackRecord newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|TrackRecord query()
 * @method static \Illuminate\Database\Eloquent\Builder|TrackRecord whereAreatobeConstructed($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TrackRecord whereCreatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TrackRecord whereCreatedOn($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TrackRecord whereID($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TrackRecord whereModifiedBY($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TrackRecord whereModifiedOn($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TrackRecord whereNumberofProjectExperianceCount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TrackRecord whereOngoingPoroject($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TrackRecord whereProjectAreaConstructed($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TrackRecord whereRoleID($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TrackRecord whereStateExperianceYearCount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TrackRecord whereUTExperianceYearCount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TrackRecord whereUserID($value)
 * @mixin \Eloquent
 */
class TrackRecord extends Model
{
    public $timestamps = false;
    protected $table = 'tbl_TrackRecord';
    protected $connection = 'k_rera';
}
