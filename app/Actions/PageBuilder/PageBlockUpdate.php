<?php

namespace App\Actions\PageBuilder;

use App\Repository\Page\PageRepository;
use Illuminate\Http\RedirectResponse;

class PageBlockUpdate
{


    public function __construct(private PageRepository $pageRepository)
    {
    }

    /**
     * @param array{lastUUID: int, blocks: array{id: number, ...}} $pageData
     */
    public function update(int $pageId, array $pageData): RedirectResponse
    {
        $updated = $this->pageRepository->updateBlock($pageId, $pageData);
        if ($updated) {
            return redirect()
                ->back()
                ->with(['message' => 'Page updated successfully']);
        }

        return redirect()
            ->back()
            ->with(['error' => 'Something went wrong']);
    }
}
