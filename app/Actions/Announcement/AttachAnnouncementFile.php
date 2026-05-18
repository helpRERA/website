<?php

namespace App\Actions\Announcement;

use App\Models\Announcement\AnnouncementFile;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;

class AttachAnnouncementFile
{
    public function __construct()
    {
    }

    public function add(int $announcementId, int $documentId): RedirectResponse
    {
        $user = request()->user();

        $data = AnnouncementFile::create([
            'announcement_id' => $announcementId,
            'document_id' => $documentId,
            'created_by' => $user?->id,
            'updated_by' => $user?->id
        ]);

        if ($data == null) {
            return redirect()
                ->back()
                ->with(['error' => 'Failed To Attach New File']);
        }

        return redirect()
            ->back()
            ->with(['message' => 'Attached New File']);
    }
}
