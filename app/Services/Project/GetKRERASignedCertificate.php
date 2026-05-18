<?php

namespace App\Services\Project;

use App\Libs\StreamFileResponse;
use App\Models\KRERA\HSMSignCert;
use Symfony\Component\HttpFoundation\StreamedResponse;

class GetKRERASignedCertificate extends StreamFileResponse
{
    public function __construct(private int $hsmId)
    {
    }

    public function download(): StreamedResponse
    {
        $image = HSMSignCert::where('DgnID', $this->hsmId)
            ->whereNotNull('ContentType')
            ->whereNotNull('DigitalCert')
            ->firstOrFail();

        return $this->steam(
            (string)$image->FileName,
            (string)$image->DigitalCert,
            (string)$image->ContentType
        );
    }
}
