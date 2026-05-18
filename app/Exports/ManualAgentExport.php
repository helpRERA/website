<?php

namespace App\Exports;

use App\Repository\Agent\AgentManualRepository;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\FromCollection;

class ManualAgentExport implements FromCollection
{


    public function __construct(
        private ?string $agent,
        private ?string $registrationNumber
    ) {
    }

    /**
     * @return \Illuminate\Support\Collection<int, array{...}>
     */
    public function collection(): Collection
    {
        $rows = collect([]);
        $rows->push([
            'Registration Number',
            'Agent Name',
            'Address',
            'Address',
            'Phone Number'
        ]);

        $repo = new AgentManualRepository();

        $records = $repo->search($this->agent, $this->registrationNumber)->get();


        foreach ($records as $record) {
            $rows->push([
                $record->RegistrationNumber,
                $record->Agent_Name,
                $record->Agent_Type,
                $record->PermanentAddress,
                $record->PhoneNumber
            ]);
        }

        return $rows;
    }
}
