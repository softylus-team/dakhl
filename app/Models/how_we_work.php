<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class how_we_work extends Model
{
    use HasFactory;
    protected $table="how_we_work";
    protected $fillable = ["icon","title_ar", "title_en","description_en","description_ar"];
}
