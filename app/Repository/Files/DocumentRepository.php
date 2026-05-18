<?php

namespace App\Repository\Files;

use App\Models\Document;
use Illuminate\Database\Eloquent\Builder;

class DocumentRepository
{

    /**
     * @param string|null $search
     * @return Builder<Document>
     */
    public function search(?string $search): Builder
    {
        return Document::when($search != null, function (Builder $builder) use ($search) {
            $builder->where('name', 'like', '%' . $search . '%');
        });
    }
}
