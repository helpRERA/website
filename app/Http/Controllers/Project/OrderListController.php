<?php

namespace App\Http\Controllers\Project;

use App\Http\Controllers\Controller;
use App\Models\KRERA\ExtensionOrder;
use App\Models\KRERA\RegistrationOrder;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrderListController extends Controller
{
    public function __invoke(Request $request): JsonResponse
    {
        $isRegistrationOrder = in_array((int) $request->input('doc_id'), [37, 88], true);

        $orderIds = DB::connection('k_rera')
            ->table($isRegistrationOrder ? 'tbl_DeskStatus' : 'tbl_ExtensionDeskStatus')
            ->where('Action', $request->input('doc_id'))
            ->where('ProjectId', $request->input('project_id'))
            ->pluck('Id');


        $orders = ($isRegistrationOrder ? RegistrationOrder::query() : ExtensionOrder::query())
            ->where('ProjectID', $request->input('project_id'))
            ->whereIn('MoreInfoID', $orderIds)
            ->whereNotNull('FileType')
            ->whereNotNull('FileContent')
            ->selectRaw('DocID as ID, FileName as DocumentName, CONVERT(DATE, CreatedOn) as CreatedOn, ProjectID')
            ->orderBy('CreatedOn', 'desc')
            ->get();

        return response()->json($orders);
    }
}
