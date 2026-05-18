<?php

namespace App\Http\Controllers\FileUpload;

use App\Actions\FileUpload\DeleteDocument;
use App\Actions\FileUpload\DeleteImage;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use App\Repository\Files\ImageRepository;
use App\Repository\Files\DocumentRepository;

class UploadsManagerController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function uploadedDocuments(DocumentRepository $documentRepository, Request $request): Response
    {
        return Inertia::render('ManageDocuments/ManageDocumentsPage', [
            'documents' => $documentRepository->search($request->search)->paginate(15),
        ]);
    }

    public function uploadedImages(ImageRepository $imageRepository, Request $request): Response
    {
        return Inertia::render('ManageDocuments/ManageImagesPage', [
            'images' => $imageRepository->search($request->search)->paginate(15),
        ]);
    }

    public function imageDestroy(string $id, DeleteImage $deleteImage): RedirectResponse
    {
        return $deleteImage->delete($id);
    }

    public function fileDestroy(string $id, DeleteDocument $deleteDocument): RedirectResponse
    {
        return $deleteDocument->delete(($id));
    }
}
