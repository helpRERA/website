<?php

namespace App\Repository\Gallery;

use App\Models\Gallery\Gallery;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;

class GalleryRepository
{

    /**
     * @param array $data
     * @return void
     */
    public function create(array $data): Gallery|null
    {
        return Gallery::create($data);
    }

    public function withImages(string $galleryId, ?bool $published = null): Gallery
    {
        return Gallery::where('id', $galleryId)
            ->when($published === true, function (Builder $query) {
                return $query->where('published', 1);
            })
            ->with('images')
            ->firstOrFail();
    }

    public function whereUrl(string $galleryUrl): Gallery
    {
        return Gallery::where('url', $galleryUrl)
            ->where('published', 1)
            ->with('images')
            ->firstOrFail();
    }

    /**
     * @return Builder<Gallery>
     */
    public function publishedAlbums(): Builder
    {
        return Gallery::where('published', 1)
            ->orderBy('event_date', 'desc');
    }

    /**
     * @return Collection<int, Gallery>
     */
    public function latestAlbums(): Collection
    {
        return $this->publishedAlbums()
            ->limit(10)
            ->get();
    }
}
