<?php

namespace App\Services\RegistrationOrder;

use App\Libs\StreamFileResponse;
use App\Models\KRERA\RegistrationOrder;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\StreamedResponse;

class RegistrationOrderService extends StreamFileResponse
{
    /**
     * @param  int  $projectId
     *
     * @return array{...}|null
     */
    public function getRegistrationOrder(int $projectId): mixed
    {
        $records = DB::connection('k_rera_docs')
            ->select(
                'select DocID, FileName from [Kerala_RERA_Docs].dbo.tbl_MoreInfoDocs With(NoLock)
                Where MoreInfoID  in(select max(id) from Kerala_RERA.dbo.tbl_DeskStatus where Action=37 and
                ProjectID=?)',
                [$projectId]
            );

        if (empty($records)) {
            return null;
        }

        return $records[0];
    }

    public function downloadOrder(int $docId): StreamedResponse
    {
        $file = RegistrationOrder::where('DocID', $docId)
            ->whereNotNull('FileType')
            ->whereNotNull('FileContent')
            ->firstOrFail();

        return $this->steam(
            (string) $file->FileName,
            (string) $file->FileContent,
            (string) $file->FileType
        );
    }
}
