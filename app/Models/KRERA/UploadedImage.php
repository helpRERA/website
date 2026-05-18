<?php

namespace App\Models\KRERA;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\KRERA\UploadedImage
 *
 * @property int $ID
 * @property int|null $ProjectID
 * @property int|null $BuildingID
 * @property int|null $DocID
 * @property string|null $DocumentName
 * @property string|null $FileName
 * @property mixed|null $FileContent
 * @property string|null $FileType
 * @property string|null $FileSize
 * @property int|null $CreatedBy
 * @property string|null $CreatedOn
 * @property int|null $ModifiedBy
 * @property string|null $ModifiedOn
 * @property string|null $Remarks
 * @property string|null $Quoter
 * @property int|null $QuoterYear
 * @property string|null $TempQuoter
 * @property int|null $TempQuoterYear
 * @method static \Illuminate\Database\Eloquent\Builder|UploadedImage newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|UploadedImage newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|UploadedImage query()
 * @method static \Illuminate\Database\Eloquent\Builder|UploadedImage whereBuildingID($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UploadedImage whereCreatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UploadedImage whereCreatedOn($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UploadedImage whereDocID($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UploadedImage whereDocumentName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UploadedImage whereFileContent($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UploadedImage whereFileName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UploadedImage whereFileSize($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UploadedImage whereFileType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UploadedImage whereID($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UploadedImage whereModifiedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UploadedImage whereModifiedOn($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UploadedImage whereProjectID($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UploadedImage whereQuoter($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UploadedImage whereQuoterYear($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UploadedImage whereRemarks($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UploadedImage whereTempQuoter($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UploadedImage whereTempQuoterYear($value)
 * @mixin \Eloquent
 */
class UploadedImage extends Model
{
    use HasFactory;

    protected $table = 'tbl_UploadPhoto';
    protected $connection = 'k_rera_docs';

}
