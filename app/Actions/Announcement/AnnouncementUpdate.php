<?php

namespace App\Actions\Announcement;

use App\Events\UpdatedAnnouncement;
use App\Models\Announcement\Announcement;
use App\Models\User;
use App\Repository\Announcement\AnnouncementRepository;
use Illuminate\Http\RedirectResponse;

class AnnouncementUpdate
{

    public function __construct(private AnnouncementRepository $announcementRepo)
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
    public function update(array $data, int $announcementId): RedirectResponse
    {
        /**
         * @var User|null $user
         */
        $user = request()->user();

        $data['updated_by'] = $user?->id;

        try {
            $this->announcementRepo->update($data, $announcementId);
        } catch (\Exception $e) {
            return redirect()
                ->back()
                ->with([
                    'error' => $e->getMessage()
                ]);
        }

        UpdatedAnnouncement::dispatch($announcementId);
        return redirect()
            ->route('manage-announcements.show', $announcementId)
            ->with([
                'message' => 'Updated Announcement'
            ]);
    }
}
