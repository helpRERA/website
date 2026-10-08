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

        if ($section === 'All') {
            $announcementQuery = $this->announcementRepo->search($search);
            $projectQuery = $this->projectRepo->search($search)->orderBy('ID');
            $announcementCount = (clone $announcementQuery)->count();
            $projectCount = (clone $projectQuery)->count();
            $page = \Illuminate\Pagination\LengthAwarePaginator::resolveCurrentPage();
            $perPage = 20;
            $offset = ($page - 1) * $perPage;
            $items = collect();

            if ($offset < $announcementCount) {
                $items = (clone $announcementQuery)->skip($offset)->take($perPage)->get()
                    ->map(fn ($item) => ['type' => 'announcement', 'item' => $item]);
            }
            $remaining = $perPage - $items->count();
            if ($remaining > 0) {
                $items = $items->concat(
                    (clone $projectQuery)->skip(max(0, $offset - $announcementCount))->take($remaining)->get()
                        ->map(fn ($item) => ['type' => 'project', 'item' => $item])
                );
            }

            $results['combined'] = (new \Illuminate\Pagination\LengthAwarePaginator(
                $items, $announcementCount + $projectCount, $perPage, $page,
                ['path' => \Illuminate\Pagination\LengthAwarePaginator::resolveCurrentPath()]
            ))->withQueryString();

            return $results;
        }

        if ($section === 'Announcements') {
            $results['announcements'] = $this->announcementRepo
                ->search($search)
                ->paginate(20, ['*'], 'announcements_page')
                ->withQueryString();
        }

        if ($section === 'Projects') {
            $results['projects'] = $this->projectRepo
                ->search($search)
                ->paginate(20, ['*'], 'projects_page')
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
