<?php

namespace App\Actions\ReferenceData;

use App\Models\ReferenceData\ReferenceData;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\RedirectResponse;

class DeleteReferenceData
{
    public function __construct()
    {
    }

    public function delete(int $id): RedirectResponse
    {
        /**
         * @var User|null $user
         */
        $user = request()->user();

        try {
            ReferenceData::where('id', $id)->update([
                'updated_by' => $user?->id,
                'deleted_at' => Carbon::now()->toDateTimeString()
            ]);
        } catch (\Exception $e) {
            return redirect()
                ->route('reference-data.edit', $id)
                ->with([
                    'deleted' => false,
                    'message' => $e->getMessage()
                ]);
        }
        return redirect()
            ->route('reference-data.index')
            ->with([
                'deleted' => true,
                'message' => 'Deleted Reference Data'
            ]);
    }
}
