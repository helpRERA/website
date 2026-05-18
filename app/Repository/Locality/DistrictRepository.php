<?php

namespace App\Repository\Locality;

use App\Models\KRERA\District;
use Illuminate\Database\Eloquent\Builder;

class DistrictRepository
{

    /**
     *
     * @return Builder<District>
     */
    public function malayalamDistrict(): Builder
    {
        return District::where('Langid', 1);
    }
}
