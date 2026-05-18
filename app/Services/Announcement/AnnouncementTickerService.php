<?php

namespace App\Services\Announcement;

use App\Listeners\HandleAnnouncementChange;
use App\Models\Announcement\Announcement;
use App\Models\Announcement\AnnouncementTicker;
use App\Repository\Announcement\AnnouncementTickerRepository;

class AnnouncementTickerService
{

    private ?Announcement $announcement;
    private AnnouncementTickerRepository $tickerRepo;
    private int $maxAllowedTickers = 6;

    public function __construct(
        private int $announcementId,
    ) {
        $this->announcement = Announcement::find($this->announcementId);
        $this->tickerRepo = new AnnouncementTickerRepository();
    }

    public function update(): void
    {
        if ($this->announcement == null) {
            return;
        }
        if ($this->announcement->ticker === 1) {
            $this->createTicker($this->announcement);
            return;
        }
        $this->removeTicker($this->announcement);
    }

    private function createTicker(Announcement $announcement): void
    {
        $alreadyInTicker = $this->tickerRepo->exists($announcement->id);
        if ($alreadyInTicker) {
            return;
        }
        AnnouncementTicker::create([
            'announcement_id' => $announcement->id,
        ]);
        $this->removeOldestTicker();
    }

    private function removeTicker(Announcement $announcement): void
    {
        $alreadyInTicker = $this->tickerRepo->exists($announcement->id);
        if (!$alreadyInTicker) {
            return;
        }
        $this->remove($announcement->id);
    }

    private function removeOldestTicker(): void
    {
        $tickerCount = $this->tickerRepo->count();
        if ($tickerCount <= $this->maxAllowedTickers) {
            return;
        }
        $oldestTicker = $this->tickerRepo->oldest();
        if ($oldestTicker == null) {
            return;
        }
        $this->remove($oldestTicker->announcement_id);
    }

    private function remove(int $announcementId): void
    {
        AnnouncementTicker::where('announcement_id', $announcementId)->delete();
        Announcement::where('id', $announcementId)->update([
            'ticker' => 0,
        ]);
    }
}
