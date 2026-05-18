<?php

namespace App\Models\Announcement;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * App\Models\Announcement\AnnouncementTag
 *
 * @property int $id
 * @property int $announcement_id
 * @property string $tag
 * @property int $created_by
 * @property int $updated_by
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|AnnouncementTag newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|AnnouncementTag newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|AnnouncementTag onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|AnnouncementTag query()
 * @method static \Illuminate\Database\Eloquent\Builder|AnnouncementTag whereAnnouncementId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AnnouncementTag whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AnnouncementTag whereCreatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AnnouncementTag whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AnnouncementTag whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AnnouncementTag whereTag($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AnnouncementTag whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AnnouncementTag whereUpdatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AnnouncementTag withTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|AnnouncementTag withoutTrashed()
 * @mixin \Eloquent
 */
class AnnouncementTag extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        'announcement_id',
        'tag',
        'created_by',
        'updated_by',
    ];
}
