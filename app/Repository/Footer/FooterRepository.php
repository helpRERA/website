<?php

namespace App\Repository\Footer;

use App\Models\UIBuilder\Footer;

class FooterRepository
{

    /**
     * @param array{...} $data
     */
    public function create(array $data): Footer
    {
        return Footer::create([
            'items' =>  $data,
            'created_by' => request()->user()?->id,
            'updated_by' => request()->user()?->id,
        ]);
    }

    public function getFooter(): Footer|null
    {
        return Footer::first();
    }

    /**
     * @param integer $id
     * @param array{...} $data
     * @return bool
     */
    public function update(int $id, array $data): bool
    {
        return Footer::where('id', $id)
            ->update([
                'items' =>  $data,
                'updated_by' => request()->user()?->id,
            ]);
    }
}
