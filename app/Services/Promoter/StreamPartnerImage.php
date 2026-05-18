<?php

namespace App\Services\Promoter;

use App\Libs\StreamFileResponse;
use App\Models\KRERA\MemberDetail;

class StreamPartnerImage extends StreamFileResponse
{
    public function download(int|string $partnerId)
    {
        $partner = MemberDetail::where('Id', $partnerId)
            ->whereNotNull('FileName')
            ->whereNotNull('MimeType')
            ->firstOrFail();

        return $this->steam(
            (string)$partner->FileName,
            (string)$partner->ProfileImage,
            (string)$partner->MimeType
        );
    }
}
