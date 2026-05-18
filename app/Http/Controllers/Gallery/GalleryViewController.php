<?php

namespace App\Http\Controllers\Gallery;

use App\Http\Controllers\Controller;
use App\Models\Gallery\GalleryVideo;
use App\Repository\Gallery\GalleryRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class GalleryViewController extends Controller
{
    public function list(Request $request, GalleryRepository $galleryRepository): Response
    {
        return Inertia::render('Gallery/GalleryPage', [
            'albums' => strtoupper($request->section ?? '') != 'VIDEOS'
                ? $galleryRepository->publishedAlbums()->paginate(20)->withQueryString() : null,
            'videos' => strtoupper($request->section ?? '') == 'VIDEOS'
                ? GalleryVideo::published()->paginate(10)->withQueryString() : null,
            'section' => $request->section ?? 'Images'
        ]);
    }

    public function album(string $albumUrl, GalleryRepository $galleryRepository): Response
    {
        $album = $galleryRepository->whereUrl($albumUrl);
        return Inertia::render('Gallery/AlbumPage', [
            'album' => $album,
        ]);
    }
}
