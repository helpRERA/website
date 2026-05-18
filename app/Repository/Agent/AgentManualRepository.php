<?php

namespace App\Repository\Agent;

use App\Models\KRERA\AgentManual;
use Illuminate\Database\Eloquent\Builder;

class AgentManualRepository
{
    public function search(?string $name, ?string $registrationNumber): Builder
    {
        return AgentManual::when($name != null, function (Builder $query) use ($name) {
            return $query->where('Agent_Name', 'like', '%' . $name . '%');
        })->when($registrationNumber != null, function (Builder $query) use ($registrationNumber) {
            return $query->where('RegistrationNumber', 'like', '%' . $registrationNumber . '%');
        });
    }
}
