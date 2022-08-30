<?php


namespace App\Filters;

class minPriceFilter
{
    public function filter($builder, $value)
    {
        return $builder->where('price', '>=', $value);
    }
}