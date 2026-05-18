<?php

namespace App\Models\KRERA;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\KRERA\State
 *
 * @property string|null $statename
 * @property int $statecode
 * @property int|null $countryid
 * @property int|null $langid
 * @property string|null $Union_Territory
 * @method static \Illuminate\Database\Eloquent\Builder|State newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|State newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|State query()
 * @method static \Illuminate\Database\Eloquent\Builder|State whereCountryid($value)
 * @method static \Illuminate\Database\Eloquent\Builder|State whereLangid($value)
 * @method static \Illuminate\Database\Eloquent\Builder|State whereStatecode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|State whereStatename($value)
 * @method static \Illuminate\Database\Eloquent\Builder|State whereUnionTerritory($value)
 * @mixin \Eloquent
 */
class State extends Model
{
    use HasFactory;

    protected $table = 'mstState';
    protected $connection = 'k_rera';
}
