<?php

namespace App\Http\Controllers;

use App\Models\KRERA\DDMaster;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class DDMasterController extends Controller
{
    /**
     * Fetch List From DDMaster based on request field
     *
     * @return void
     */
    public function getList(Request $request, DDMaster $ddMaster): JsonResponse
    {
        $records = [];
        if ($request->type === 'building_type') {
            $records = $ddMaster->buildingType()->get();
        }
        if ($request->type === 'project_type') {
            $records = $ddMaster->projectType()->get();
        }
        return response()->json($records);
    }
}
