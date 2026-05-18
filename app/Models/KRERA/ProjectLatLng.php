<?php

namespace App\Models\KRERA;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\KRERA\ProjectLatLng
 *
 * @property int $ID
 * @property int|null $ProjectID
 * @property string|null $Latitude
 * @property string|null $Longitude
 * @property int|null $UserID
 * @property int|null $CreatedBy
 * @property string|null $CreatedDate
 * @property int|null $ModifiedBy
 * @property string|null $ModifiedDate
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectLatLng newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectLatLng newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectLatLng query()
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectLatLng whereCreatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectLatLng whereCreatedDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectLatLng whereID($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectLatLng whereLatitude($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectLatLng whereLongitude($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectLatLng whereModifiedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectLatLng whereModifiedDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectLatLng whereProjectID($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectLatLng whereUserID($value)
 * @mixin \Eloquent
 */
class ProjectLatLng extends Model
{
    use HasFactory;

    protected $table = 'tbl_GISDetails';
    protected $connection = 'k_rera';

}
