<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Filters\PropertyFilter;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletes;
use Bavix\Wallet\Traits\HasWallet;
use Bavix\Wallet\Interfaces\Product;
use Bavix\Wallet\Interfaces\Customer;

class Properties extends Model implements Product
{
    use HasWallet;
    use HasFactory;
    use SoftDeletes;
    /**
     * The table associated with the model.
     *
     * @var string
     */
    //we have an access to the table which is has the same name of the model , if the table isn't the same we need to define protected table
    protected $dates=['deleted_at'];
    protected $table = 'properties';
    protected $primaryKey = 'id';
    //allow data to be inserted and updated for create and update ELOQUENT methods 
    protected $fillable = ["name", "type", "bedrooms","status","nighborhood","bulding_name","community_name","description"];
    
    public function canBuy(Customer $customer, int $quantity = 1, bool $force = false): bool
    {
        /**
         * If the service can be purchased once, then
         *  return !$customer->paid($this);
         */
        return true; 
    }
    public function getAmountProduct(Customer $customer)
    {
        return 100;
    }

    public function getMetaProduct(): ?array
    {
        return [
            'title' => $this->title, 
            'description' => 'Purchase of Product #' . $this->id,
        ];
    }
    public function address(){
        return $this->hasOne('App\Models\Address','property_id');
    }
    public function financial_plan(){
        return $this->hasOne('App\Models\FinancialPlan','property_id');
    }

    public function photos(){
        return $this->hasMany('App\Models\Photo','property_id');
    }
    public function amenities(){
        return $this->hasMany('App\Models\Amenity','property_id');
    }
    public function construction_reports(){
        return $this->hasMany('App\Models\ConstructionReport','property_id');
    }
    public function scopeFilter(Builder $builder, $request)
    {
        return (new PropertyFilter($request))->filter($builder);
    }
}
