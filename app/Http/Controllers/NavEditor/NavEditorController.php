<?php

namespace App\Http\Controllers\NavEditor;

use App\Actions\NavMenu\NavMenuItemCreate;
use App\Http\Controllers\Controller;
use App\Http\Requests\UiEditor\NavMenuStoreRequest;
use App\Repository\NavMenu\NavMenuRepository;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class NavEditorController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index(): Response
    {
        return Inertia::render('UIEditor/NavEditorPage');
    }

    public function store(NavMenuStoreRequest $request, NavMenuItemCreate $navMenuItemCreate): RedirectResponse
    {
        $validated = $request->validated();
        return $navMenuItemCreate->create($validated);
    }

    public function show(string $section, NavMenuRepository $navMenuRepository): JsonResponse
    {
        $navMenu = $navMenuRepository->fetchSection($section)->first();

        return response()
            ->json([
                'section' => $navMenu,
            ]);
    }
}
