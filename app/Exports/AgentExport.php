<?php

namespace App\Exports;

use App\Services\Agent\AgentListService;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\FromCollection;

class AgentExport implements FromCollection
{

    public function __construct(
        private ?string $agentName,
        private ?string $registrationNumber,
        private ?string $district,
        private ?string $taluk,
        private ?string $village,
        private ?string $pincode,
    )
    {
    }

    /**
     * @return Collection<int, array{...}>
     */
    public function collection(): Collection
    {
        $rows = collect([]);

        $rows->push([
            'Agent Name',
            'Address',
            'Land Mark',
            'Individual Email ID',
            'Individual Mobile No',
            'Company Email ID',
            'Company Mobile No',
            'Certificate No',
        ]);

        $repo = new AgentListService();

        $records = $repo->runQuery(
            $this->agentName,
            $this->district,
            $this->taluk,
            $this->village,
            $this->pincode,
            $this->registrationNumber
        );

        foreach ($records as $record) {
            $rows->push([
                $record->AgentName,
                $record->Address,
                $record->Landmark,
                str_replace(
                    '@',
                    '[at]',
                    $record->IndivisualEmailID
                ),
                $record->IndivisualMobileNo,
                str_replace(
                    '@',
                    '[at]',
                    $record->CompanyEmailID
                ),
                $record->CompanyMobileNo,
                $record->CertificateNo,
            ]);
        }


        return $rows;
    }
}
