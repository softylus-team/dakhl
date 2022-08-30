<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Filters\PriceFilter;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class FinancialPlan extends Model
{
    use HasFactory;
    protected $table = 'property_financial_plan';
    protected $fillable = ["property_id","price", "minimum_investment"];

    public function property(){
        return $this->belongsTo('App\Models\Properties');
    }
    public function scopeFilter(Builder $builder, $request)
    {
        return (new PriceFilter($request))->filter($builder);
    }
}
