<?php

namespace App\Models\KRERA;

use Eloquent;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


/**
 * App\Models\KRERA\ExtensionOrder
 *
 * @property int $DocID
 * @property string|null $FileName
 * @property string|null $FileType
 * @property mixed|null $FileContent
 * @property int|null $RoleID
 * @property int|null $ProjectID
 * @property int|null $UserID
 * @property int|null $DivisionID
 * @property int|null $CreatedBy
 * @property string|null $CreatedOn
 * @property int|null $MoreInfoID
 * @method static Builder|ExtensionOrder newModelQuery()
 * @method static Builder|ExtensionOrder newQuery()
 * @method static Builder|ExtensionOrder query()
 * @method static Builder|ExtensionOrder whereCreatedBy($value)
 * @method static Builder|ExtensionOrder whereCreatedOn($value)
 * @method static Builder|ExtensionOrder whereDivisionID($value)
 * @method static Builder|ExtensionOrder whereDocID($value)
 * @method static Builder|ExtensionOrder whereFileContent($value)
 * @method static Builder|ExtensionOrder whereFileName($value)
 * @method static Builder|ExtensionOrder whereFileType($value)
 * @method static Builder|ExtensionOrder whereMoreInfoID($value)
 * @method static Builder|ExtensionOrder whereProjectID($value)
 * @method static Builder|ExtensionOrder whereRoleID($value)
 * @method static Builder|ExtensionOrder whereUserID($value)
 * @mixin Eloquent
 */
class ExtensionOrder extends Model
{
    use HasFactory;

    protected $table = 'tbl_ExtMoreInfoDocs ';
    protected $connection = 'k_rera_docs';
}
