<?php

namespace App\Http\Controllers;

use App\Actions\Property\PropertySearch;
use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Contracts\Encryption\DecryptException;

class BrowseProjectsController extends Controller
{
    // BrowseProjectsController.php
    public function byDistrict(string $district, PropertySearch $propertySearch): JsonResponse
    {
        try {
            $padded = strtr($district, '-_', '+/');
            $padded .= str_repeat('=', (4 - strlen($padded) % 4) % 4);
            $districtCode = Crypt::decryptString($padded);
        } catch (DecryptException $e) {
            abort(404);
        }

        $result = $propertySearch->search([
            'district' => $districtCode,
            'sort_by' => 'certificatePID',
            'sort_order' => 'desc',
            'per_page' => 10,
        ]);

        $projects = collect($result->items ?? $result->getCollection())->take(10);

        $mapped = $projects->map(fn($p) => [
            'ID' => $p->ID,
            'Name' => $p->Name,
            'DistrictName' => $p->district->Districtname ?? '',
            'Area' => $p->Area,
            'ImageId' => $p->images[0]->ID ?? null,
            'CertificateNo' => $p->certificateInfo->CertificateNo ?? null,
            'certificatePID' => $p->certificatePID,
            'NumberOfResidentialUnits' => $p->NumberOfResidentialUnits,
            'NumberOfCommercialUnits' => $p->NumberOfCommercialUnits,
            'apartment_count' => (int) $p->apartment_count,
            'booked_count' => (int) $p->booked_count,
        ]);

        return response()->json($mapped);
    }
}