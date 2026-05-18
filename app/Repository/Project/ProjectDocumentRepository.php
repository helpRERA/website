<?php

namespace App\Repository\Project;

use App\Models\KRERA\ProjectDocument;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Query\JoinClause;
use Illuminate\Support\Facades\DB;

class ProjectDocumentRepository
{
    //all documents in these document ids are shown in the project document page
    const TYPE_I_DOC_IDS = [
        21,
        22,
        122,
        3585,
        124,
    ];

    //only latest documents in these document ids are shown in the project document page
    const TYPE_II_DOC_IDS = [
        36,
        25,
        3150,
        121,
        16,
        23,
        41,
        42,
        45,
        53,
    ];

    /**
     * Undocumented function
     *
     * @return Builder<ProjectDocument>
     */
    public function getLatestDocuments(int $projectId, array $docTypeIds): Builder
    {
        return ProjectDocument::groupBy('DocId', 'ProjectID')
            ->selectRaw('DocId, ProjectID, MAX(CreatedOn) as CreatedOn')
            ->whereIn('DocID', $docTypeIds);
    }

    /**
     * @param  int|string  $docTypeId
     * @return Builder<ProjectDocument>
     */
    public function getLatestCreatedOn(int|string $projectId): Builder
    {
        return ProjectDocument::groupByRaw('DocId, ProjectID')
            ->selectRaw('DocId, ProjectID, MAX(CONVERT(DATE, CreatedOn)) as CreatedOn')
            ->where('ProjectID', $projectId);
    }

    /**
     * @return Collection<int, ProjectDocument>
     */
    public function getDocumentGroup(int $projectId, array $docTypeIds): Collection
    {
        $latestDocs = $this->getLatestDocuments($projectId, $docTypeIds);

        return ProjectDocument::where('tbl_UserDocument.ProjectID', $projectId)
            ->whereIn('tbl_UserDocument.DocID', $docTypeIds)
            ->joinSub(
                $latestDocs,
                'max_created',
                function (JoinClause $join) {
                    $join->on('max_created.DocId', '=', 'tbl_UserDocument.DocId')
                        ->on('max_created.ProjectID', '=', 'tbl_UserDocument.ProjectID')
                        ->on('max_created.CreatedOn', '=', 'tbl_UserDocument.CreatedOn');
                }
            )
            ->selectRaw(
                'tbl_UserDocument.ID, tbl_UserDocument.DocID, tbl_UserDocument.ProjectID, tbl_UserDocument.DocumentName'
            )
            ->get();
    }

    /**
     * @param  int[]  $docTypeIds
     * @return Collection<int, ProjectDocument>
     */
    public function getDocumentCount(int $projectId): Collection
    {
        return ProjectDocument::where('tbl_UserDocument.ProjectID', $projectId)
            ->whereIn('tbl_UserDocument.DocID', ProjectDocumentRepository::TYPE_I_DOC_IDS)
            ->groupBy('DocId')
            ->hasContent()
            ->selectRaw(
                'tbl_UserDocument.DocID, COUNT(*) as no_of_docs'
            )
            ->get();
    }

    /**
     * @return Collection<int, ProjectDocument>
     */
    public function getLatestDateCount(int $projectId): Collection
    {
        $latestDocs = $this->getLatestCreatedOn($projectId);

        return ProjectDocument::where('tbl_UserDocument.ProjectID', $projectId)
            ->whereIn('tbl_UserDocument.DocID', ProjectDocumentRepository::TYPE_II_DOC_IDS)
            ->hasContent()
            ->joinSub(
                $latestDocs,
                'max_created',
                function (JoinClause $join) {
                    $join->on('max_created.DocId', '=', 'tbl_UserDocument.DocId')
                        ->on('max_created.ProjectID', '=', 'tbl_UserDocument.ProjectID')
                        ->on('max_created.CreatedOn', '=', DB::raw('CONVERT(DATE, tbl_UserDocument.CreatedOn)'));
                }
            )
            ->groupBy('tbl_UserDocument.DocID')
            ->selectRaw(
                'tbl_UserDocument.DocID, COUNT(*) as no_of_docs, MAX(CONVERT(DATE, tbl_UserDocument.CreatedOn)) as latest_date'
            )
            ->get();
    }
}
