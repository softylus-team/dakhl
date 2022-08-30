<?php
namespace App\Models;

// use Hyn\Tenancy\Traits\UsesTenantConnection;
use Devinweb\LaravelHyperpay\Models\Transaction as ModelsTransaction;

class HyperpayTransaction extends ModelsTransaction
{
    // use UsesTenantConnection;
    protected $table="hyperpay_transactions";
}