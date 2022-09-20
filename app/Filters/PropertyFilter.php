<?php

namespace App\Filters;

use App\Filters\AbstractFilter;
use Illuminate\Database\Eloquent\Builder;

class PropertyFilter extends AbstractFilter
{
    protected $filters = [
        'type' => TypeFilter::class,
        'status' => StatusFilter::class,
        'minimumPrice' => minimumPrice::class,
        'companies' => companieFilter::class,
        // 'location' => locatitonFilter::class,
    ];
}