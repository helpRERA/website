<?php

namespace App\Models\Gallery;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * App\Models\Gallery\GalleryVideo
 *
 * @property int $id
 * @property string $caption
 * @property string|null $caption_malayalam
 * @property string $url
 * @property string|null $description
 * @property string|null $description_malayalam
 * @property string $date
 * @property int|null $published
 * @property int|null $created_by
 * @property int|null $updated_by
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static Builder|GalleryVideo newModelQuery()
 * @method static Builder|GalleryVideo newQuery()
 * @method static Builder|GalleryVideo onlyTrashed()
 * @method static Builder|GalleryVideo published()
 * @method static Builder|GalleryVideo query()
 * @method static Builder|GalleryVideo whereCaption($value)
 * @method static Builder|GalleryVideo whereCaptionMalayalam($value)
 * @method static Builder|GalleryVideo whereCreatedAt($value)
 * @method static Builder|GalleryVideo whereCreatedBy($value)
 * @method static Builder|GalleryVideo whereDate($value)
 * @method static Builder|GalleryVideo whereDeletedAt($value)
 * @method static Builder|GalleryVideo whereDescription($value)
 * @method static Builder|GalleryVideo whereDescriptionMalayalam($value)
 * @method static Builder|GalleryVideo whereId($value)
 * @method static Builder|GalleryVideo wherePublished($value)
 * @method static Builder|GalleryVideo whereUpdatedAt($value)
 * @method static Builder|GalleryVideo whereUpdatedBy($value)
 * @method static Builder|GalleryVideo whereUrl($value)
 * @method static Builder|GalleryVideo withTrashed()
 * @method static Builder|GalleryVideo withoutTrashed()
 * @mixin \Eloquent
 */
class GalleryVideo extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        'caption',
        'caption_malayalam',
        'url',
        'description',
        'description_malayalam',
        'published',
        'date',
        'created_by',
        'updated_by',
        'deleted_at',
    ];

    public function scopePublished(Builder $query): Builder
    {
        return $query->where('published', 1);
    }
}
