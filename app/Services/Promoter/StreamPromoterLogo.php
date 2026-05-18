<?php

namespace App\Services\Promoter;

use App\Libs\StreamFileResponse;
use App\Models\KRERA\UserLogo;
use Symfony\Component\HttpFoundation\StreamedResponse;

class StreamPromoterLogo extends StreamFileResponse
{
    public function download(int|string $promoterId): ?StreamedResponse
    {
        $logo = UserLogo::where('UserID', $promoterId)
            ->whereNotNull('LogoImagefileName')
            ->whereNotNull('LogoImageType')
            ->firstOrFail();

        return $this->steam(
            (string)$logo->LogoImagefileName,
            (string)$logo->LogoUploadContent,
            (string)$logo->LogoImageType
        );
    }
}
