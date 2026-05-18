<?php

namespace App\Models\Announcement;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Announcement\AnnouncementTicker
 *
 * @property int $id
 * @property int $announcement_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|AnnouncementTicker newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|AnnouncementTicker newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|AnnouncementTicker query()
 * @method static \Illuminate\Database\Eloquent\Builder|AnnouncementTicker whereAnnouncementId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AnnouncementTicker whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AnnouncementTicker whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AnnouncementTicker whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class AnnouncementTicker extends Model
{
    use HasFactory;

    protected $fillable = [
        'announcement_id',
    ];
}
