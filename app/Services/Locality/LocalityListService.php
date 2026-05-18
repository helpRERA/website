<?php

namespace App\Services\Locality;

use App\Models\KRERA\District;
use App\Models\KRERA\Taluk;
use App\Models\KRERA\Village;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;

class LocalityListService
{

    public function __construct(
        private District $districtModel,
        private Taluk    $taluk
    )
    {
    }

    /**
     *
     * @return Collection<int, District>
     */
    public function getDistricts(): Collection
    {
        return $this->districtModel->where('LangId', 1)
            ->whereHas('state', function (Builder $builder) {
                $builder->where('statename', 'KERALA');
            })
            ->whereNotNUll('Districtcode')
            ->select('Districtname', 'Districtcode')
            ->get();
    }

    /**
     *
     * @param int $district
     * @return Collection<int, Taluk>
     */
    public function getTaluks(int $district): Collection
    {
        return $this->taluk->inDistrict($district)
            ->select('SubDistrictname', 'Subdistrictcode')
            ->orderBy('SubDistrictname', 'asc')
            ->get();
    }

    /**
     *
     * @param int $taluk
     *
     * @return Collection<int, Taluk>
     */
    public function getVillages(int $taluk): Collection
    {
        return Village::where('Subdistrictcode', $taluk)
            ->where('LangId', 1)
            ->orderBy('Villagename', 'asc')
            ->get();
    }
}
