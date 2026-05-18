<?php

namespace App\Actions\Gallery;

use App\Models\Gallery\Gallery;
use Illuminate\Http\RedirectResponse;

class DeleteAlbum
{

    public function delete(string $galleryId): RedirectResponse
    {
        $album = Gallery::findOrFail($galleryId);

        if ($album->delete()) {
            return redirect()
                ->route('manage-gallery.index')
                ->with(['message' => 'Deleted Album: ' . $album->name]);
        }

        return redirect()
            ->back()
            ->with(['error' => 'Failed To Delete Album']);
    }
}
