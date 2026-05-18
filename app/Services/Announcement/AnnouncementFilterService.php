<?php

namespace App\Services\Announcement;

use App\Models\Announcement\Announcement;
use App\Repository\Announcement\AnnouncementRepository;
use Illuminate\Database\Eloquent\Builder;

class AnnouncementFilterService
{
    public function __construct(
        private AnnouncementRepository $repo,
    ) {
    }


    /**
     * @param array{
     * search: string|null,
     * from_date: string|null,
     * to_date: string|null,
     * type: string|null,
     * sub_type: string|null,
     * sort: string|null,
     *} $params
     *
     * @return Builder<Announcement>
     */
    public function search(array $params): Builder
    {

        [$sortBy, $sortOrder] = $this->getSortFields(isset($params['sort']) ? $params['sort'] : 'newest');
        return $this->repo->search(
            isset($params['search']) ? $params['search'] : null,
            isset($params['type']) ? $params['type'] : null,
            isset($params['sub_type']) ? $params['sub_type'] : null,
            $sortBy,
            $sortOrder,
            isset($params['from_date']) ? $params['from_date'] : null,
            isset($params['to_date']) ? $params['to_date'] : null,
        );
    }


    /**
     * Undocumented function
     *
     * @param string|null $sort
     * @return string[]
     */
    private function getSortFields(?string $sort): array
    {
        if ($sort === null || strtolower($sort) === 'newest') {
            return ['date', 'desc'];
        }
        return ['title', 'asc'];
    }
}
