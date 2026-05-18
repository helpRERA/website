<?php

namespace App\Models\KRERA;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\KRERA\Village
 *
 * @property int $Villagecode
 * @property string $Villagename
 * @property int $Subdistrictcode
 * @property string $langid
 * @method static \Illuminate\Database\Eloquent\Builder|Village newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Village newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Village query()
 * @method static \Illuminate\Database\Eloquent\Builder|Village whereLangid($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Village whereSubdistrictcode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Village whereVillagecode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Village whereVillagename($value)
 * @mixin \Eloquent
 */
class Village extends Model
{
    use HasFactory;

    protected $table = 'mstVillage';
    protected $connection = 'k_rera';
}
