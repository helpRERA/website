<?php

namespace App\Services;

class FeeCalculatorService
{
    private const RATE_PER_SQM_LAND = 10;
    private const RATE_PER_SQM_RESIDENTIAL_ONGOING = 25;
    private const RATE_PER_SQM_RESIDENTIAL_NEW = 50;
    private const RATE_PER_SQM_COMMERCIAL = 100;

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
     */
    public function calculate(
        float $landArea,
        ?string $projectStatus,
        float $residentialArea = 0,
        float $commercialArea = 0
    ): array {
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
}