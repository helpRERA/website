<?php

namespace App\Http\Controllers\Gallery;

use App\Actions\GalleryVideo\GalleryVideoActions;
use App\Http\Controllers\Controller;
use App\Http\Requests\Gallery\GalleryVideoStoreRequest;
use App\Models\Gallery\GalleryVideo;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\RedirectResponse;

class ManageVideoController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index(): Response
    {
        return Inertia::render('ManageVideo/ManageVideoPage', [
            'videos' => GalleryVideo::paginate(20)
        ]);
    }

    public function store(GalleryVideoStoreRequest $request, GalleryVideoActions $actions): RedirectResponse
    {
        return $actions->create($request->validated());
    }

    public function update(
        GalleryVideoStoreRequest $request,
        GalleryVideoActions $actions,
        string $videoId
    ): RedirectResponse {
        return $actions->update($request->validated(), (int)$videoId);
    }

    public function destroy(string $videoId, GalleryVideoActions $actions): RedirectResponse
    {
        return $actions->delete((int)$videoId);
    }
}
