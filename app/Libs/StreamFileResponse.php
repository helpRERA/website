<?php

namespace App\Libs;

use Response;
use Symfony\Component\HttpFoundation\StreamedResponse;

class StreamFileResponse
{
    public function __construct()
    {
    }

    public function steam(string $fileName, string $fileContent, string $fileType): StreamedResponse
    {
        return Response::stream(
            function () use ($fileContent) {
                echo $fileContent;
            },
            200,
            [
                "Content-Type" => $fileType,
                "Content-Disposition" => "inline; filename=$fileName"
            ]
        );
    }
}
