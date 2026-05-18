<?php

namespace App\Http\Requests\UIEditor;

use Illuminate\Foundation\Http\FormRequest;

/**
 *@method array {
 * title: string,
 * description: string,
 * url: string,
 *} all()
 */
class PageStore extends FormRequest
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
        $id = request()->id;
        return [
            'title' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string', 'max:1000'],
            'url' => ['nullable', 'string', 'max:255', 'unique:pages,url'
                . ($id == null ? ',NULL,id' : ',' . $id . ',id') . ',deleted_at,NULL'],
            'published' => ['required', 'boolean'],
        ];
    }
}
