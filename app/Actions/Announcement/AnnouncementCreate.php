<?php

namespace App\Actions\Announcement;

use App\Events\UpdatedAnnouncement;
use App\Models\Announcement\Announcement;
use App\Models\User;
use App\Repository\Announcement\AnnouncementRepository;
use Illuminate\Http\RedirectResponse;

class AnnouncementCreate
{

    public function __construct(private AnnouncementRepository $announcementRepository)
    {
    }

    /**
     * @param array{
     * title: string,
     * title_malayalam: string|null,
     * description: string,
     * description_malayalam: string|null,
     * date: string,
     * type: string,
     * sub_type: string,
     * } $data
     *
     * @return RedirectResponse
     */
    public function create(array $data): RedirectResponse
    {
        /**
         * @var User|null $user
         */
        $user = request()->user();

        $data['created_by'] = $user?->id;
        $data['updated_by'] = $user?->id;

        $record = $this->announcementRepository->create($data);

        if ($record != null) {
            UpdatedAnnouncement::dispatch($record->id);
            return redirect()
                ->route('manage-announcements.show', $record->id)
                ->with([
                    'message' => 'Added New Announcement: ' . $record->title
                ]);
        }

        return redirect()
            ->back()
            ->with(['error' => 'Failed To Add Announcement: ' . $data['title']]);
    }
}
