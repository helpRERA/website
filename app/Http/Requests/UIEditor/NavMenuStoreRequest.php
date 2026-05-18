<?php

namespace App\Http\Requests\UiEditor;

use Illuminate\Foundation\Http\FormRequest;
use Log;

class NavMenuStoreRequest extends FormRequest
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
            'section' => ['required', 'string', 'max:255'],
            'data.lastUUID' => ['required', 'integer', 'min:0'],
            'data.items' => ['required', 'array'],
            'data.items.*.id' => ['required', 'integer', 'min:0'],
            'data.items.*.lastUUID' => ['required', 'integer', 'min:0'],
            'data.items.*.section.english' => ['required', 'string', 'max:255'],
            'data.items.*.section.malayalam' => ['nullable', 'string', 'max:255'],
            'data.items.*.links' => ['required', 'array'],
            'data.items.*.links.*.id' => ['required', 'integer', 'min:0'],
            'data.items.*.links.*.name.english' => ['required', 'string', 'max:255'],
            'data.items.*.links.*.name.malayalam' => ['nullable', 'string', 'max:255'],
            'data.items.*.links.*.link' => ['required', 'string', 'max:255'],
            'data.items.*.links.*.external' => ['required', 'boolean'],
        ];
    }
}
