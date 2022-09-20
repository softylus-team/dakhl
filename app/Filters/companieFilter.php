<?php


namespace App\Filters;

class companieFilter
{
    public function filter($builder, $value)
    {
        return $builder->where('name', $value);
    }
}