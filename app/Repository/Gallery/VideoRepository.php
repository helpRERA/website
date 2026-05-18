<?php

namespace App\Repository\Gallery;

use App\Models\Gallery\GalleryVideo;
use Illuminate\Database\Eloquent\Collection;

class VideoRepository
{
    /**
     *
     * @return Collection<int, GalleryVideo>
     */
    public function latestVideos(): Collection
    {
        return GalleryVideo::published()
            ->orderBy('date', 'desc')
            ->limit(10)
            ->get();
    }
}
