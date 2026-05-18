<?php

namespace App\Repository\Announcement;

use App\Models\Announcement\Announcement;
use App\Models\Announcement\AnnouncementTicker;

class AnnouncementTickerRepository
{
    public function oldest(): ?AnnouncementTicker
    {
        return AnnouncementTicker::orderBy('created_at', 'asc')
            ->first();
    }

    public function exists(int $announcementId): bool
    {
        return AnnouncementTicker::where('announcement_id', $announcementId)->exists();
    }

    public function count(): int
    {
        return AnnouncementTicker::count();
    }
}
