<?php

namespace App\Http\Controllers\Project;

use App\Http\Controllers\Controller;
use App\Models\KRERA\ProjectDocument;
use App\Repository\Project\ProjectDocumentRepository;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class DocumentListController extends Controller
{

    public function __invoke(Request $request, ProjectDocumentRepository $documentRepository): JsonResponse
    {

        $latestDate = $documentRepository->getLatestCreatedOn((int)$request->project_id)
            ->where('DocID', $request->doc_id)
            ->first();

        $query = ProjectDocument::where('ProjectID', $request->project_id)
            ->where('DocID', $request->doc_id)
            ->orderBy('CreatedOn', 'desc')
            ->selectRaw(
                'tbl_UserDocument.ID, tbl_UserDocument.DocID, tbl_UserDocument.ProjectID, tbl_UserDocument.DocumentName, CONVERT(DATE, CreatedOn) as CreatedOn'
            );

        if ($request->type === 'last_day' || $request->type === 'latest_doc') {
            $query->whereDate('CreatedOn', ($latestDate->CreatedOn ?? ''));
        }

        if ($request->type === 'latest_doc') {
            $query->limit(1);
        }

        $documents = $query->get();

        return response()->json($documents);
    }
}
