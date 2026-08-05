<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PromoterPartnership extends Model
{
         protected $guarded = [];

    public function agreement()
    {
        return $this->belongsTo(Agreement::class);
    }
}
