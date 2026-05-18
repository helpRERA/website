<?php

namespace App\Http\Controllers\Gallery;

use App\Actions\Announcement\AnnouncementDeleteTag;
use App\Actions\Gallery\DeleteAlbum;
use App\Actions\Gallery\ModifyAlbum;
use App\Http\Controllers\Controller;
use App\Http\Requests\Gallery\StoreGalleryRequest as GalleryStoreGalleryRequest;
use App\Models\Gallery\Gallery;
use App\Repository\Gallery\GalleryRepository;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use StoreGalleryRequest;

class ManageGalleryController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index(): Response
    {
        $albums = Gallery::paginate(20);
        return Inertia::render('ManageGallery/ManageGalleryPage', [
            'albums' => $albums
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('ManageGallery/AddGalleryAlbum');
    }

    public function store(GalleryStoreGalleryRequest $request, ModifyAlbum $modifyAlbum): RedirectResponse
    {
        $data = $request->all();
        return $modifyAlbum->modify($data, isset($data['id']) ? (int)$data['id'] : null);
    }

    public function show(string $galleryId, GalleryRepository $galleryRepository): Response
    {
        $album = $galleryRepository->withImages($galleryId);
        return Inertia::render('ManageGallery/UpdateGalleryAlbumPage', [
            'album' => $album
        ]);
    }

    public function edit(string $galleryId): Response
    {
        $album = Gallery::findOrFail($galleryId);
        return Inertia::render('ManageGallery/AddGalleryAlbum', [
            'album' => $album
        ]);
    }

    public function destroy(string $galleryId, DeleteAlbum $deleteAlbum): RedirectResponse
    {
        return $deleteAlbum->delete($galleryId);
    }
}
