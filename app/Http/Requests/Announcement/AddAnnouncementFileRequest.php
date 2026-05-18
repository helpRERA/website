<?php

namespace App\Http\Requests\Announcement;

use Illuminate\Foundation\Http\FormRequest;

/**
 *
 * @method array{
 * announcement_id: int,
 * document_id: int
 * } all()
 */
class AddAnnouncementFileRequest extends FormRequest
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
            'announcement_id' => ['required', 'integer'],
            'document_id' => ['required', 'integer']
        ];
    }
}
