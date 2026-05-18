<?php

namespace App\Models\Gallery;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * App\Models\Gallery\GalleryImage
 *
 * @property int $id
 * @property int $album_id
 * @property int $image_id
 * @property string|null $caption
 * @property string|null $url
 * @property string|null $created_by
 * @property string|null $updated_by
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|GalleryImage newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|GalleryImage newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|GalleryImage onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|GalleryImage query()
 * @method static \Illuminate\Database\Eloquent\Builder|GalleryImage whereAlbumId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GalleryImage whereCaption($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GalleryImage whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GalleryImage whereCreatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GalleryImage whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GalleryImage whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GalleryImage whereImageId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GalleryImage whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GalleryImage whereUpdatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GalleryImage whereUrl($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GalleryImage withTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|GalleryImage withoutTrashed()
 * @mixin \Eloquent
 */
class GalleryImage extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        'album_id',
        'image_id',
        'caption',
        'url',
        'created_by',
        'updated_by',
    ];
}
