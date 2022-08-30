<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class our_partners extends Model
{
    use HasFactory;
    protected $table="our_partners";
    protected $fillable = ["logo","name_ar", "name_en"];
}
