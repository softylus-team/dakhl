<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class bankAccount extends Model
{
    use HasFactory;
    protected $table = 'bank_accounts';
    protected $fillable = ["holder_id","holder_name", "bank_name","branch_name","country","swift_bic_code","iban","account_number","active"];
}
