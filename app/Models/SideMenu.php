<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SideMenu extends Model
{
    use HasFactory;
    protected $table = 'side_menu';
    protected $fillable = ["text_ar","text_en", "icon","url"];
}
