<?php

namespace App\Listeners;

use App\Actions\Announcement\AnnouncementUpdate;
use App\Events\UpdatedAnnouncement;
use App\Services\Announcement\AnnouncementTickerService;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Log;

class HandleAnnouncementChange
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    public function handle(UpdatedAnnouncement $updatedAnnouncement): void
    {
        $service = new AnnouncementTickerService($updatedAnnouncement->announcementId);
        $service->update();
    }
}
