<?php

namespace App\Actions\Announcement;

use App\Models\Announcement\Announcement;
use App\Models\Announcement\AnnouncementFile;
use Carbon\Carbon;
use Illuminate\Http\RedirectResponse;

class AnnouncementFileDelete
{
    public function remove(AnnouncementFile $file): RedirectResponse
    {
        try {
            $file->deleted_at = Carbon::now()->toDateTimeString();
            $file->updated_by = request()->user()?->id;
            $file->save();
        } catch (\Exception $e) {
            return redirect()
                ->back()
                ->with(['error' => $e->getMessage()]);
        }
        return redirect()
            ->back()
            ->with(['message' => 'File Removed Successfully']);
    }
}
