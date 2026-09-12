<?php

namespace App\Http\Controllers\Complaint;

use App\Http\Controllers\Controller;
use App\Services\Causes\CauseListService;
use App\Services\Complaints\AppealFileDownload;
use App\Services\Complaints\ComplaintFileDownload;
use App\Services\Complaints\ComplaintsListService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\StreamedResponse;

class ComplaintController extends Controller
{
    public function index(ComplaintsListService $complaintsList, Request $request): Response
    {
        $request->validate([
            'search' => ['nullable', 'string', 'max:255'],
            'project_id' => ['nullable', 'integer', 'min:1'],
            'ruling_by' => ['nullable', 'string'],
            'sort' => ['nullable', 'string'],
        ]);
        $projectId = $request->filled('project_id') ? (string) $request->input('project_id') : null;
        $rulingBy = $request->input('ruling_by') ?? ($projectId !== null ? 'all' : ComplaintsListService::RULING_BY_KRERA);
        $sort = strtolower($request->input('sort') ?? 'newest');
        //\DB::connection('k_rera')->enableQueryLog();
        $complaints = $complaintsList->getData(
            $request->search ?? null,
            $rulingBy,
            $sort,
            $projectId
        );
        //dd(\DB::connection('k_rera')->getQueryLog());


        $reliefSought = DB::connection('k_rera')
            ->table('tbl_ReliefSought')
            ->get();

        return Inertia::render('ComplaintList/ComplaintListPage', [
            'reliefSought' => $reliefSought,
            'complaints' => $complaints,
            'oldSearch' => $request->search ?? '',
            'oldSort' => $sort,
            'oldRulingBy' => $rulingBy,
            'oldProjectId' => $projectId ?? '',
        ]);
    }

    public function causes(CauseListService $causeList, Request $request): Response
    {
        $date = $request->filled('date') ? $request->date : now()->toDateString();
        $authority = $request->string('authority', '1');

        return Inertia::render('Causes/CauseListPage', [
            'causes' => $causeList->getData($date, $authority),
            'oldDate' => $date,
            'oldAuthority' => $authority,
        ]);
    }

    public function fileDownload(
        string $complaintId,
        string $complaintYear,
        string $complainantName,
        ComplaintFileDownload $fileDownload
    ): StreamedResponse {
        return $fileDownload->fileDownload($complaintId, $complaintYear, $complainantName);
    }

    public function appealDownload(string $id, AppealFileDownload $download): StreamedResponse
    {
        return $download->fileDownload($id);
    }
}
