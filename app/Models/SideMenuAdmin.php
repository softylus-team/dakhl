<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SideMenuAdmin extends Model
{
    use HasFactory;
    protected $table = 'side_menu_admin';
    protected $fillable = ["text_ar","text_en", "icon","url"];
}
