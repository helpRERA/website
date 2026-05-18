<?php

namespace App\Http\Requests\Gallery;

use Illuminate\Foundation\Http\FormRequest;

class StoreGalleryRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize(): bool
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
        $id = request()->id;
        return [
            'name' => 'required|string|max:255',
            'name_malayalam' => 'nullable|string|max:255',
            'description' => 'required|string|max:2000',
            'id' => 'nullable|integer',
            'description_malayalam' => 'nullable|string|max:2000',
            'url' => 'required|string|max:255|unique:galleries,url'
                . ($id == null ? ',NULL,id' : ',' . $id . ',id') . ',deleted_at,NULL',
            'cover_image' => 'required|string|max:255',
            'published' => 'required|boolean',
            'event_date' => 'required|string|max:25'
        ];
    }
}
