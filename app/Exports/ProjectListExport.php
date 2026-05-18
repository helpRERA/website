<?php

namespace App\Exports;

use App\Services\Project\ProjectListService;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\FromCollection;

class ProjectListExport implements FromCollection
{
    /**
     * @return Collection
     */
    public function collection(): Collection
    {
        $rows = collect([]);

        $rows->push([
            'Project',
            'Promoter Name',
            'Project Type',
            'Project Start Date',
            'Date of Completion',
            'Certificate No',
            'Certificate Date',
            'Total',
            'Sold',
            'Status',
            'District',
            'Village',
            'Taluk',
        ]);

        $values = request()->all();
        $service = new ProjectListService();
        $service->fetchMeta(
            $values['project_name'] ?? null,
            $values['district'] ?? null,
            $values['taluk'] ?? null,
            $values['village'] ?? null,
            $values['work_status'] ?? null,
            $values['promoter_name'] ?? null,
            $values['registration_number'] ?? null,
            $values['start_date'] ?? null,
            $values['completion_date'] ?? null,
        );

        $data = $service->dataWithoutLastModifiedDate();
        foreach ($data as $row) {
            $rows->push([
                $row->Project,
                $row->PromoterName,
                $row->ProjectType,
                $row->ProjectStartDate,
                $row->DateOfCompletion,
                $row->CertiNo,
                $row->Certificate_Date,
                $row->Total,
                $row->Sold,
                $row->Status,
                $row->District,
                $row->Village,
                $row->Taluka,
            ]);
        }

        return $rows;

    }
}
