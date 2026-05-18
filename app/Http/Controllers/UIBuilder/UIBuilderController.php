<?php

namespace App\Http\Controllers\UIBuilder;

use App\Actions\PageBuilder\ManagePageInfo;
use App\Actions\PageBuilder\PageBlockUpdate;
use App\Actions\PageBuilder\PageDelete;
use App\Http\Controllers\Controller;
use App\Http\Requests\UIEditor\PageStore;
use App\Models\UIBuilder\Page;
use App\Repository\Page\PageRepository;
use App\Services\PageBuilder\FetchDataDependencyService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class UIBuilderController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index(PageRepository $pageRepository, Request $request): Response
    {
        $pages = $pageRepository->search($request->search, false)->paginate(20);

        return Inertia::render('UIEditor/PagesListPage', [
            'pages' => $pages,
        ]);
    }

    public function destroy(string $pageId, PageDelete $pageDelete): RedirectResponse
    {
        $page = Page::where('id', $pageId)
            ->firstOrFail();

        return $pageDelete->delete($page);
    }

    //delete page

    public function store(PageStore $request, ManagePageInfo $pageBuilderCreate): RedirectResponse
    {
        return $pageBuilderCreate->create($request->validated());
    }

    public function create(): Response
    {
        return Inertia::render('UIEditor/CreatePage');
    }

    public function show(
        string                     $pageId,
        PageRepository             $pageRepository,
        FetchDataDependencyService $dataService
    ): Response
    {
        $page = $pageRepository->findOrFail((int)$pageId);

        return Inertia::render('UIEditor/UiBuilderPage', [
            'page' => $page,
            'dependencies' => [
//                'registeredProjects' => $dataService->registeredProjects(),
//                'promotersCount' => $dataService->promotersCount(),
//                'registeredAgents' => $dataService->registeredAgents(),
//                'latestAnnouncements' => $dataService->latestAnnouncements(),
//                'latestAlbums' => $dataService->latestAlbums(),
//                'latestVideos' => $dataService->latestVideos(),
//                'announcementTicker' => $dataService->announcementTicker(),
//                'complaintsCount' => $dataService->complaintsCount(),
            ],
        ]);
    }

    public function update(Request $request, string $pageId, PageBlockUpdate $updateAction): RedirectResponse
    {
        return $updateAction->update((int)$pageId, $request->blocks);
    }

    //Edit Title and Description
    public function edit(string $id): Response
    {
        return Inertia::render('UIEditor/UpdatePageInfo', [
            'page' => Page::findOrFail($id),
        ]);
    }
}
