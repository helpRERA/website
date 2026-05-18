<?php

namespace App\Services\Complaints;

use App\Libs\StreamFileResponse;
use App\Models\KRERA\RegisteredAppeal;
use Symfony\Component\HttpFoundation\StreamedResponse;

class AppealFileDownload extends StreamFileResponse
{
    public function fileDownload(string $appealId): StreamedResponse
    {
        $appeal = RegisteredAppeal::where('RegisteredAppealId', $appealId)
            ->whereNotNull('DocName')
            ->whereNotNull('DocUpload')
            ->firstOrFail();

        return $this->steam(
            $appeal->DocName,
            $appeal->DocUpload,
            $appeal->DocType
        );

    }
}
