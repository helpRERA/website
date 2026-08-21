<?php

namespace App\Services;

use InvalidArgumentException;

class FeeCalculatorService
{
    private const RATE_PER_SQM_LAND = 10;
    private const RATE_PER_SQM_RESIDENTIAL_ONGOING = 25;
    private const RATE_PER_SQM_RESIDENTIAL_NEW = 50;
    private const RATE_PER_SQM_COMMERCIAL = 100;

    private const VALID_PROJECT_STATUSES = ['Ongoing', 'New'];

    /**
     * Total Fee = (Land Area x 10)
     *           + (Residential Area x 25 [Ongoing] or x 50 [New]) — only if residential area > 0
     *           + (Commercial/Other Area x 100)
     *
     * @param  float  $landArea               Total Land Area (Sq. m.) — mandatory, must be > 0
     * @param  string|null  $projectStatus     'Ongoing' | 'New' | null — required only when $residentialArea > 0
     * @param  float  $residentialArea        Built-up residential area (Sq. m.), default 0
     * @param  float  $commercialArea         Built-up commercial/other area (Sq. m.), default 0
     * @return array{land_fee: float, residential_fee: float, commercial_fee: float, total_fee: float}
     *
     * @throws InvalidArgumentException
     */
    public function calculate(
        float $landArea,
        ?string $projectStatus,
        float $residentialArea = 0,
        float $commercialArea = 0
    ): array {
        $this->validateInputs($landArea, $projectStatus, $residentialArea, $commercialArea);

        $landFee = $landArea * self::RATE_PER_SQM_LAND;

        $residentialRate = 0;
        if ($residentialArea > 0) {
            $residentialRate = $projectStatus === 'New'
                ? self::RATE_PER_SQM_RESIDENTIAL_NEW
                : self::RATE_PER_SQM_RESIDENTIAL_ONGOING;
        }
        $residentialFee = $residentialArea * $residentialRate;

        $commercialFee = $commercialArea * self::RATE_PER_SQM_COMMERCIAL;

        return [
            'land_fee' => $landFee,
            'residential_fee' => $residentialFee,
            'commercial_fee' => $commercialFee,
            'total_fee' => $landFee + $residentialFee + $commercialFee,
        ];
    }

    /**
     * @throws InvalidArgumentException
     */
    private function validateInputs(
        float $landArea,
        ?string $projectStatus,
        float $residentialArea,
        float $commercialArea
    ): void {
        if (! is_finite($landArea) || $landArea <= 0) {
            throw new InvalidArgumentException('Land area must be a positive, finite number.');
        }

        if (! is_finite($residentialArea) || $residentialArea < 0) {
            throw new InvalidArgumentException('Residential area must be a non-negative, finite number.');
        }

        if (! is_finite($commercialArea) || $commercialArea < 0) {
            throw new InvalidArgumentException('Commercial area must be a non-negative, finite number.');
        }

        if ($residentialArea > 0) {
            if ($projectStatus === null || $projectStatus === '') {
                throw new InvalidArgumentException(
                    'Project status is required when residential area is greater than 0.'
                );
            }

            if (! in_array($projectStatus, self::VALID_PROJECT_STATUSES, true)) {
                throw new InvalidArgumentException(sprintf(
                    'Invalid project status "%s". Expected one of: %s.',
                    $projectStatus,
                    implode(', ', self::VALID_PROJECT_STATUSES)
                ));
            }
        }
    }
}