<?php

namespace App\Actions\FileUpload;

use App\Models\Document;
use Carbon\Carbon;
use Illuminate\Http\RedirectResponse;

class DeleteDocument
{

    public function delete(string $fileId): RedirectResponse
    {
        $document = Document::findOrFail($fileId);
        $document->deleted_at = Carbon::now()->toDateTimeString();
        $document->updated_by = request()->user()?->id;

        if ($document->save()) {
            return redirect()->back()

                ->with(['message' => 'Deleted Image: ' . $document->name]);
        }

        return redirect()
            ->back()
            ->with(['error' => 'Failed To Delete image']);
    }
}
