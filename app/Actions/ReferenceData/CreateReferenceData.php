<?php

namespace App\Actions\ReferenceData;

use App\Models\ReferenceData\ReferenceData;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;

class CreateReferenceData
{
    public function __construct()
    {
    }

    /**
     * @param array{
     *     domain: int,
     *     parameter: int,
     *     value_id: int|null,
     *     value: string,
     *     second_value: string|null
     * } $validated_data
     * @return RedirectResponse
     */
    public function create(array $validated_data): RedirectResponse
    {
        /**
         * @var User|null $user
         */
        $user = request()->user();

        $record = ReferenceData::create([
            'domain_id' => $validated_data['domain'],
            'parameter_id' => $validated_data['parameter'],
            'sort_order' => $validated_data['value_id'],
            'value_one' => $validated_data['value'],
            'value_two' => $validated_data['second_value'],
            'created_by' => $user?->id,
            'updated_by' => $user?->id,
        ]);

        if ($record == null) {
            return redirect()
                ->route('reference-data.create')
                ->with([
                    'created' => false,
                    'message' => 'Failed To Create Reference Data Record'
                ]);
        }

        return redirect()
            ->route('reference-data.index')
            ->with([
                'created' => true,
                'message' => 'Added New Reference Data'
            ]);
    }

}
