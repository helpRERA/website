<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;


class AgreementForSaleController extends Controller
{
    public function index()
    {
       
        return Inertia::render('DocumentTemplate/AgreementForSale', [
            'title' => 'Agreement for Sale - Document Generator',
        ]);
    }
}