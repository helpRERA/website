<?php

namespace App\Http\Controllers\ReferenceData;

use App\Repository\ReferenceData\RefDataRepository;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ReferenceDataApiController
{

    public function getUniqueValues(Request $request, RefDataRepository $refCodeRepository): JsonResponse
    {
        return response()->json(
            $refCodeRepository->getValueOnes(
                $request->domain,
                $request->parameter
            )
        );
    }

    public function getUniqueCascadedValues(Request $request, RefDataRepository $refCodeRepository): JsonResponse
    {
        return response()->json(
            $refCodeRepository->getCascaded(
                $request->domain,
                $request->parameter,
                $request->value ?? ''
            )
        );
    }
}
