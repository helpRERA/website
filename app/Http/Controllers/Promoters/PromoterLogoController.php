<?php

namespace App\Http\Controllers\Promoters;

use App\Http\Controllers\Controller;
use App\Services\Promoter\StreamPromoterLogo;
use Symfony\Component\HttpFoundation\StreamedResponse;

class PromoterLogoController extends Controller
{
    public function __invoke(string $userId, StreamPromoterLogo $promoterLogo): ?StreamedResponse
    {
        return $promoterLogo->download($userId);
    }
}
