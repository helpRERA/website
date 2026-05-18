<?php

namespace App\Models\KRERA;

use Eloquent;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\KRERA\RegistrationOrder
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
 * @method static Builder|RegistrationOrder newModelQuery()
 * @method static Builder|RegistrationOrder newQuery()
 * @method static Builder|RegistrationOrder query()
 * @method static Builder|RegistrationOrder whereCreatedBy($value)
 * @method static Builder|RegistrationOrder whereCreatedOn($value)
 * @method static Builder|RegistrationOrder whereDivisionID($value)
 * @method static Builder|RegistrationOrder whereDocID($value)
 * @method static Builder|RegistrationOrder whereFileContent($value)
 * @method static Builder|RegistrationOrder whereFileName($value)
 * @method static Builder|RegistrationOrder whereFileType($value)
 * @method static Builder|RegistrationOrder whereMoreInfoID($value)
 * @method static Builder|RegistrationOrder whereProjectID($value)
 * @method static Builder|RegistrationOrder whereRoleID($value)
 * @method static Builder|RegistrationOrder whereUserID($value)
 * @mixin Eloquent
 */
class RegistrationOrder extends Model
{
    use HasFactory;

    protected $table = 'tbl_MoreInfoDocs';
    protected $connection = 'k_rera_docs';
}
