<?php

namespace App\Actions\ReferenceData;

use App\Models\ReferenceData\ReferenceData;
use Illuminate\Database\Eloquent\Builder;

class FilterReferenceData
{
    public function __construct(private ReferenceData $reference_data)
    {
    }

    /**
     * @param int|null $domain_id
     * @param int|null $parameter_id
     *
     * @return Builder<ReferenceData>
     */
    public function filter(?int $domain_id, ?int $parameter_id): Builder
    {
        $query = $this->reference_data->fullData();

        if ($domain_id != null) {
            $query->where('reference_data.domain_id', $domain_id);
        }

        if ($parameter_id != null) {
            $query->where('reference_data.parameter_id', $parameter_id);
        }

        return $query;

    }
}
