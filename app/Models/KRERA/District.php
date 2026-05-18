<?php

namespace App\Models\KRERA;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\KRERA\District
 *
 * @property int|null $Districtcode
 * @property string|null $Districtname
 * @property int|null $Statecode
 * @property int|null $Langid
 * @property int|null $Divisionid
 * @property string|null $Status
 * @property string|null $DistrictCD
 * @property int|null $DeskUserid
 * @property-read \App\Models\KRERA\State|null $state
 * @method static Builder|District english()
 * @method static Builder|District newModelQuery()
 * @method static Builder|District newQuery()
 * @method static Builder|District query()
 * @method static Builder|District whereDeskUserid($value)
 * @method static Builder|District whereDistrictCD($value)
 * @method static Builder|District whereDistrictcode($value)
 * @method static Builder|District whereDistrictname($value)
 * @method static Builder|District whereDivisionid($value)
 * @method static Builder|District whereLangid($value)
 * @method static Builder|District whereStatecode($value)
 * @method static Builder|District whereStatus($value)
 * @mixin \Eloquent
 */
class District extends Model
{
    protected $table = 'mstDistrict';

    protected $connection = 'k_rera';

    /**
     * @param  Builder<Builder>  $builder
     * @return Builder<District>
     */
    public function scopeEnglish(Builder $builder): Builder
    {
        return $builder->where('Langid', 1);
    }

    /**
     * @return BelongsTo<State, District>
     */
    public function state(): BelongsTo
    {
        return $this->belongsTo(State::class, 'Statecode', 'statecode');
    }
}
