<?php

namespace App\Http\Requests\ReferenceData;

use Illuminate\Foundation\Http\FormRequest;

class ReferenceDataUpdate extends FormRequest
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
            'domain' => ['required', 'integer', 'exists:reference_data_domains,id'],
            'parameter' => ['required', 'integer', 'exists:reference_data_parameters,id'],
            'value_id' => ['nullable', 'integer', 'min:0'],
            'value' => ['required', 'string', 'max:255'],
            'second_value' => ['nullable', 'string', 'max:255']
        ];
    }
}
