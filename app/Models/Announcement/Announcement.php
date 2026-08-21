<?php

namespace App\Models\Announcement;

use App\Models\Announcement\AnnouncementTag;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * App\Models\Announcement\Announcement
 *
 * @property int $id
 * @property string|null $title
 * @property string|null $description
 * @property string|null $title_malayalam
 * @property string|null $description_malayalam
 * @property string|null $date
 * @property string|null $type
 * @property array<string>|null $category
 * @property int $published
 * @property int|null $created_by
 * @property int|null $updated_by
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property string|null $sub_type
 * @property int $ticker
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Announcement\AnnouncementFile> $documents
 * @property-read int|null $documents_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, AnnouncementTag> $tags
 * @property-read int|null $tags_count
 * @method static Builder|Announcement newModelQuery()
 * @method static Builder|Announcement newQuery()
 * @method static Builder|Announcement onlyTrashed()
 * @method static Builder|Announcement published()
 * @method static Builder|Announcement query()
 * @method static Builder|Announcement whereCreatedAt($value)
 * @method static Builder|Announcement whereCreatedBy($value)
 * @method static Builder|Announcement whereDate($value)
 * @method static Builder|Announcement whereDeletedAt($value)
 * @method static Builder|Announcement whereDescription($value)
 * @method static Builder|Announcement whereDescriptionMalayalam($value)
 * @method static Builder|Announcement whereId($value)
 * @method static Builder|Announcement wherePublished($value)
 * @method static Builder|Announcement whereSubType($value)
 * @method static Builder|Announcement whereTicker($value)
 * @method static Builder|Announcement whereTitle($value)
 * @method static Builder|Announcement whereTitleMalayalam($value)
 * @method static Builder|Announcement whereType($value)
 * @method static Builder|Announcement whereUpdatedAt($value)
 * @method static Builder|Announcement whereUpdatedBy($value)
 * @method static Builder|Announcement withTrashed()
 * @method static Builder|Announcement withoutTrashed()
 * @mixin \Eloquent
 */
class Announcement extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        'title',
        'title_malayalam',
        'description',
        'description_malayalam',
        'date',
        'type',
        'sub_type',
        'category',
        'published',
        'ticker',
        'is_new',
        'created_by',
        'updated_by',
        'deleted_at'
    ];

    protected $casts = [
        "category" => "array",
        // "published"=> true,
        // "ticker"=> false,
        // "is_new"=> false
    ];

    /**
     * @return HasMany<AnnouncementFile>
     */
    public function documents(): HasMany
    {
        return $this->hasMany(AnnouncementFile::class, 'announcement_id', 'id');
    }

    /**
     * @return HasMany<AnnouncementTag>
     */
    public function tags(): HasMany
    {
        return $this->hasMany(AnnouncementTag::class, 'announcement_id', 'id');
    }

    /**
     * @param Builder<Announcement> $query
     *
     * @return Builder<Announcement>
     */
    public function scopePublished(Builder $query): Builder
    {
        return $query->where('published', 1);
    }
}
