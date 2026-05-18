<?php

namespace App\Models\KRERA;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\KRERA\DocumentMaster
 *
 * @property int $ID
 * @property string $DocumentName
 * @property int|null $IsDisabledCer
 * @property int|null $orderNumber
 * @property string|null $SubHeading
 * @property bool|null $IsActive
 * @property int|null $IsRequired
 * @property string $DocumentSize
 * @property string|null $DocumentDescription
 * @property string|null $DocumentType
 * @property int|null $RoleType
 * @property bool $IsMultiple
 * @property int|null $CreatedBy
 * @property string|null $CreatedOn
 * @property int|null $ProjectType
 * @property int|null $IsPublic
 * @property int|null $IsDescription
 * @property int|null $IsDescriptionRequired
 * @property bool|null $IsEditableAfterCertificate
 * @property int|null $StateCode
 * @property int|null $SortOrder
 * @property string|null $Description
 * @method static \Illuminate\Database\Eloquent\Builder|DocumentMaster newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|DocumentMaster newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|DocumentMaster query()
 * @method static \Illuminate\Database\Eloquent\Builder|DocumentMaster whereCreatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DocumentMaster whereCreatedOn($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DocumentMaster whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DocumentMaster whereDocumentDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DocumentMaster whereDocumentName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DocumentMaster whereDocumentSize($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DocumentMaster whereDocumentType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DocumentMaster whereID($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DocumentMaster whereIsActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DocumentMaster whereIsDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DocumentMaster whereIsDescriptionRequired($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DocumentMaster whereIsDisabledCer($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DocumentMaster whereIsEditableAfterCertificate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DocumentMaster whereIsMultiple($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DocumentMaster whereIsPublic($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DocumentMaster whereIsRequired($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DocumentMaster whereOrderNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DocumentMaster whereProjectType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DocumentMaster whereRoleType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DocumentMaster whereSortOrder($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DocumentMaster whereStateCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DocumentMaster whereSubHeading($value)
 * @mixin \Eloquent
 */
class DocumentMaster extends Model
{
    use HasFactory;

    protected $table = 'tbl_DocumentMaster';
    protected $connection = 'k_rera';
}
