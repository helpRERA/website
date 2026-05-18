<?php

namespace App\Libs;

use Illuminate\Pagination\LengthAwarePaginator;

class CustomPagination
{

    private int $currentPage = 1;

    public function __construct(
        private array $list,
        private int   $perPage,
        private int   $total,
    )
    {
        if (request()->page != null) {
            $this->currentPage = (int)request()->page;
        }
    }

    /**
     * @return LengthAwarePaginator<array{...}>
     */
    public function paginate(): LengthAwarePaginator
    {
        return new LengthAwarePaginator($this->list, $this->total, $this->perPage, $this->currentPage, [
            'path' => request()->url(),
            'query' => request()->query(),
        ]);
    }
}
