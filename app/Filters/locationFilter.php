<?php


namespace App\Filters;

class locatitonFilter
{
    public function filter($builder, $value)
    {
        return $builder->where('city', $value);
    }
}