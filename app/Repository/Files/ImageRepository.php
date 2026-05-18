<?php

namespace App\Repository\Files;

use App\Models\Image;
use Illuminate\Database\Eloquent\Builder;

class ImageRepository
{
    /**
     * @param string|null $search
     * @return Builder<Image>
     */
    public function search(?string $search): Builder
    {
        return Image::when($search != null, function (Builder $builder) use ($search) {
            $builder->where('name', 'like', '%' . $search . '%');
        });
    }

   
}
