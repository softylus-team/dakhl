<?php


namespace App\Filters;

class minimumPrice
{
    public function filter($builder, $value)
    {
        return $builder->where('stake_amout', '>=', $value);
    }
}