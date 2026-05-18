<?php

namespace App\Services\Project;

use App\Libs\StreamFileResponse;
use App\Models\KRERA\ProjectDocument;
use Response;
use Symfony\Component\HttpFoundation\StreamedResponse;

class GetKRERADocumentService extends StreamFileResponse
{
    public function __construct(private int $documentId)
    {
    }

    public function download(): StreamedResponse
    {
        $document = ProjectDocument::where('ID', $this->documentId)
            ->whereNotNull('FileType')
            ->whereNotNull('FileContent')
            ->firstOrFail();

        return $this->steam(
            (string)$document->FileName,
            (string)$document->FileContent,
            (string)$document->FileType
        );
    }
}
