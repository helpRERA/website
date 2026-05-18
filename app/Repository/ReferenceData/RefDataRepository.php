<?php

namespace App\Repository\ReferenceData;

use App\Models\ReferenceData\ReferenceData;
use Illuminate\Database\Eloquent\Collection;

class RefDataRepository
{
    public function __construct(private ReferenceData $referenceData)
    {
    }

    /**
     * Get Distinct Value_Ones From Domain, Parameter
     *
     * @param string $domainName
     * @param string $parameterName
     *
     * @return Collection<int, ReferenceData>
     */
    public function getValueOnes(string $domainName, string $parameterName): Collection
    {
        return $this->referenceData->joinedData()
            ->where('parameter.parameter', $parameterName)
            ->where('domain.domain', $domainName)
            ->groupBy('value_one')
            ->select('value_one')
            ->get();
    }

    /**
     * Get Distinct Value_Ones From Domain, Parameter based on secondValue
     *
     * @param string $domainName
     * @param string $parameterName
     *
     * @return Collection<ReferenceData>
     */
    public function getCascaded(string $domainName, string $parameterName, string $valueTwo): Collection
    {
        return $this->referenceData->joinedData()
            ->where('parameter.parameter', $parameterName)
            ->where('domain.domain', $domainName)
            ->where(function ($query) use ($valueTwo) {
                $query->where('value_two', $valueTwo)
                    ->orWhereNull('value_two');
            })
            ->groupBy('value_one')
            ->select('value_one')
            ->get();
    }
}
