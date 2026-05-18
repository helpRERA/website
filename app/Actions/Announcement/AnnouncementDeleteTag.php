<?php

namespace App\Actions\Announcement;

use App\Repository\Announcement\AnnouncementTagRepository;
use Illuminate\Http\RedirectResponse;

class AnnouncementDeleteTag
{
    public function __construct(private AnnouncementTagRepository $announcementTagRepository)
    {
    }

    public function deleteTag(int $announcementTagId): RedirectResponse
    {
        $deleted = $this->announcementTagRepository->delete($announcementTagId);
        if ($deleted) {
            return redirect()->back()->with(['success' => 'Tag deleted successfully']);
        }
        return redirect()->back()->with(['error' => 'Failed to delete tag']);
    }
}
