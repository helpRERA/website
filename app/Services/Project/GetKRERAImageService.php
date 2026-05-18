<?php

namespace App\Services\Project;

use App\Libs\StreamFileResponse;
use App\Models\KRERA\UploadedImage;
use Symfony\Component\HttpFoundation\StreamedResponse;
use Response;

class GetKRERAImageService extends StreamFileResponse
{
    public function __construct(private int $imageId)
    {
    }

    public function downloadImage(): StreamedResponse
    {
        $image = UploadedImage::where('ID', $this->imageId)
            ->whereNotNull('FileType')
            ->whereNotNull('FileContent')
            ->firstOrFail();

        return $this->steam(
            (string)$image->FileName,
            (string)$image->FileContent,
            (string)$image->FileType
        );
    }
}
