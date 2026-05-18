<?php

namespace App\Http\Controllers;

use App\Actions\Footer\FooterCreate;
use App\Models\UIBuilder\Footer;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class FooterController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index(): Response
    {
        $footer = Footer::first();
        return Inertia::render('UIEditor/FooterEditorPage', [
            'footer' => $footer
        ]);
    }

    public function store(Request $request, FooterCreate $footerCreate): RedirectResponse
    {
        $data = $request->data;
        return $footerCreate->create($data);
    }
}
