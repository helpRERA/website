<?php

namespace App\Services\Project;

use App\Models\KRERA\ApartmentType;
use Illuminate\Database\Eloquent\Builder;

trait ApartmentAvailabilityQuery
{
    public function getAvailabilityQuery(): Builder
    {
        return ApartmentType::groupBy('ProjectID')
            ->selectRaw(
                'SUM(cast(ApartmentNumber AS int)) as apartment_count, SUM(cast(BookedApartment AS int)) as booked_count, ProjectID, '
                .'SUM(cast(ApartmentNumber AS int)) - SUM(cast(BookedApartment AS int)) as available_count'
            );
    }
}
