<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PlotPricing extends Model
{
    use HasFactory;
    protected $guarded = [];
    public function agreement()
    {
        return $this->belongsTo(Agreement::class);
    }
}
