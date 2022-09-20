<?php
use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\Properties;
use App\Models\Address;
use App\Models\Review;
use App\Models\Photo;
use App\Models\User;
use App\Models\our_partners;
use App\Models\about_us;
use App\Models\how_we_work;
use App\Models\HomepageReview;
use App\Http\Controllers\PropertiesController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ContractController;
use App\Http\Controllers\SectionsController;
use App\Models\FinancialPlan;
use App\Models\Investment;
use App\Exports\InvestmentsExport;
use App\Models\Stake;
use App\Models\Contract;
use App\Http\Controllers\notificationController;
use App\Http\Controllers\PaymentController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });
Route::get('/{locale?}', function ($locale = 'ar') {
    if (isset($locale) && in_array($locale, config('app.available_locales'))) {
        app()->setLocale($locale);
    }
    $Properties=Properties::all();
    $PropertiesFilter=Properties::all();
    foreach ($Properties as $Property) {
        $Property['Plan'] = FinancialPlan::where('property_id', $Property->id)->get()->first();
        $Property['Photos'] = Photo::where('property_id', $Property->id)->get()->first();
    }
    $reviews=HomepageReview::all();
            foreach ($reviews as $review) {
                $user=User::find($review->author_id);
                $review["author_photo"]=$user->photo_path;
                $review["author_name"]=$user->first_name." ".$user->last_name;
            }
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
        'locale'=>$locale,
        'Properties' => $Properties,
        'Properties' => $PropertiesFilter,
        'Reviews' => $reviews,
        'Partners' => our_partners::all(),
        'howWorkCards'=>how_we_work::all(),
        'aboutusCards'=>about_us::all()
    ]);
})->name("/");
// Route::get('/login/{locale?}', function ($locale = 'ar') {
//     // if (isset($locale) && in_array($locale, config('app.available_locales'))) {
//     //     app()->setLocale($locale);
//     // }
    
//     return Inertia::render('Login', [
//         'locale'=>$locale,
//     ]);
// })->name("login");
Route::get('/ForgotPassword', function () {//this is the slug
    return Inertia::render('Auth/ForgotPassword');//this is the page name
})->name('ForgotPassword');
Route::get('/ResetPassword', function () {//this is the slug
    return Inertia::render('Auth/ResetPassword');//this is the page name
})->name('ResetPassword');
Route::get('/dashboard/{locale?}', function ($locale = 'ar') {//this is the slug
    $user=Auth::user();
    $outputstakes = array();
        $contracts = Contract::where('investor_id', $user->id)->get();
        foreach ($contracts as $contract) {
            $stakes = Stake::where('contract_id', $contract->id)->get();
            $property=Properties::find($contract->property_id);
            $price = FinancialPlan::where('property_id', $property->id)->get()->first();
            foreach ($stakes as $stake) {
                

                $stake["status"] = $contract->contract_status;

                $output = array();
                $investments = Investment::where('property_id', $property->id)->orderBy('created_at', 'desc')->get();
                foreach ($investments as $investment) {
                    array_push($output, [
                        "id" => $investment->id,
                        "amount" => $investment->amount,
                        // "period" => $investment->period,
                        "property"=>$property->name,
                        // "price"=>$price->minimum_investment,
                        "state"=>$stake->state,
                        "monthlyProfit"=>0,
                        "profitLoss"=>70,
                        "created_at" => $investment->created_at,
                    ]
                    );
                }
                $stake['investments'] = $output;

                array_push($outputstakes, $stake);
            }
        }
    return Inertia::render('Dashboard',[
        'locale'=>$locale,
        'balance'=>$user->balance,
        'totalPays'=>0,
        'monthlyReturn'=>0,
        'openInvestment'=>0,
        'closedInvestment'=>0,
        'stakes' => $outputstakes,

    ]);//this is the page name
})->setDefaults(['locale' => 'ar'])->middleware(['auth', 'verified'])->name('dashboard');//->name is a nickname to use it in route() insted of a complex slugs
// Route::get('/wallets',[UserController::class, 'walletView'] )->middleware(['auth', 'verified'])->name('wallets');//->name is a nickname to use it in route() insted of a complex slugs
Route::get('/wallet/{locale?}', [UserController::class, 'getWallet'])->setDefaults(['locale' => 'ar'])->middleware(['auth', 'verified'])->name('wallet');
Route::get('/bookmarks/{locale?}', [PropertiesController::class, 'getBookmarks'])->setDefaults(['locale' => 'ar'])->middleware(['auth', 'verified'])->name('bookmarks');

Route::get('/users', [UserController::class, 'index'])->name('users');//->name is a nickname to use it in route() insted of a complex slugs
Route::post('/updateuser', [UserController::class, 'update'])->middleware(['auth', 'verified'])->name('updateuser');
Route::get('/user/{id}/update', [UserController::class, 'updateView'])->middleware(['auth', 'verified'])->name('Update-user');
Route::get('/user/{id}/{locale?}',[UserController::class, 'view'] )->name('myaccount');//->name is a nickname to use it in route() insted of a complex slugs
Route::post('/updateMyAccount', [UserController::class, 'updateMyAccount'])->middleware(['auth', 'verified'])->name('updateMyAccount');

Route::get('/properties/{locale?}', [PropertiesController::class, 'index'])->name('properties');//->name is a nickname to use it in route() insted of a complex slugs
// Route::get('/properties1/{locale?}', [PropertiesController::class, 'updateProperties'])->middleware(['auth', 'verified'])->name('updateProperties');//->name is a nickname to use it in route() insted of a complex slugs


Route::get('/property/save/{id}',[PropertiesController::class, 'save'] )->setDefaults(['locale' => 'ar'])->name('saveproperty');//->name is a nickname to use it in route() insted of a complex slugs
Route::get('/property/unsave/{id}',[PropertiesController::class, 'unsave'] )->setDefaults(['locale' => 'ar'])->name('unsaveproperty');//->name is a nickname to use it in route() insted of a complex slugs
Route::get('/property/{id}/{locale?}',[PropertiesController::class, 'view'] )->setDefaults(['locale' => 'ar'])->name('viewproperty');//->name is a nickname to use it in route() insted of a complex slugs


Route::post('/admin/addproperty', [PropertiesController::class, 'store'])->middleware(['auth', 'verified'])->name('addproperty');
Route::get('/admin/add/property/{locale?}',[PropertiesController::class, 'add'] )->middleware(['auth', 'verified'])->name('Add-Property');



Route::post('/admin/updateproperty', [PropertiesController::class, 'update'])->middleware(['auth', 'verified'])->name('updateproperty');
Route::get('/admin/property/{id}/update/{locale?}', [PropertiesController::class, 'updateView'])->middleware(['auth', 'verified'])->name('Update-Property');

Route::post('/admin/deleteproperty', [PropertiesController::class, 'delete'])->middleware(['auth', 'verified'])->name('deleteproperty');
Route::get('/admin/property/{id}/delete',[PropertiesController::class, 'deleteView'] )->middleware(['auth', 'verified'])->name('Delete-Property');

Route::post('/addphotos', [PropertiesController::class, 'addPhotos'])->middleware(['auth', 'verified'])->name('addphotos');
Route::post('/addattachs', [PropertiesController::class, 'addattachs'])->middleware(['auth', 'verified'])->name('addattachs');
Route::post('/photodelete', [PropertiesController::class, 'photoDelete'])->middleware(['auth', 'verified'])->name('photodelete');
Route::post('/amenitydelete', [PropertiesController::class, 'AmenityDelete'])->middleware(['auth', 'verified'])->name('amenitydelete');
Route::post('/amenityupdate', [PropertiesController::class, 'AmenityUpdate'])->middleware(['auth', 'verified'])->name('amenityupdate');
Route::post('/amenitysave', [PropertiesController::class, 'AmenitySave'])->middleware(['auth', 'verified'])->name('amenitysave');
Route::post('/reviewdelete', [PropertiesController::class, 'ReviewDelete'])->middleware(['auth', 'verified'])->name('reviewdelete');
Route::post('/reviewupdate', [PropertiesController::class, 'ReviewUpdate'])->middleware(['auth', 'verified'])->name('reviewupdate');
Route::post('/reviewsave', [PropertiesController::class, 'ReviewSave'])->middleware(['auth', 'verified'])->name('reviewsave');
Route::post('/AddConstructionReport', [PropertiesController::class, 'AddConstructionReport'])->middleware(['auth', 'verified'])->name('AddConstructionReport');

Route::get('/property/{id}/invest/{locale?}', [PropertiesController::class, 'invest'])->setDefaults(['locale' => 'ar'])->middleware(['auth', 'verified'])->name('invest');
Route::post('/addInvestment/{locale?}', [ContractController::class, 'add_investment'])->middleware(['auth', 'verified'])->name('add-investment');
Route::post('/addStake', [ContractController::class, 'add_stake'])->setDefaults(['locale' => 'ar'])->middleware(['auth', 'verified'])->name('add-stake');
Route::get('/deleteInvestment/{id}/{locale?}', [ContractController::class, 'delete_investment_view'])->setDefaults(['locale' => 'ar'])->middleware(['auth', 'verified'])->name('delete-investment');
Route::post('/deleteInvestment', [ContractController::class, 'delete_investment'])->middleware(['auth', 'verified'])->name('deleteinvestment');
Route::post('/updateInvestment', [ContractController::class, 'update_investment'])->middleware(['auth', 'verified'])->name('update-investment');
Route::get('/liquidize/{id}', [ContractController::class, 'liquidize'])->middleware(['auth', 'verified'])->name('liquidize');
Route::get('/investmentsExport', function(){
    return new InvestmentsExport();
})->middleware(['auth', 'verified'])->name('investmentsExport');
Route::get('/sections-data/{locale?}', [SectionsController::class, 'index'])->middleware(['auth', 'verified'])->name('Sections-data');
Route::post('/addPartner', [SectionsController::class, 'addPartner'])->middleware(['auth', 'verified'])->name('addPartner');
Route::get('/deletePartner/{id}', [SectionsController::class, 'deletePartner'])->middleware(['auth', 'verified'])->name('deletePartner');
Route::post('/addReview', [SectionsController::class, 'addReview'])->middleware(['auth', 'verified'])->name('addReview');
Route::get('/approveReview/{id}', [SectionsController::class, 'approveReview'])->middleware(['auth', 'verified'])->name('approveReview');
Route::get('/deleteReview/{id}', [SectionsController::class, 'deleteReview'])->middleware(['auth', 'verified'])->name('deleteReview');
Route::post('/updateAboutus', [SectionsController::class, 'updateAboutus'])->middleware(['auth', 'verified'])->name('updateAboutus');
Route::post('/payment/prepareCheckout', [PaymentController::class, 'prepareCheckout'])->name("prepareCheckout");
Route::get('/payment/paymentStatus', [PaymentController::class, 'paymentStatus'])->name("paymentStatus");
Route::get('/payment/confirmPayment/{property_id}', [ContractController::class, 'confirmPayment'])->name("confirmPayment");
Route::post('/addBankAccount', [PaymentController::class, 'addBankAccount'])->name("addBankAccount");
Route::get('/bankAccountActivate/{id}', [PaymentController::class, 'bankAccountActivate'])->name("bankAccountActivate");
Route::get('/bankAccountDeactivate/{id}', [PaymentController::class, 'bankAccountDeactivate'])->name("bankAccountDeactivate");
Route::delete('/bankAccountDelete/{id}', [PaymentController::class, 'bankAccountDelete'])->name("bankAccountDelete");

Route::get('/DepositMoney/{locale?}',[UserController::class, 'DepositMoney'] )->setDefaults(['locale' => 'ar'])->middleware(['auth', 'verified'])->name('DepositMoney');//->name is a nickname to use it in route() insted of a complex slugs

Route::get('/withdrawMoney/{locale?}',[UserController::class, 'withdrawMoney'] )->setDefaults(['locale' => 'ar'])->middleware(['auth', 'verified'])->name('withdrawMoney');//->name is a nickname to use it in route() insted of a complex slugs

Route::get('/referral/{locale?}', function ($locale = 'ar') {//this is the slug
    $user=Auth::user();
    
    return Inertia::render('Referral',[
        'locale'=>$locale,
        'referralReturn'=>0,
        'referralUsers'=>0,
        'referralUrl'=>$user->getReferralLink(),
    ]);//this is the page name
})->setDefaults(['locale' => 'ar'])->middleware(['auth', 'verified'])->name('referral');//->name is a nickname to use it in route() insted of a complex slugs

Route::get('/settings/{locale?}', function ($locale = 'ar') {//this is the slug
    $user=Auth::user();
    
    return Inertia::render('Settings',[
        'locale'=>$locale,
        'referralReturn'=>0,
        'referralUsers'=>0,
        'referralUrl'=>"http://127.0.0.1:8000/",
    ]);//this is the page name
})->setDefaults(['locale' => 'ar'])->middleware(['auth', 'verified'])->name('settings');//->name is a nickname to use it in route() insted of a complex slugs

// Route::get('/referral/{locale?}', function ($locale = 'ar') {//this is the slug
//     $user=Auth::user();
    
//     return Inertia::render('Referral',[
//         'locale'=>$locale,
//         'referralReturn'=>0,
//         'referralUsers'=>0,
//         'referralUrl'=>"http://127.0.0.1:8000/",
//     ]);//this is the page name
// })->setDefaults(['locale' => 'ar'])->middleware(['auth', 'verified'])->name('referral');//->name is a nickname to use it in route() insted of a complex slugs

Route::get('/markAllAsRead/{id}', [notificationController::class,'markAllAsRead'])->middleware(['auth', 'verified'])->name('markAllAsRead');
Route::put('/pinNotification/{id}', [notificationController::class,'pin_notification'])->middleware(['auth', 'verified'])->name('pin_notification');
Route::put('/unpinNotification/{id}', [notificationController::class,'unpin_notification'])->middleware(['auth', 'verified'])->name('unpin_notification');
Route::delete('/deleteNotification/{id}', [notificationController::class,'delete_notification'])->middleware(['auth', 'verified'])->name('delete_notification');

// Route::get('/insert',function(){
//     DB::insert('insert into properties (name,type,bedrooms,status,nighborhood,bulding_name,community_name,description) values(?,?,?,?,?,?,?,?)',['PHP with Laravel','flat','2','under construction','658k','M Building','HI Comunity','has a big garage']);
// });

// Route::get('/read',function(){
//     $results=DB::select('select * from properties where id= ?',[2]);
//     return var_dump( $results);//object
//     // return $results; //array
//     // foreach($results as $property){
//     //     return($property->name);//element
//     // }

// });

// Route::get('/update',function(){
//     $updated=DB::update('update properties set name="Updated Name1" where id= ?',[2]);// 1 on success 0 on fail
//     return $updated;
// });

// Route::get('/delete',function(){
//     $deleted=DB::delete('delete from properties where id= ?',[1]);// 1 on success 0 on fail
//     return $deleted;
// });

//ELOQUENT
// Route::get('/read',function(){
//     $Properties= Properties::all();
//     foreach($Properties as $property){
//         return $property->name;
//     }
// });

// Route::get('/find',function(){
//     $Properties= Properties::find(2);
//     return $Properties->name;
// });
// Route::get('/findwhere',function(){
//     $Properties= Properties::where('id',2)->orderBy('id','desc')->take(1)->get();
//     return $Properties;
// });

// Route::get('/findmore',function(){
//     // $Properties= Properties::findOrFail(1);
//     // return $Properties;
//     $Properties= Properties::where('bedrooms','<',3)->firstOrFail();
//     return $Properties;
// });

// Route::get('/basicinsert',function(){
//      $Property= new Properties;
//      $Property->name="New ELOQUENT";
//      $Property->type="studio";
//      $Property->bedrooms=1;
//      $Property->status="repairing";
//      $Property->nighborhood="in ELOQUENT";
//      $Property->bulding_name="J ELOQUENT";
//      $Property->community_name="ELOQUENT";
//      $Property->description="has a small kitchen";
//      $Property->save();

// });

// Route::get('/basicupdate',function(){
//     $Property= Properties::find(3);
//     $Property->name="update ELOQUENT";
    
//     $Property->save();

// });

// Route::get('/create',function(){
//     Properties::create(['name'=>'create method', 'type'=>'apartment', 'bedrooms'=>2,"status"=>'available',"nighborhood"=>'14221mn',"bulding_name"=>'D Building',"community_name"=>'N Community',"description"=>'lovely sea view']);

// });
// Route::get('/update',function(){
//     Properties::where('id',5)->where('bedrooms',2)->update(['name'=>'update/create method']);

// });

// Route::get('/basicdelete',function(){
//     $Property=Properties::find(1);
//     $Property->delete();

// });
// Route::get('/delete',function(){
//     // Properties::destroy(6);
//     // Properties::destroy([1,6]);
//     // Properties::where('bedrooms',1)->delete();
    

// });

// Route::get('softdelete',function(){
//     Properties::find(1)->delete(); 
// });

// Route::get('readsoftdelete',function(){
//     // $Property = Properties::find(1);
//     // $Property =Properties::withTrashed()->where('id',1)->get();
//     // $Property =Properties::withTrashed()->get();
//     $Property =Properties::onlyTrashed()->get();
//     return $Property;
// });

// Route::get('restore',function(){
//     $Property =Properties::onlyTrashed()->where('id',1)->restore();
// });

// Route::get('forcedelete',function(){
//     $Property =Properties::onlyTrashed()->where('id',1)->forceDelete();
// });

//ELOQUENT Relationships
//one to one relationship
// Route::get('/property/{id}/createaddress',function($id){
//         Address::create(["property_id"=> $id ,"country"=>"JO", "state"=>"Asya", "city"=>"Amman","street_name"=>"dfghjkl","zip_code"=>1265,"longitude"=>14598763214,"latitude"=>14598763214]);
    
//     });
// Route::get('/property/{id}/address',function($id){
//     return Properties::find($id)->address;
// });

// Route::get('/address/{id}/property',function($id){
//     return Address::find($id)->property->name;
// });

//one to many relationships
// Route::get('/property/{id}/createphoto',function($id){
//             Photo::create(["property_id"=> $id ,"photo_name"=>"image2", "photo_path"=>"/resources/images/image2.jpg"]);
        
//         });
// Route::get('/property/{id}/photos',function($id){
//     $property=Properties::find($id);
//     return  $property->photos;
// });

//many to many relationships
// Route::get('/user/{id}/role',function($id){
// $user=User::find($id);
// return $user->roles;
// });

Route::get('/user/{id}/pivot',function($id){
    $user=User::find($id);
    foreach ($user->roles as $role) {
        echo $role->pivot;
    }
    });

require __DIR__.'/auth.php';
