<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProfileMenu extends Model
{
    use HasFactory;
    protected $table = 'profile_menu';
    protected $fillable = ["text_ar","text_en", "icon","url"];
}
