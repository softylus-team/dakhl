<?php


namespace App\Filters;

class maxPriceFilter
{
    public function filter($builder, $value)
    {
        return $builder->where('price', '<=', $value);
    }
}