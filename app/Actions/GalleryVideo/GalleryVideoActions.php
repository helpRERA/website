<?php

namespace App\Actions\GalleryVideo;

use App\Models\Gallery\GalleryVideo;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\RedirectResponse;
use PDO;

class GalleryVideoActions
{
    /**
     * @param array{
     *  caption: string,
     *  description: string,
     *  caption_malayalam: string|null,
     *  description_malayalam: string|null,
     *  url: string,
     *  date: string,
     *  published: bool,
     * } $data
     */
    public function create(array $data): RedirectResponse
    {

        $data['created_by'] = auth()->user()?->id;
        $data['updated_by'] = auth()->user()?->id;

        $record = GalleryVideo::create($data);

        if ($record == null) {
            return redirect()->back()->with([
                'error' => 'Error creating record'
            ]);
        }

        return redirect()->back()->with([
            'message' => 'Video Added'
        ]);
    }

    /**
     * @param array{
     *  caption: string,
     *  description: string,
     *  caption_malayalam: string|null,
     *  description_malayalam: string|null,
     *  url: string,
     *  date: string,
     *  published: bool,
     * } $data
     * @param int $videoId
     */
    public function update(array $data, int $videoId): RedirectResponse
    {
        $data['updated_by'] = auth()->user()?->id;

        try {
            GalleryVideo::where('id', $videoId)
                ->update($data);
        } catch (Exception $e) {
            return redirect()->back()->with([
                'error' => 'Error creating record'
            ]);
        }
        return redirect()->back()->with([
            'message' => 'Video Added'
        ]);
    }

    public function delete(int $videoId): RedirectResponse
    {
        $updated = GalleryVideo::where('id', $videoId)->update([
            'deleted_at' => Carbon::now(),
            'updated_by' => auth()->user()?->id
        ]);

        if ($updated == null) {
            return redirect()->back()->with([
                'error' => 'Error deleting record'
            ]);
        }

        return redirect()->back()->with([
            'message' => 'Video Deleted'
        ]);
    }
}
