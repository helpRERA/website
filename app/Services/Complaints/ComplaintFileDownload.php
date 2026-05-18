<?php

namespace App\Services\Complaints;

use App\Libs\StreamFileResponse;
use App\Models\KRERA\ComplaintFile;
use Symfony\Component\HttpFoundation\StreamedResponse;

class ComplaintFileDownload extends StreamFileResponse
{
    public function fileDownload(string $complaintId, string $complaintYear, string $complaintName): StreamedResponse
    {
        $complaint = ComplaintFile::complaint($complaintId, $complaintYear, $complaintName)
            ->firstOrFail();

        return $this->steam(
            $complaint->DocName,
            $complaint->DocUpload,
            $complaint->DocType
        );
    }
}
