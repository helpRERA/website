<?php

namespace App\Repository\Gallery;

use App\Models\Gallery\GalleryImage;

class GalleryImageRepository
{
    /**
     * @param array{...} $data
     * @return GalleryImage|null
     */
    public function create(array $data): GalleryImage|null
    {
        return GalleryImage::create($data);
    }

    public function delete(int $imageId): int
    {
        return GalleryImage::destroy($imageId);
    }
}
