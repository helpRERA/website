<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class InaugurationController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth');
    }

    public function inaugurate(Request $request)
    {
        $prod = Cache::get('prod', 'no');
        return view('inaugurate', [
            'prod' => $prod
        ]);
    }

    public function changeState(Request $request)
    {
        if ($request->filled('inaugurate') && $request->inaugurate === 'on') {
            Cache::put('prod', 'yes');
            return redirect()
                ->route('front-page');
        } else {
            Cache::put('prod', 'no');
            return redirect()
                ->back();
        }
    }

    public function changeDate(Request $request)
    {
        if ($request->filled('date')) {
            Cache::put('prod_date', $request->date);
        }
        return redirect()
            ->route('front-page');
    }
}
