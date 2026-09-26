<?php

namespace App\Http\Controllers\UIBuilder;

use App\Http\Controllers\Controller;
use App\Models\UIBuilder\Page;
use App\Services\PageBuilder\ResolveDataService;
use App\Services\PageBuilder\ResolvePageService;
use Inertia\Inertia;
use Inertia\Response;

class ViewBuilderPageController extends Controller
{
    public function index(
        string $routeName,
        ResolvePageService $resolve,
        ResolveDataService $resolveDataService
    ): Response {
        $page = $resolve->getPage($routeName);
        $data = $resolveDataService->getData($page);


        return Inertia::render('UIEditor/OutputPage', [
            'page' => $page,
            'dependencies' => $data,
        ]);
    }

    public function home(
        ResolvePageService $resolve,
        ResolveDataService $resolveDataService
    ): mixed {
        $page = $resolve->getPage('home');
        $data = $resolveDataService->getData($page);


        return Inertia::render('UIEditor/OutputPage', [
            'page' => $page,
            'dependencies' => $data,
        ]);
    }

    public function preview(
        string $pageId,
        ResolveDataService $resolveDataService
    ) {
        $page = Page::findOrFail($pageId);
        $data = $resolveDataService->getData($page);

        return Inertia::render('UIEditor/OutputPage', [
            'page' => $page,
            'dependencies' => $data,
        ]);
    }
}
