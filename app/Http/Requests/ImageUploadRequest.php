<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

/**
 *
 * @method array{
 *  file: \Illuminate\Http\UploadedFile,
 *  name: string,
 * } all()
 */
class ImageUploadRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'file' => ['required', 'file', 'max:1000', 'mimes:jpg,png,jpeg,gif,svg'],
            'name' => ['required', 'string', 'max:255']
        ];
    }
}
