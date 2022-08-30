<?php

namespace App\Models;
use Bavix\Wallet\Traits\CanPay;
use Bavix\Wallet\Interfaces\Customer;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Bavix\Wallet\Traits\HasWallet;
use Bavix\Wallet\Interfaces\Wallet;
use Bavix\Wallet\Interfaces\Product;
use Questocat\Referral\Traits\UserReferral;
use App\Traits\ManageUserTransactions;
class User extends Authenticatable implements Customer 
{
   
    use HasApiTokens, HasFactory, Notifiable, CanPay,UserReferral,ManageUserTransactions;
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */

    protected $fillable = [
        'first_name',
        'last_name',
        'birth_date',
        'gender',
        'phone',
        'email',
        'password',
        'role',
        'photo_path'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
    
    public function notifications()
{
    return $this->morphMany(\Illuminate\Notifications\DatabaseNotification::class, 'notifiable')->orderBy('pinned','DESC')->orderBy('created_at','DESC');
}
public function getReferralLink(){
    return route("register")."?ref=".$this->affiliate_id;
}
}
