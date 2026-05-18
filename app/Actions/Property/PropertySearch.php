<?php

namespace App\Actions\Property;

use App\Models\KRERA\ProjectMaster;
use App\Models\ReferenceData\ReferenceData;
use App\Services\ProjectDocument\ConsideredDocuments;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\DB;

class PropertySearch
{
    /**
     * @var Builder<ProjectMaster>
     */
    private Builder $query;

    public function __construct(private ProjectMaster $projectMaster)
    {
        $this->query = $this->projectMaster->projectSearch();
    }

    /**
     * @param array{
     *      search: string|null,
     *      district: string|null,
     *      taluk: string|null,
     *      village: string|null,
     *      project_type: string|null,
     *      building_type: string|null,
     *      amenities: string|null,
     *      minimum_units: string|null,
     *      maximum_units: string|null,
     *      minimum_available_units: string|null,
     *      maximum_available_units: string|null,
     *      status: string|null,
     *      sort_order: string|null,
     *      sort_by: string|null
     * } $searchData
     * @return LengthAwarePaginator<ProjectMaster>
     */
    public function search(
        array $searchData,
    ): LengthAwarePaginator {
        $this->checkSearchValue($searchData['search'] ?? null);
        $this->searchDistrict($searchData['district'] ?? null);
        $this->searchTaluk($searchData['taluk'] ?? null);
        $this->searchVillage($searchData['village'] ?? null);
        $this->searchProjectType($searchData['project_type'] ?? null);
        $this->searchBuildingType($searchData['building_type'] ?? null);
        $this->searchAmenities($searchData['amenities'] ?? null);
        $this->searchByApartmentCount(
            $searchData['minimum_units'] ?? '0',
            $searchData['maximum_units'] ?? null,
            $searchData['minimum_available_units'] ?? '0',
            $searchData['maximum_available_units'] ?? null
        );
        $this->searchByStatus($searchData['status'] ?? null);
        $this->sort($searchData['sort_order'] ?? 'DESC', $searchData['sort_by'] ?? 'certificatePID');

        return $this->query->paginate(20)->withQueryString();
    }

    private function checkSearchValue(?string $search): void
    {
        if ($search != null) {
            $this->query->where(function (Builder $query) use ($search) {
                $value = '%'.$search.'%';
                $fullName = DB::raw("IndivisualName + ' ' + IndivisualMName + ' ' + IndivisualLName");
                $query->whereHas(
                    'certificateInfo',
                    fn ($builder) => $builder->where('CertificateNo', 'LIKE', '%'.$search.'%')
                )->orwhere('Locality', 'LIKE', $value)
                    ->orWhere('Name', 'LIKE', $value)
                    ->orWhereHas('district', function (Builder $query) use ($value) {
                        $query->where('Districtname', 'LIKE', $value);
                    })
                    ->orWhereHas('taluk', function (Builder $query) use ($value) {
                        $query->where('SubDistrictname', 'LIKE', $value);
                    })
                    ->orWhereHas('village', function (Builder $query) use ($value) {
                        $query->where('Villagename', 'LIKE', $value);
                    })
                    ->orWhereHas('promoter', function (Builder $query) use ($value, $fullName) {
                        $query->where($fullName, 'LIKE', $value)
                            ->orWhere('CompanyName', 'LIKE', $value);
                    });
            });
        }
    }

    private function searchDistrict(?string $district): void
    {
        if ($district != null) {
            $this->query->where('District', $district);
        }
    }

    private function searchTaluk(?string $taluk): void
    {
        if ($taluk != null) {
            $this->query->where('Taluka', $taluk);
        }
    }

    private function searchProjectType(?string $buildingType): void
    {
        if ($buildingType != null) {
            $this->query->where('PType', $buildingType);
        }
    }

    private function searchBuildingType(?string $buildingType): void
    {
        if ($buildingType != null) {
            $this->query = $this->query->whereHas(
                'apartments',
                fn (Builder $query) => $query->where('ApartmentType', $buildingType)
            );
        }
    }

    private function searchAmenities(?string $amenities): void
    {
        if ($amenities != null) {
            $amenitiesList = explode(',', $amenities);
            $refCodeModel = new ReferenceData();
            $facilityDetails = $refCodeModel->getValueTwosIn('Project', 'Amenity', $amenitiesList)
                ->pluck('value_two');
            $this->query = $this->query->whereHas('facilities', function (Builder $query) use ($facilityDetails) {
                $query->whereIn('FDetailName', $facilityDetails)
                    ->where('Available', 'YES');
            });
        }
    }

    private function searchByApartmentCount(
        string $minApartmentCount,
        ?string $maxApartmentCount,
        string $minAvailableCount,
        ?string $maxAvailableCount
    ): void {
        if ($minApartmentCount != null && $minApartmentCount != 0) {
            $this->query->where('apartment_types.apartment_count', '>=', $minApartmentCount);
        }
        if ($minAvailableCount != null && $minAvailableCount != 0) {
            $this->query->where('apartment_types.available_count', '>=', $minAvailableCount);
        }
        if ($maxApartmentCount != null && $maxApartmentCount != 300) {
            $this->query->where('apartment_types.apartment_count', '<=', $maxApartmentCount);
        }
        if ($maxAvailableCount != null && $maxAvailableCount != 300) {
            $this->query->where('apartment_types.available_count', '<=', $maxAvailableCount);
        }
    }

    private function searchByStatus(?string $status): void
    {
        if ($status === 'completed') {
            $this->query->whereHas('documents', function (Builder $query) {
                $query->where('DocID', ConsideredDocuments::FORM_SIX)
                    ->whereNotNull('FileName')
                    ->select('ID', 'ProjectID', 'DocID');
            });
        }
        if ($status === 'expired') {
            $this->query->whereDoesntHave('documents', function (Builder $query) {
                $query->where('DocID', ConsideredDocuments::FORM_SIX)
                    ->whereNotNull('FileName')
                    ->select('ID', 'ProjectID', 'DocID');
            })
                ->where('ProposedDateOfCompletion', '<', Carbon::now()->toDateString());
        }
        if ($status === 'in_progress') {
            $this->query->whereDoesntHave('documents', function (Builder $query) {
                $query->where('DocID', ConsideredDocuments::FORM_SIX)
                    ->whereNotNull('FileName')
                    ->select('ID', 'ProjectID', 'DocID');
            });
        }
        if ($status === 'extended') {
            $this->query->whereHas('extensionCertificate');
        }
    }

    private function sort(string $sortOrder, string $sortBy): void
    {
        $this->query->orderBy($sortBy, $sortOrder);
    }

    private function searchVillage(?string $village): void
    {
        if ($village != null) {
            $this->query->where('Village', $village);
        }
    }
}
