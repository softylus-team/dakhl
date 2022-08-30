<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HomepageReview extends Model
{
    use HasFactory;
    
    protected $table = 'reviews';
    protected $fillable = ["author_id", "message","rating"];
}
