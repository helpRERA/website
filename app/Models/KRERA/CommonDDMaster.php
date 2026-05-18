<?php

namespace App\Models\KRERA;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\KRERA\CommonDDMaster
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
 * @method static \Illuminate\Database\Eloquent\Builder|CommonDDMaster newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|CommonDDMaster newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|CommonDDMaster query()
 * @method static \Illuminate\Database\Eloquent\Builder|CommonDDMaster whereAlteredby($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CommonDDMaster whereAlteredon($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CommonDDMaster whereCreatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CommonDDMaster whereCreatedon($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CommonDDMaster whereDetails($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CommonDDMaster whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CommonDDMaster whereIdNew($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CommonDDMaster whereIsActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CommonDDMaster whereShowLevel($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CommonDDMaster whereSortyBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CommonDDMaster whereTypeName($value)
 * @mixin \Eloquent
 */
class CommonDDMaster extends Model
{
    public $timestamps = false;

    public $table = 'tbl_CommonDDMaster';

    public $connection = 'k_rera';
}
