<?php

namespace App\Models\Announcement;

use App\Models\Document;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * App\Models\Announcement\AnnouncementFile
 *
 * @property int $id
 * @property int $document_id
 * @property int $announcement_id
 * @property int|null $created_by
 * @property int|null $updated_by
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read Document|null $document
 * @method static \Illuminate\Database\Eloquent\Builder|AnnouncementFile newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|AnnouncementFile newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|AnnouncementFile onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|AnnouncementFile query()
 * @method static \Illuminate\Database\Eloquent\Builder|AnnouncementFile whereAnnouncementId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AnnouncementFile whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AnnouncementFile whereCreatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AnnouncementFile whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AnnouncementFile whereDocumentId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AnnouncementFile whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AnnouncementFile whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AnnouncementFile whereUpdatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AnnouncementFile withTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|AnnouncementFile withoutTrashed()
 * @mixin \Eloquent
 */
class AnnouncementFile extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        'announcement_id',
        'document_id'
    ];


    /**
     * @return HasOne<Document>
     */
    public function document(): HasOne
    {
        return $this->hasOne(Document::class, 'id', 'document_id');
    }
}
