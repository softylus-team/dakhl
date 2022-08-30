<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Stake extends Model
{
    use HasFactory;
    protected $fillable = ["owner_id", "contract_id", "state","value","created_at"];
    public function investment(){
        return $this->hasMany('App\Models\Investments','stake_id');
    }

}
