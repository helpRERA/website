<?php

namespace App\Models\KRERA;

use Eloquent;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Carbon;

/**
 * App\Models\KRERA\ProjectDocument
 *
 * @property int $ID
 * @property int|null $ProjectID
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
 * @property string|null $Description
 * @property int|null $IsVerified
 * @property int|null $IsResubmit
 * @property string|null $Quoter
 * @property int|null $QuoterYear
 * @property int|null $IsView
 * @property int|null $IsImportant
 * @property string|null $IsCorrectionDoc
 * @property-read \App\Models\KRERA\DocumentMaster|null $master
 * @method static Builder|ProjectDocument hasContent()
 * @method static Builder|ProjectDocument newModelQuery()
 * @method static Builder|ProjectDocument newQuery()
 * @method static Builder|ProjectDocument query()
 * @method static Builder|ProjectDocument whereCreatedBy($value)
 * @method static Builder|ProjectDocument whereCreatedOn($value)
 * @method static Builder|ProjectDocument whereDescription($value)
 * @method static Builder|ProjectDocument whereDocID($value)
 * @method static Builder|ProjectDocument whereDocumentName($value)
 * @method static Builder|ProjectDocument whereFileContent($value)
 * @method static Builder|ProjectDocument whereFileName($value)
 * @method static Builder|ProjectDocument whereFileSize($value)
 * @method static Builder|ProjectDocument whereFileType($value)
 * @method static Builder|ProjectDocument whereID($value)
 * @method static Builder|ProjectDocument whereIsCorrectionDoc($value)
 * @method static Builder|ProjectDocument whereIsImportant($value)
 * @method static Builder|ProjectDocument whereIsResubmit($value)
 * @method static Builder|ProjectDocument whereIsVerified($value)
 * @method static Builder|ProjectDocument whereIsView($value)
 * @method static Builder|ProjectDocument whereModifiedBy($value)
 * @method static Builder|ProjectDocument whereModifiedOn($value)
 * @method static Builder|ProjectDocument whereProjectID($value)
 * @method static Builder|ProjectDocument whereQuoter($value)
 * @method static Builder|ProjectDocument whereQuoterYear($value)
 * @mixin Eloquent
 */
class ProjectDocument extends Model
{
    use HasFactory;

    protected $table = 'tbl_UserDocument';

    protected $connection = 'k_rera_docs';

    /**
     * Undocumented function
     *
     * @return BelongsTo<ProjectDocument, DocumentMaster>
     */
    public function master(): BelongsTo
    {
        return $this->belongsTo(DocumentMaster::class, 'DocID', 'ID');
    }

    /**
     * @param  Builder<ProjectDocument>  $builder
     * @return Builder<ProjectDocument>
     */
    public function scopeHasContent(Builder $builder): Builder
    {
        return $builder->whereNotNull('FileName');
    }
}
