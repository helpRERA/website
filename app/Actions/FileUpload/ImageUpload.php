<?php

namespace App\Actions\FileUpload;

use App\Libs\SaveFile;
use App\Models\Document;
use App\Models\Image;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;

class ImageUpload
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
        $image = Image::create([
            'name' => $name,
            'mime' => $file->getMTime(),
            'created_by' => $user?->id,
            'updated_by' => $user?->id,
        ]);

        if ($image == null) {
            DB::rollBack();
            return response()->json(['created' => false, 'message' => 'Failed To Upload Image']);
        }

        $fileName = $this->saveFile->save($file, $image->id, 'images');

        if ($fileName == '') {
            DB::rollBack();
            return response()->json(['created' => false, 'message' => 'Failed To Upload Image']);
        }

        $image->url = $fileName;
        $image->save();

        DB::commit();
        return response()->json([
            'created' => true,
            'message' => 'Image Uploaded',
            'record' => Image::find($image->id)
        ]);
    }
}
