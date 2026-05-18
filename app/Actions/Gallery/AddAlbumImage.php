<?php

namespace App\Actions\Gallery;

use App\Repository\Gallery\GalleryImageRepository;
use Illuminate\Http\RedirectResponse;

class AddAlbumImage
{

    public function __construct(private GalleryImageRepository $imageRepo)
    {
    }

    public function add(): RedirectResponse
    {
        $data = $this->validate();

        $gallery = $this->imageRepo->create($data);

        if ($gallery == null) {
            return redirect()
                ->back()
                ->with(['error' => 'Something went wrong.']);
        }

        return redirect()
            ->back()
            ->with(['message' => 'Image Added successfully.']);
    }

    /**
     *
     * @return array{
     *  album_id: int,
     *  image_id: int,
     *  caption: string,
     *  url: string,
     * }
     */
    private function validate(): array
    {
        return request()->validate([
            'album_id' => 'required|integer',
            'image_id' => 'required|integer',
            'caption' => 'required|string|max:255',
            'url' => 'required|string|max:255'
        ]);
    }
}
