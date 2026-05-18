<?php

namespace App\Actions\FileUpload;

use App\Libs\SaveFile;
use App\Models\Document;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;

class FileUpload
{
    public function __construct(private SaveFile $saveFile)
    {
        $this->saveFile = $saveFile;
    }

    /**
     * @throws \Throwable
     */
    public function uploadFile(UploadedFile $file, string $name): JsonResponse
    {
        $user = request()->user();
        DB::beginTransaction();
        $document = Document::create([
            'name' => $name,
            'mime' => $file->getMimeType(),
            'created_by' => $user?->id,
            'updated_by' => $user?->id,
        ]);

        if ($document == null) {
            DB::rollBack();
            return response()->json(['created' => false, 'message' => 'Failed To Upload File']);
        }

        $fileName = $this->saveFile->save($file, $document->id, 'documents');

        if ($fileName == '') {
            DB::rollBack();
            return response()->json(['created' => false, 'message' => 'Failed To Upload File']);
        }

        $document->url = $fileName;
        $document->save();

        DB::commit();
        return response()->json([
            'created' => true,
            'message' => 'Document Uploaded',
            'record' => Document::find($document->id)
        ]);
    }
}
