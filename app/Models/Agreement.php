<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Agreement extends Model
{
    use HasFactory;
    
    protected $guarded = [];

    public function promoterCompany()
    {
        return $this->hasOne(PromoterCompany::class);
    }

    public function promoterIndividual()
    {
        return $this->hasOne(PromoterIndividual::class);
    }
    public function promoterPartnership()
    {
        return $this->hasOne(promoterPartnership::class);
    }

    public function garageDetails()
    {
        return $this->hasMany(GarageDetail::class);
    }
    public function landJdas()
    {
        return $this->hasMany(LandJda::class);
    }
    public function additionalDisclosures()
    {
        return $this->hasMany(AdditionalDisclosure::class);
    }
    public function PriceBreakdown()
    {
        return $this->hasMany(PriceBreakdown::class);
    }

    
}
 