<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class about_us extends Model
{
    use HasFactory;
    protected $table="about_us";
    protected $fillable = ["icon","title_ar", "title_en","description_en","description_ar"];

}
