<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ConstructionReport extends Model
{
    use HasFactory;
    protected $table = 'property_construction_report';
    protected $fillable = ["property_id","progress_percentage", "description"];
}
