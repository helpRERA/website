<?php

namespace App\Http\Controllers;

use App\Services\Locality\LocalityListService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class LocalityController extends Controller
{
    public function talukList(LocalityListService $listService, Request $request): JsonResponse
    {
        return response()->json($listService->getTaluks((int)$request->district)->toArray());
    }

    public function villageList(LocalityListService $listService, Request $request): JsonResponse
    {
        return response()->json($listService->getVillages((int)$request->taluk)->toArray());
    }

    public function districtCoordinates(): JsonResponse
    {
        return response()->json(
            DB::table('ref_district_coordinates')->get()
        );
    }
}
