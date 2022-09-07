<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class General_questions extends Model
{
    use HasFactory;
    protected $table = 'general_questions';

    protected $fillable = [
        'user_id',
        'marital_status',
        'number_of_family_members',
        'educational_level',
        'email',
        'phone',
        'annual_income',
        'net_worth',
        'question1',
        'question2',
        'question3',
        'question4',
        'question5',
        'question6',
    ];
}
