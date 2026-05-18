<?php

namespace App\Models\Gallery;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * App\Models\Gallery\Gallery
 *
 * @property int $id
 * @property string $name
 * @property string $description
 * @property string $url
 * @property string|null $name_malayalam
 * @property string|null $description_malayalam
 * @property string|null $cover_photo
 * @property string|null $event_date
 * @property int $published
 * @property int|null $created_by
 * @property int|null $updated_by
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Gallery\GalleryImage> $images
 * @property-read int|null $images_count
 * @method static \Illuminate\Database\Eloquent\Builder|Gallery newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Gallery newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Gallery onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|Gallery query()
 * @method static \Illuminate\Database\Eloquent\Builder|Gallery whereCoverPhoto($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Gallery whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Gallery whereCreatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Gallery whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Gallery whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Gallery whereDescriptionMalayalam($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Gallery whereEventDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Gallery whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Gallery whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Gallery whereNameMalayalam($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Gallery wherePublished($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Gallery whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Gallery whereUpdatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Gallery whereUrl($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Gallery withTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|Gallery withoutTrashed()
 * @mixin \Eloquent
 */
class Gallery extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        'name',
        'description',
        'url',
        'name_malayalam',
        'description_malayalam',
        'cover_photo',
        'event_date',
        'published',
        'created_by',
        'updated_by'
    ];

    /**
     *
     * @return HasMany<GalleryImage>
     */
    public function images(): HasMany
    {
        return $this->hasMany(GalleryImage::class, 'album_id', 'id');
    }
}
