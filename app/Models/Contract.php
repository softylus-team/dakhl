<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Contract extends Model
{
    use HasFactory;
    protected $table="contracts";
    protected $fillable = ["investor_id", "property_id", "contract_status","created_at"];

}
