<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
// use Illuminate\Database\Eloquent\SoftDeletes;


class ConstructionReport extends Model
{
    use HasFactory;
    // use SoftDeletes;

    protected $table = 'property_construction_report';
    protected $primaryKey = 'id';
    protected $fillable = ["property_id","progress_percentage", "description","created_at","updated_at"];
}
