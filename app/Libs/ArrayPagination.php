<?php

namespace App\Libs;

use Illuminate\Pagination\LengthAwarePaginator;

class ArrayPagination
{
    private int $currentPage = 1;

    public function __construct(
        private array $list,
        private int $perPage
    ) {
        if (request()->page != null) {
            $this->currentPage = (int)request()->page;
        }
    }

    /**
     * @return LengthAwarePaginator<array{...}>
     */
    public function paginate(): LengthAwarePaginator
    {
        $list = array_slice(
            $this->list,
            ($this->currentPage - 1) * $this->perPage,
            $this->perPage
        );
        return new LengthAwarePaginator($list, count($this->list), $this->perPage, $this->currentPage, [
            'path' => request()->url(),
            'query' => request()->query(),
        ]);
    }
}
