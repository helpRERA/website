<?php

namespace App\Services\PageBuilder;

use App\Models\UIBuilder\Page;

class ResolveDataService
{

    public function __construct(private FetchDataDependencyService $fetchData)
    {
    }

    /**
     * @return array<string|int, mixed>
     */
    public function getData(Page $page): array
    {
        $result = [];
        if (!isset($page->blocks)) {
            return $result;
        }
        foreach ($page->blocks['blocks'] as $block) {
            if (!isset($block['dependencies'])) {
                continue;
            }
            foreach ($block['dependencies'] as $dependency) {
                if (!isset($result[$dependency])) {
                    $result[$dependency] = $this->fetchData->$dependency();
                }
            }
        }

       // dd($result);
        return $result;
    }
}
