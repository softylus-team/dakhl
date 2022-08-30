<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Filters\TransactionFilter;
use Bavix\Wallet\Models\Transaction;
use Illuminate\Database\Eloquent\Builder;

class TransactionFiltered extends Transaction
{
    use HasFactory;

    public function scopeFilter(Builder $builder, $request)
    {
        return (new TransactionFilter($request))->filter($builder);
    }
}
