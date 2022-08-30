<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Address extends Model
{
    use HasFactory;
    protected $table = 'property_address';
    protected $fillable = ["property_id","country", "state", "city","street_name","zip_code","longitude","latitude"];



public function property(){
    return $this->belongsTo('App\Models\Properties');
}
}