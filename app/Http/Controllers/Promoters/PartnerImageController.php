<?php

namespace App\Http\Controllers\Promoters;

use App\Http\Controllers\Controller;
use App\Services\Promoter\StreamPartnerImage;
use Symfony\Component\HttpFoundation\StreamedResponse;

class PartnerImageController extends Controller
{
    public function __invoke(string $partnerId, StreamPartnerImage $streamPartnerImage): ?StreamedResponse
    {
        return $streamPartnerImage->download($partnerId);
    }
}
