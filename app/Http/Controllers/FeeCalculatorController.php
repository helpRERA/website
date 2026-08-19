<?php

namespace App\Http\Controllers;

use App\Http\Requests\FeeCalculatorRequest;
use App\Services\FeeCalculatorService;
use Inertia\Inertia;
use Inertia\Response;

class FeeCalculatorController extends Controller
{
    public function __construct(private FeeCalculatorService $feeCalculator)
    {
    }

    public function show(): Response
    {
        return Inertia::render('FeeCalculator', [
            'result' => null,
        ]);
    }


}