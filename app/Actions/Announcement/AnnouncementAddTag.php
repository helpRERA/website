<?php

namespace App\Actions\Announcement;

use App\Events\TagAttached;
use App\Models\Announcement\Announcement;
use App\Models\Announcement\AnnouncementTag;
use App\Repository\Announcement\AnnouncementRepository;
use App\Repository\Announcement\AnnouncementTagRepository;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;

class AnnouncementAddTag
{


    public function __construct(private AnnouncementTagRepository $announcementTagRepository)
    {
    }

    /**
     * @param array{
     * announcement_id: int,
     * tag: string,
     * } $data
     */
    public function addTag(array $data): RedirectResponse
    {

        $data['created_by'] = auth()->user()?->id;
        $data['updated_by'] = auth()->user()?->id;

        $record = $this->announcementTagRepository->create($data);


        if ($record === null) {
            return redirect()
                ->back()
                ->with(['error' => 'Failed To Add Tag']);
        }

        TagAttached::dispatch($data['tag']);

        return redirect()
            ->back()
            ->with(['message' => 'Tag added successfully']);
    }
}
