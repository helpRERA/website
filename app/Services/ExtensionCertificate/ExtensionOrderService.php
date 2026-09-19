<?php

namespace App\Services\ExtensionCertificate;

use App\Libs\StreamFileResponse;
use App\Models\KRERA\ExtensionOrder;
use App\Models\KRERA\RegistrationOrder;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\StreamedResponse;

class ExtensionOrderService extends StreamFileResponse
{

    /**
     * @param int $projectId
     *
     * @return array{...}|null
     */
    public function getExtensionOrder(int $projectId): mixed
    {
        $records = DB::connection('k_rera_docs')
            ->select(
                'select DocID, FileName from tbl_ExtMoreInfoDocs With(NoLock)
                Where MoreInfoID  in(select max(id) from Kerala_RERA.dbo.tbl_ExtensionDeskStatus where Action=36 and
                ProjectID=? )',
                [$projectId]
            );

        if (empty($records)) {
            return null;
        }

        return $records[0];
    }

    public function downloadOrder(int $docId): StreamedResponse
    {
        $file = ExtensionOrder::where('DocID', $docId)
            ->whereNotNull('FileType')
            ->whereNotNull('FileContent')
            ->firstOrFail();

        return $this->steam(
            (string)$file->FileName,
            (string)$file->FileContent,
            (string)$file->FileType
        );
    }

    public function getOrders(int|string $projectId): Collection
    {
        $connection = DB::connection('k_rera');

    $docTableMap = [
        'tbl_DeskStatus' => [37, 88],
        'tbl_ExtensionDeskStatus' => [36],
        'tbl_CorrectionDeskStatus' => [39],
    ];

    $results = collect();

    foreach ($docTableMap as $table => $actions) {
        if ($table === 'tbl_DeskStatus') {
            foreach ($actions as $action) {
                $statusIds = $connection->table($table)
                    ->where('ProjectId', $projectId)
                    ->where('Action', $action)
                    ->pluck('Id');

                $count = RegistrationOrder::where('ProjectID', $projectId)
                    ->whereIn('MoreInfoID', $statusIds)
                    ->whereNotNull('FileType')
                    ->whereNotNull('FileContent')
                    ->count();

                if ($count > 0) {
                    $results->push((object) ['DocID' => $action, 'no_of_docs' => $count]);
                }
            }

            continue;
        }

        $data = $connection
            ->table($table)
            ->where('ProjectId', $projectId)
            ->whereIn('Action', $actions)
            ->groupBy('Action')
            ->selectRaw('Action as DocID, count(*) as no_of_docs')
            ->get();

        $results = $results->merge($data);
    }

    return $results->values();
    }
}
