<?php

namespace App\Http\Controllers\FileUpload;

use App\Actions\FileUpload\ImageUpload;
use App\Http\Controllers\Controller;
use App\Http\Requests\ImageUploadRequest;
use App\Models\Image;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ImageUploadController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index(ImageUploadRequest $request, ImageUpload $imageUpload): JsonResponse
    {
        $validated = $request->all();
        return $imageUpload->uploadFile($validated['file'], $validated['name']);
    }

    public function fileNameSearch(Request $request): JsonResponse
    {
        if (!$request->filled('search')) {
            $files = Image::limit(5)
                ->orderBy('created_at', 'desc')
                ->get();

            return response()->json($files);
        }
        $files = Image::where('name', 'LIKE', "%$request->search%")
            ->limit(5)
            ->get();

        return response()->json($files);
    }

    
}
