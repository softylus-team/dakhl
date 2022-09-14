<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Stake extends Model
{
    use HasFactory;
    protected $fillable = ["owner_id", "contract_id", "investment_id","value","created_at","property_id"];
    public function investment(){
        return $this->hasMany('App\Models\Investments','stake_id');
    }

}
