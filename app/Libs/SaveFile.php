<?php

namespace App\Libs;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\UploadedFile;
use Exception;

class SaveFile
{
    public function __construct()
    {
    }

    public function save(UploadedFile $file, string|int $name, string $folder): string
    {
        try {
            $fileName = $name . '.' . $file->extension();
            $file->storeAs('public/' . $folder . '/', $fileName);
        } catch (Exception $e) {
            return '';
        }
        return '/storage/' . $folder . '/' . $fileName;
    }
}
