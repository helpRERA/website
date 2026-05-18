<?php

namespace App\Models\KRERA;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\KRERA\MemberCount
 *
 * @property int $ID
 * @property int|null $OrgType
 * @property string|null $Designation
 * @property int|null $MemberCount
 * @property int|null $CreatedBy
 * @property string|null $Createdon
 * @property int|null $Alteredby
 * @property string|null $Alteredon
 * @method static \Illuminate\Database\Eloquent\Builder|MemberCount newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|MemberCount newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|MemberCount query()
 * @method static \Illuminate\Database\Eloquent\Builder|MemberCount whereAlteredby($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MemberCount whereAlteredon($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MemberCount whereCreatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MemberCount whereCreatedon($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MemberCount whereDesignation($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MemberCount whereID($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MemberCount whereMemberCount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MemberCount whereOrgType($value)
 * @mixin \Eloquent
 */
class MemberCount extends Model
{
    public $timestamps = false;

    protected $table = 'tbl_MemberCount';

    protected $connection = 'k_rera';
}
