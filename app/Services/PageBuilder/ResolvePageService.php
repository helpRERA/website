<?php

namespace App\Services\PageBuilder;

use App\Models\UIBuilder\Page;
use App\Repository\Page\PageRepository;

class ResolvePageService
{

    public function __construct(private PageRepository $pageRepository)
    {
    }

    public function getPage(string $url): Page
    {
        return $this->pageRepository
            ->searchUrl($url)
            ->published()
            ->firstOrFail();
    }
}
