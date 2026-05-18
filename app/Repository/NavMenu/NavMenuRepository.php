<?php

namespace App\Repository\NavMenu;

use App\Models\UIBuilder\NavMenuItem;
use Illuminate\Database\Eloquent\Builder;

class NavMenuRepository
{
    /**
     *
     * @param string $section
     * @return Builder<NavMenuItem>
     */
    public function fetchSection(string $section): Builder
    {
        return NavMenuItem::where('section', $section);
    }

    /**
     * Undocumented function
     *
     * @param array{
     *  section: string,
     *  data: array{ lastUUID: string, ...},
     *  created_by: string|null,
     *  updated_by: string|null,
     * } $data
     *
     * @return NavMenuItem|null
     */
    public function create(array $data): ?NavMenuItem
    {
        return NavMenuItem::create([
            'section' => $data['section'],
            'items' => $data['data'],
            'created_by' => request()->user()?->id,
            'updated_by' => request()->user()?->id,
        ]);
    }

    /**
     * @param array{
     * section: string,
     * data: array{...},
     * } $data
     */
    public function update(int $itemId, array $data): int
    {
        return NavMenuItem::where('id', $itemId)
            ->update([
                'section' => $data['section'],
                'items' => $data['data'],
                'updated_by' => request()->user()?->id,
            ]);
    }
}
