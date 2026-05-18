<?php

namespace App\Repository\Project;

use App\Models\KRERA\ProjectMaster;
use Illuminate\Database\Eloquent\Builder;

class ProjectRepository
{
    public function search(?string $search)
    {
        return ProjectMaster::when($search != null, function (Builder $query) use ($search) {
            $query->where('Name', 'like', '%' . $search . '%');
        })
            // ->whereHas('certificate');
            ->with([
                'certificate' => function ($hasOne) {
                    $hasOne->select('ID', 'ProjectID', 'CertificateNo', 'RegistrationNo');
                }
            ]);
    }
}
