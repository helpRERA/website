<?php

namespace App\Repository\Page;

use App\Models\UIBuilder\Page;
use Illuminate\Database\Eloquent\Builder;


class PageRepository
{

    /**
     * @param array{
     * title: string,
     * description: string,
     * url: string,
     * blocks: array{lastUUID: int, blocks: array{id: number}}
     *} $pageData
     */
    public function create(array $pageData): Page
    {
        $pageData['url'] = $pageData['url'] == null ? '' : $pageData['url'];
        return Page::create($pageData);
    }


    public function findOrFail(int $pageId): Page
    {
        return Page::findOrFail($pageId);
    }

    /**
     * Undocumented function
     *
     * @param integer $pageId
     * @param array{lastUUID: int, blocks: array{id: number, ...}} $block
     * @return boolean
     */
    public function updateBlock(int $pageId, array $block): bool
    {
        try {
            Page::where('id', $pageId)->update(['blocks' => $block]);
        } catch (\Exception $e) {
            return false;
        }
        return true;
    }

    /**
     *
     * @param string $url
     * @return Builder<Page>
     */
    public function searchUrl(string $url): Builder
    {
        return Page::where('url', $url);
    }


    /**
     * @param string|null $search
     * @return Builder<Page>
     */
    public function search(?string $search, bool $published = true): Builder
    {
        return Page::when($published, function ($query) {
            $query->published();
        })->when($search != null, function ($query) use ($search) {
            $query->where(
                function ($query) use ($search) {
                    $query->where('title', 'like', '%' . $search . '%')
                        ->orWhereFullText('description', $search);
                }
            );
        });
    }

    public function updateTitle(int $pageId, array $body): bool
    {
        try {
            Page::where('id', $pageId)->update(['blocks' => $body]);
        } catch (\Exception $e) {
            return false;
        }
        return true;
    }
}
