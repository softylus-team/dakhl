<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Amenity extends Model
{
    use HasFactory;
    protected $table = 'property_amenity';
    protected $fillable = ["property_id","amenity_name", "amenity_type","amenity_description"];
}
