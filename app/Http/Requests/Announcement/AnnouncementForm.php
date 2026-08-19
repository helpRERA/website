<?php

namespace App\Http\Requests\Announcement;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

/**
 * @method array{
 * title: string,
 * title_malayalam: string|null,
 * description: string,
 * description_malayalam: string|null,
 * date: string,
 * type: string,
 * sub_type: string,
 * published: bool,
 * publish_to_ticker: bool,
 * } all()
 */
class AnnouncementForm extends FormRequest
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
            'title' => ['required', 'string', 'max:255'],
            'title_malayalam' => ['nullable', 'string', 'max:255'],
            'description' => ['required', 'string', 'max:1000'],
            'description_malayalam' => ['nullable', 'string', 'max:1000'],
            'date' => ['required', 'date'],
            'type' => ['required', 'string', 'max:255'],
            'sub_type' => ['required', 'string', 'max:255'],
            'published' => ['required', 'boolean'],
            'ticker' => ['required', 'boolean'],
            'category' => ['required', 'string', Rule::in(['Project', 'Promoters', 'Agents', 'Legal', 'Others'])],
        ];
    }
}
