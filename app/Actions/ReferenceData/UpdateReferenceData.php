<?php

namespace App\Actions\ReferenceData;

use App\Models\ReferenceData\ReferenceData;
use App\Models\User;
use Illuminate\Http\RedirectResponse;

class UpdateReferenceData
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
    public function update(int $id, array $validated_data): RedirectResponse
    {
        /**
         * @var User|null $user
         */
        $user = request()->user();
        try {
            ReferenceData::where('id', $id)->update([
                'domain_id' => $validated_data['domain'],
                'parameter_id' => $validated_data['parameter'],
                'sort_order' => $validated_data['value_id'],
                'value_one' => $validated_data['value'],
                'value_two' => $validated_data['second_value'],
                'updated_by' => $user?->id,
            ]);
        } catch (\Exception $e) {
            return redirect()
                ->route('reference-data.edit', $id)
                ->with([
                    'updated' => false,
                    'message' => $e->getMessage()
                ]);
        }

        return redirect()
            ->route('reference-data.index')
            ->with([
                'updated' => true,
                'message' => 'Updated Reference Data'
            ]);
    }
}
