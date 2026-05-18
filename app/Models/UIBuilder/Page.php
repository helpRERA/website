<?php

namespace App\Models\UIBuilder;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * App\Models\UIBuilder\Page
 *
 * @property int $id
 * @property string $title
 * @property string|null $description
 * @property string|null $url
 * @property array|null $blocks
 * @property int $published
 * @property int|null $created_by
 * @property int|null $updated_by
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static Builder|Page newModelQuery()
 * @method static Builder|Page newQuery()
 * @method static Builder|Page onlyTrashed()
 * @method static Builder|Page published()
 * @method static Builder|Page query()
 * @method static Builder|Page whereBlocks($value)
 * @method static Builder|Page whereCreatedAt($value)
 * @method static Builder|Page whereCreatedBy($value)
 * @method static Builder|Page whereDeletedAt($value)
 * @method static Builder|Page whereDescription($value)
 * @method static Builder|Page whereId($value)
 * @method static Builder|Page wherePublished($value)
 * @method static Builder|Page whereTitle($value)
 * @method static Builder|Page whereUpdatedAt($value)
 * @method static Builder|Page whereUpdatedBy($value)
 * @method static Builder|Page whereUrl($value)
 * @method static Builder|Page withTrashed()
 * @method static Builder|Page withoutTrashed()
 * @mixin \Eloquent
 */
class Page extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        'title',
        'description',
        'url',
        'published',
        'blocks',
        'created_by',
        'updated_by',
    ];

    protected $casts = [
        'blocks' => 'array',
    ];

    public function scopePublished(Builder $query): Builder
    {
        return $query->where('published', 1);
    }
}
