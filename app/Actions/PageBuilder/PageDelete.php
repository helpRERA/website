<?php

namespace App\Actions\PageBuilder;

use App\Models\UIBuilder\Page;
use Carbon\Carbon;
use Illuminate\Http\RedirectResponse;

class PageDelete
{
    public function delete(Page $page): RedirectResponse
    {
        try {
            $page->deleted_at = Carbon::now()->toDateTimeString();
            $page->updated_by = request()->user()?->id;
            $page->save();
        } catch (\Exception $e) {
            return redirect()
                ->back()
                ->with(['error' => $e->getMessage()]);
        }
        return redirect()
            ->route('page-builder.index')
            ->with(['message' => 'Page ' . $page->title . ' deleted successfully']);
    }
}
