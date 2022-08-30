<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InvestorSavedProperty extends Model
{
    use HasFactory;
    protected $table="investor_saved_properties";

    protected $fillable = ["investor_id","property_id"];

}
