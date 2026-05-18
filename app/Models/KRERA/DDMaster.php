<?php

namespace App\Models\KRERA;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * App\Models\KRERA\DDMaster
 *
 * @property int $Id
 * @property string|null $TypeName
 * @property int|null $ShowLevel
 * @property int|null $IsActive
 * @property string|null $CreatedBy
 * @property string|null $Createdon
 * @property string|null $Alteredby
 * @property string|null $Alteredon
 * @property string|null $Details
 * @property int|null $IdNew
 * @property int|null $SortyBy
 * @method static Builder|DDMaster buildingType()
 * @method static Builder|DDMaster newModelQuery()
 * @method static Builder|DDMaster newQuery()
 * @method static Builder|DDMaster onlyTrashed()
 * @method static Builder|DDMaster projectType()
 * @method static Builder|DDMaster query()
 * @method static Builder|DDMaster whereAlteredby($value)
 * @method static Builder|DDMaster whereAlteredon($value)
 * @method static Builder|DDMaster whereCreatedBy($value)
 * @method static Builder|DDMaster whereCreatedon($value)
 * @method static Builder|DDMaster whereDetails($value)
 * @method static Builder|DDMaster whereId($value)
 * @method static Builder|DDMaster whereIdNew($value)
 * @method static Builder|DDMaster whereIsActive($value)
 * @method static Builder|DDMaster whereShowLevel($value)
 * @method static Builder|DDMaster whereSortyBy($value)
 * @method static Builder|DDMaster whereTypeName($value)
 * @method static Builder|DDMaster withTrashed()
 * @method static Builder|DDMaster withoutTrashed()
 * @mixin \Eloquent
 */
class DDMaster extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $table = 'tbl_CommonDDMaster';
    protected $connection = 'k_rera';


    /**
     * @return Builder<DDMaster>
     */
    public function scopeProjectType(Builder $query): Builder
    {
        return $query->where('ShowLevel', 2)
            ->where('IsActive', 1);
    }

    /**
     * scope for building type (show level 5)
     *
     * @return Builder<DDMaster>
     */
    public function scopeBuildingType(Builder $query): Builder
    {
        return $query->where('ShowLevel', 5)
            ->where('IsActive', 1);
    }
}
