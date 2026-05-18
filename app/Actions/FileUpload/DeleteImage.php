<?php

namespace App\Actions\FileUpload;

use App\Models\Image;
use Carbon\Carbon;
use Illuminate\Http\RedirectResponse;

class DeleteImage
{

    public function delete(string $imageId): RedirectResponse
    {



        $image = Image::findOrFail($imageId);
        $image->deleted_at = Carbon::now()->toDateTimeString();
        $image->updated_by = request()->user()?->id;

        if ($image->save()) {
            return redirect()->back()

                ->with(['message' => 'Deleted Image: ' . $image->name]);
        }

        return redirect()
            ->back()
            ->with(['error' => 'Failed To Delete image']);
    }
}
