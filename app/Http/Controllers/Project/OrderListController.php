<?php

namespace App\Http\Controllers\Project;

use App\Http\Controllers\Controller;
use App\Models\KRERA\ExtensionOrder;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrderListController extends Controller
{
    public function __invoke(Request $request): JsonResponse
    {
        $orderIds = DB::connection('k_rera')
            ->table('tbl_ExtensionDeskStatus')
            ->where('Action', $request->input('doc_id'))
            ->where('ProjectId', $request->input('project_id'))
            ->pluck('Id');


        $orders = ExtensionOrder::whereIn('MoreInfoID', $orderIds)
            ->selectRaw('tbl_ExtMoreInfoDocs.DocID as ID, tbl_ExtMoreInfoDocs.FileName as DocumentName, CONVERT(DATE, CreatedOn) as CreatedOn, ProjectID')
            ->orderBy('CreatedOn', 'desc')
            ->get();

        return response()->json($orders);
    }
}
