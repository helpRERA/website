<?php

namespace App\Http\Controllers\FileUpload;

use App\Actions\FileUpload\FileUpload;
use App\Http\Controllers\Controller;
use App\Http\Requests\FileUploadRequest;
use App\Models\Document;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Throwable;

class FileUploadController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * @throws Throwable
     */
    public function index(FileUploadRequest $request, FileUpload $fileUpload): JsonResponse
    {
        $validated = $request->all();

        return $fileUpload->uploadFile($validated['file'], $validated['name']);
    }

    public function fileNameSearch(Request $request): JsonResponse
    {
        if (!$request->filled('search')) {
            $files = Document::limit(5)
                ->orderBy('created_at', 'desc')
                ->get();

            return response()->json($files);
        }
        $files = Document::where('name', 'LIKE', "%$request->search%")
            ->limit(5)
            ->get();

        return response()->json($files);
    }
}
