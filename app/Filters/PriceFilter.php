<?php

namespace App\Filters;

use App\Filters\AbstractFilter;
use Illuminate\Database\Eloquent\Builder;

class PriceFilter extends AbstractFilter
{
    protected $filters = [
        'minPrice' => minPriceFilter::class,
        'maxPrice' => maxPriceFilter::class,
    ];
}