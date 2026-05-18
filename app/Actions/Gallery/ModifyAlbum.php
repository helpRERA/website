<?php

namespace App\Actions\Gallery;

use App\Models\Gallery\Gallery;
use Illuminate\Http\RedirectResponse;

class ModifyAlbum
{
    /**
     *
     * @param array{
     *  name: string,
     *  description: string,
     *  name_malayalam: string|null,
     *  description_malayalam: string|null,
     *  url: string,
     *  cover_photo: string,
     *  published: bool,
     *  event_date: string
     * } $data
     * @param integer|null $id
     * @return RedirectResponse
     */
    public function modify(array $data, ?int $id): RedirectResponse
    {
        $album = null;

        if ($id != null) {
            $album = Gallery::findOrFail($id);
        }

        if ($album === null) {
            $album = new Gallery();
            $album->created_by = auth()->user()?->id;
        }

        $album->name = $data['name'];
        $album->name_malayalam = $data['name_malayalam'];
        $album->description = $data['description'];
        $album->description_malayalam = $data['description_malayalam'];
        $album->url = $data['url'];
        $album->cover_photo = $data['cover_image'];
        $album->published = $data['published'];
        $album->event_date = $data['event_date'];
        $album->updated_by = auth()->user()?->id;

        if ($album->save()) {
            return redirect()
                ->route('manage-gallery.show', $album->id);
        }

        return redirect()
            ->back()
            ->with(['error' => 'Failed To Create New AlbumView']);
    }
}
