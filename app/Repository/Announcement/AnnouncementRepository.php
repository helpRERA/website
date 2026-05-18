<?php

namespace App\Repository\Announcement;

use App\Models\Announcement\Announcement;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;

class AnnouncementRepository
{

    /**
     * @param array{
     * title: string,
     * title_malayalam: string|null,
     * description: string,
     * description_malayalam: string|null,
     * date: string,
     * type: string,
     * sub_type: string,
     * created_by: int|null,
     * updated_by: int|null,
     * } $data
     *
     */
    public function create(array $data): ?Announcement
    {
        return Announcement::create($data);
    }

    /**
     * @param array{
     * title: string,
     * title_malayalam: string|null,
     * description: string,
     * description_malayalam: string|null,
     * date: string,
     * type: string,
     * sub_type: string,
     * updated_by: int|null,
     * } $data
     *
     */
    public function update(array $data, int $announcementId): int
    {
        return Announcement::where('id', $announcementId)
            ->update($data);
    }

    /**
     * @return Collection<int, Announcement>
     */
    public function latest(
        string $type = null,
        int    $limit = 6
    ): Collection
    {
        return Announcement::orderBy('created_at', 'desc')
            ->published()
            ->limit($limit)
            ->when($type != null, function ($query) use ($type) {
                return $query->where('type', $type);
            })
            ->get();
    }

    /**
     *
     * @param string|null $search
     * @return Builder<Announcement>
     */
    public function search(
        ?string $search,
        ?string $type = null,
        ?string $subType = null,
        ?string $sortBy = null,
        ?string $sortOrder = null,
        ?string $fromDate = null,
        ?string $toDate = null,
        bool    $published = true,
    ): Builder
    {
        return Announcement::when($published, function (Builder $query) {
            $query->published();
        })
            ->when($search != null, function ($query) use ($search) {
                $query->where(function (Builder $query) use ($search) {
                    $query->where('title', 'like', "%{$search}%")
                        ->orWhereFullText('title_malayalam', $search)
                        ->orWhereFullText('description', $search)
                        ->orWhereFullText('description_malayalam', $search);
                });
            })
            ->when($type != null, function (Builder $query) use ($type) {
                $query->where('type', $type);
            })
            ->when($subType != null, function (Builder $query) use ($subType) {
                $query->where('sub_type', $subType);
            })
            ->when($sortBy != null && $sortOrder != null, function (Builder $query) use ($sortBy, $sortOrder) {
                $query->orderBy($sortBy, $sortOrder);
            })
            ->when($fromDate != null, function (Builder $query) use ($fromDate) {
                $query->whereDate('date', '>=', $fromDate);
            })
            ->when($toDate != null, function (Builder $query) use ($toDate) {
                $query->whereDate('date', '<=', $toDate);
            });
    }

    /**
     * @return Collection<int, Announcement>
     */
    public function ticker(): Collection
    {
        return Announcement::join(
            'announcement_tickers',
            'announcement_tickers.announcement_id',
            '=',
            'announcements.id'
        )
            ->published()
            ->orderBy('announcement_tickers.created_at', 'desc')
            ->selectRaw('announcements.*')
            ->get();
    }
}
