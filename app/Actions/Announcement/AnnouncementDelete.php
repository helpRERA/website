<?php

namespace App\Actions\Announcement;

use App\Models\Announcement\Announcement;
use Carbon\Carbon;
use Illuminate\Http\RedirectResponse;

class AnnouncementDelete
{
    public function delete(Announcement $announcement): RedirectResponse
    {
        try {
            $announcement->deleted_at = Carbon::now()->toDateTimeString();
            $announcement->updated_by = request()->user()?->id;
            $announcement->save();
        } catch (\Exception $e) {
            return redirect()
                ->back()
                ->with(['error' => $e->getMessage()]);
        }
        return redirect()
            ->route('manage-announcements.index')
            ->with(['message' => 'Announcement ' . $announcement->title . ' deleted successfully']);
    }
}
