<?php

namespace App\Services\GlobalSearch;

use App\Repository\Announcement\AnnouncementRepository;
use App\Repository\Page\PageRepository;
use App\Repository\Project\ProjectRepository;

class GlobalSearchService
{

    public function __construct(
        private AnnouncementRepository $announcementRepo,
        private ProjectRepository $projectRepo,
        private PageRepository $pageRepo
    ) {
    }

    public function search(string $section, ?string $search): array
    {
        $results = [
            'announcements' => null,
            'projects' => null,
            'pages' => null,
        ];

        if ($section === 'Announcements') {
            $results['announcements'] = $this->announcementRepo
                ->search($search)
                ->paginate(20)
                ->withQueryString();
        }

        if ($section === 'Projects') {
            $results['projects'] = $this->projectRepo
                ->search($search)
                ->paginate(20)
                ->withQueryString();
        }

        if ($section === 'Pages') {
            $results['pages'] = $this->pageRepo
                ->search($search)
                ->paginate(20)
                ->withQueryString();
        }


        return $results;
    }
}
