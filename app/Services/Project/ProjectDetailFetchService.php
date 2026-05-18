<?php

namespace App\Services\Project;

use App\Actions\Property\PropertySearch;
use App\Models\KRERA\ApartmentType;
use App\Models\KRERA\Facility;
use App\Models\KRERA\ProjectMaster;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;
use Log;

class ProjectDetailFetchService
{

    /**
     * Get unique Facility Names From facility Details Table
     *
     * @param Facility $facility_model
     * @return Collection<int, Facility>
     */
    public function getAmenities(Facility $facility_model): Collection
    {
        return $facility_model->amenities();
    }

    /**
     * @param ApartmentType $apartment_type
     * @return LengthAwarePaginator<ApartmentType>
     */
    public function fetchApartments(ApartmentType $apartment_type): LengthAwarePaginator
    {
        return $apartment_type->fetchApartments()->paginate(20);
    }

}
