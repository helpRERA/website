<?php

namespace App\Models\KRERA;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\KRERA\Taluk
 *
 * @property int $DistrictCode
 * @property int $SubDistrictcode
 * @property string|null $SubDistrictname
 * @property int $Langid
 * @property string|null $status
 * @method static Builder|Taluk newModelQuery()
 * @method static Builder|Taluk newQuery()
 * @method static Builder|Taluk query()
 * @method static Builder|Taluk whereDistrictCode($value)
 * @method static Builder|Taluk whereLangid($value)
 * @method static Builder|Taluk whereStatus($value)
 * @method static Builder|Taluk whereSubDistrictcode($value)
 * @method static Builder|Taluk whereSubDistrictname($value)
 * @mixin \Eloquent
 */
class Taluk extends Model
{
    use HasFactory;

    protected $table = 'mstTaluka';
    protected $connection = 'k_rera';

    public function inDistrict(int $district_code): Builder
    {
        return $this->where('DistrictCode', $district_code)
            ->where('langId', 1);
    }
}
