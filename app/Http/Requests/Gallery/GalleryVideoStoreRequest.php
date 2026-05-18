<?php

namespace App\Http\Requests\Gallery;

use Illuminate\Foundation\Http\FormRequest;

/**
 * @method array{
 *  caption: string,
 *  description: string,
 *  caption_malayalam: string|null,
 *  description_malayalam: string|null,
 *  url: string,
 *  date: string,
 *  published: bool,
 * } validated()
 */
class GalleryVideoStoreRequest extends FormRequest
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
    public function rules()
    {
        return [
            'caption' => ['required', 'string', 'max:255'],
            'caption_malayalam' => ['nullable', 'string', 'max:255'],
            'description' => ['required', 'string', 'max:1000'],
            'description_malayalam' => ['nullable', 'string', 'max:1000'],
            'url' => ['required', 'string', 'max:1000'],
            'date' => ['required', 'date'],
            'published' => ['required', 'boolean'],
        ];
    }
}
