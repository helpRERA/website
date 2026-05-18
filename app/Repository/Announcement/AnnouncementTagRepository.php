<?php

namespace App\Repository\Announcement;

use App\Models\Announcement\AnnouncementTag;
use Illuminate\Contracts\Database\Eloquent\Builder;

class AnnouncementTagRepository
{

    /**
     *
     * @param array{
     * announcement_id: int,
     * tag: string,
     * created_by: int|null,
     * updated_by: int|null,
     * } $data
     * @return AnnouncementTag|null
     */
    public function create(array $data): ?AnnouncementTag
    {
        try {
            return AnnouncementTag::create($data);
        } catch (\Exception $e) {
            return null;
        }
    }

    public function announcementTags(int $announcementId): Builder
    {
        return AnnouncementTag::where('announcement_id', $announcementId);
    }

    public function delete(int $announcementTagId): bool
    {
        try {
            AnnouncementTag::where('id', $announcementTagId)
                ->delete();
        } catch (\Exception $e) {
            return false;
        }
        return true;
    }
}
