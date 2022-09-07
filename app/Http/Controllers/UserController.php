<?php

namespace App\Http\Controllers;

use App\Models\Contract;
use App\Models\Investment;
use App\Models\Properties;
use App\Models\Stake;
use App\Models\User;
use App\Models\bankAccount;
use App\Models\Review;
use App\Models\ConstructionReport;
use App\Models\Photo;
use Bavix\Wallet\Models\Transaction;
use App\Models\TransactionFiltered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use App\Models\HomepageReview;
use App\Models\InvestorSavedProperty;
use App\Models\FinancialPlan;
use App\Notifications\InvoiceTransaction;
use Illuminate\Support\Facades\DB;


class UserController extends Controller
{
    public function allUsersEP()
    {$users = User::all();
        foreach($users as $user){
            $user['balance'] = $user->balance;
        }
        return $users;
        
    }
    public function index()
    {
        return Inertia::render('users-list', [
            'Users' => User::all(),
        ]);
    }
    public function singleUserEP($id)
    {
        $user = User::findOrFail($id);
        $user['balance'] = $user->balance;

        $outputstakes = array();
        $contracts = Contract::where('investor_id', $id)->get();
        // $Cids=array();
        foreach ($contracts as $contract) {
            // array_push($Cids,$contract->id);

            $stakes = Stake::where('contract_id', $contract->id)->get();
            foreach ($stakes as $stake) {
                $stake["property"] =Properties::find($contract->property_id)->name;
                $stake["status"] = $contract->contract_status;
                $output = array();
                $investments = Investment::where('stake_id', $stake->id)->get();
                foreach ($investments as $investment) {
                    array_push($output, [
                        "id" => $investment->id,
                        "amount" => $investment->amount,
                        "period" => $investment->period,
                        "created_at" => $investment->created_at,
                    ]
                    );
                }
                $stake['investments'] = $output;

                array_push($outputstakes, $stake);
            }
        }
        $user['stakes'] = $outputstakes;
        $user['savedProerties']= InvestorSavedProperty::where('investor_id', $user->id)->get();

        return $user;

    }
    public function updateUserEP(Request $request,$id)
    {
        // $request->validate([
        //     'first_name' => 'string|max:255',
        //     'last_name' => 'string|max:255',
        //     'phone_number' => 'number',//TO DO
        //     'gender' => 'string',

        // ]);

        $User = User::find($id);
        $User->first_name = $request->first_name?$request->first_name:$User->first_name;
        $User->last_name = $request->last_name?$request->last_name:$User->last_name;
        $User->birth_date = $request->birth_date?$request->birth_date:$User->birth_date;
        $User->phone = $request->phone?$request->phone:$User->phone; //TO DO: phone validation
        $User->gender = $request->gender?$request->gender:$User->gender;
        if ($request->email !== $User->email) {
             $request->validate([
                'email' => 'string|email|max:255|unique:users',
            ]);
            $User->email = $request->email?$request->email:$User->email;
        }
        $files = $request->file('photo');
        // print_r($files);
        if($files){
            $filename = $picture->getClientOriginalName();
            $extension = $picture->getClientOriginalExtension();
            $pic = date('His') . '-' . $filename;
            //move image to public/img folder
            $picture->move(public_path('images'), $pic);
            $User->photo_path="/profiles/" . $pic;
        }
        $User->save();
        

        return response()->json("success", 422);
    }
    
    public function view($id,$locale='ar')
    {
        $outputstakes = array();
        $contracts = Contract::where('investor_id', $id)->get();
        foreach ($contracts as $contract) {
            $stakes = Stake::where('contract_id', $contract->id)->get();

            foreach ($stakes as $stake) {
                $stake["property"] =Properties::find($contract->property_id)->name;
                $stake["status"] = $contract->contract_status;

                $output = array();
                $investments = Investment::where('stake_id', $stake->id)->get();
                foreach ($investments as $investment) {
                    array_push($output, [
                        "id" => $investment->id,
                        "amount" => $investment->amount,
                        "period" => $investment->period,
                        "created_at" => $investment->created_at,
                    ]
                    );
                }
                $stake['investments'] = $output;

                array_push($outputstakes, $stake);
            }
        }
        
        $user = User::findOrFail($id);
        $SavedProperties=InvestorSavedProperty::where("investor_id",$user->id)->get();
        $properties_ids=array();
        foreach ($SavedProperties as $SavedProperty) {
           array_push( $properties_ids , $SavedProperty->property_id);
        }
        $reviews=HomepageReview::where('author_id', $id)->get();
        foreach ($reviews as $review) {
            $user=User::find($review->author_id);
            $review["author_photo"]=$user->photo_path;
            $review["author_name"]=$user->first_name." ".$user->last_name;
        }
        return Inertia::render('MyAccount', [
            'user' => $user,
            'user_balance' => $user->balance,
            'stakes' => $outputstakes,
            'Properties'=>Properties::whereIn("id",$properties_ids)->get(),
            'Reviews'=> $reviews,
            'locale'=>$locale,
        ]);
    }
    public function updateMyAccount(Request $request)
    {
        $request->validate([
            'first_name' => 'string|max:255',
            'last_name' => 'string|max:255',
            'birth_date' => 'date',
            'gender' => 'string',

        ]);

        $User = User::find($request->id);
        $User->first_name = $request->first_name;
        $User->last_name = $request->last_name;
        $User->birth_date = $request->birth_date;
        $User->phone = $request->phone; //TO DO: phone validation
        $User->gender = $request->gender;
        if ($request->email !== $User->email) {
            $request->validate([
                'email' => 'string|email|max:255|unique:users',
            ]);
            $User->email = $request->email;
        }
        if ($request->password) {
            $request->validate([
                'password' => ['confirmed', Rules\Password::defaults()],
            ]);
            $User->password = Hash::make($request->password);
        }
        $files = $request->file('photo');
        // print_r($files);

        if($files){
                foreach ($files as $picture) {
                    $filename = $picture->getClientOriginalName();
                    $extension = $picture->getClientOriginalExtension();
                    $pic = date('His') . '-' . $filename;
                    //move image to public/img folder
                    $picture->move(public_path('profiles'), $pic);
                    $User->photo_path="/profiles/" . $pic;
                }
            
        }
        $User->save();

        return redirect()->back()->with('success', 'Your account details updated successfully');
    }
    public function create()
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request)
    {
        $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'birth_date' => 'date',
            'gender' => 'string',
            'phone' => 'string',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $user = User::create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'birth_date' => $request->birth_date,
            'gender' => $request->gender,
            'phone' => $request->phone,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);
        $files = $request->file('photo');
        // print_r($files);
        if($files){
            $filename = $picture->getClientOriginalName();
            $extension = $picture->getClientOriginalExtension();
            $pic = date('His') . '-' . $filename;
            //move image to public/img folder
            $picture->move(public_path('images'), $pic);
            $user->photo_path="/profiles/" . $pic;
            $user->save();

        }else{
            $user->photo_path="/profiles/defaultProfile.png";
            $user->save();
        }
                
            
        // event(new Registered($user));

        // Auth::login($user);

        // return redirect(RouteServiceProvider::HOME);
    }
    public function updateView($id)
    { //this is the slug
        return Inertia::render('Update-User', [
            'user' => User::findOrFail($id),
        ]);
    }
    public function update(Request $request)
    {
        $request->validate([
            'first_name' => 'string|max:255',
            'last_name' => 'string|max:255',
            'birth_date' => 'date',
            'gender' => 'string',
            // 'phone' => 'string',
            'role' => 'string',
            // 'email' => 'string|email|max:255|unique:users',
            // 'password' => ['confirmed', Rules\Password::defaults()],
        ]);

        $User = User::find($request->id);
        $User->first_name = $request->first_name;
        $User->last_name = $request->last_name;
        $User->birth_date = $request->birth_date;
        $User->phone = $request->phone;
        $User->role = $request->role;
        $User->gender = $request->gender;
        $User->activated = $request->activated;
        if ($request->email !== $User->email) {
            $request->validate([
                'email' => 'string|email|max:255|unique:users',
            ]);
            $User->email = $request->email;
        }
        if ($request->password) {
            $request->validate([
                'password' => ['confirmed', Rules\Password::defaults()],
            ]);
            $User->password = Hash::make($request->password);
        }
        $files = $request->file('photo');
        // print_r($files);
        if($files){
            $filename = $picture->getClientOriginalName();
            $extension = $picture->getClientOriginalExtension();
            $pic = date('His') . '-' . $filename;
            //move image to public/img folder
            $picture->move(public_path('images'), $pic);
            $User->photo_path="/profiles/" . $pic;
        }
        $User->save();

        return redirect(route('users'));
    }

    // public function walletView() {
    //     $user = Auth::user();
    //     // $user->deposit(10);
    //     // $user->withdraw(17);
    //     // $user->hasWallet('my-wallet');
    //     return Inertia::render('wallets',[
    //         'user_balance' => $user->balance,
    //     ]);
    // }
    public function deposit($amount)
    {
        $user = Auth::user();
        $user->deposit($amount);
        // $user->hasWallet('my-wallet');
        return Inertia::render('wallets', [
            'user_balance' => $user->balance,
        ]);
    }
    public function withdraw($amount)
    {
        $user = Auth::user();
        $user->withdraw($amount);
        // $user->hasWallet('my-wallet');
        return Inertia::render('wallets', [
            'user_balance' => $user->balance,
        ]);
    }
    public function walletDepositEP(Request $request)
    {
        $user = User::findOrFail($request->user_id);
        $user->deposit($request->amount,["type"=>"user_deposit","description" =>$request->description]);
        $tarnsactionData=[
                    
            'type' => "user_deposit",
            'amount' => $request->amount,
            'property' =>null
        ];
        $user->notify(new InvoiceTransaction($tarnsactionData));
        return $user;
    }
    public function walletWithdrawalEP(Request $request)
    {
        $user = User::findOrFail($request->user_id);
        $user->withdraw($request->amount,["type"=>"user_withdraw","description" =>$request->description]);
        $tarnsactionData=[
            'type' => "user_withdrawal",
            'amount' => $request->amount,
            'property' =>null
        ];
        $user->notify(new InvoiceTransaction($tarnsactionData));
        return $user;
    }

    public function myInvestmentsEP($id){
        $outputstakes = array();
        $contracts = Contract::where('investor_id', $id)->get();
        foreach ($contracts as $contract) {
            $stakes = Stake::where('contract_id', $contract->id)->get();
            foreach ($stakes as $stake) {
                $stake["property_id"] = $contract->property_id;
                $stake["property"] =Properties::find($contract->property_id)->name;
                $stake["property_desc"] =Properties::find($contract->property_id)->description;
                $stake["property_photos"] = Photo::where('property_id', $contract->property_id)->get("photo_path");
                $PP=DB::select("SELECT progress_percentage FROM property_construction_report where property_id = $contract->property_id" );
                $stake["progress_percentage"]=$PP[0]->progress_percentage;
                $stake["status"] = $contract->contract_status;

                $output = array();
                $investments = Investment::where('stake_id', $stake->id)->get();
                foreach ($investments as $investment) {
                    array_push($output, [
                        "id" => $investment->id,
                        "amount" => $investment->amount,
                        "period" => $investment->period,
                        "created_at" => $investment->created_at,
                    ]
                    );
                }
                $stake['investments'] = $output;
                array_push($outputstakes, $stake);
            }
        }
        

        $user = User::findOrFail($id);
        $reserved_stakes=count($outputstakes);
     
        return [
            'balance' => $user->balance,
            'monthlyReturn' =>0,
            'returnOnConversion' =>0,
            'openedInvestments' =>0,
            'closedInvestments' =>0,
            'stakes' => $outputstakes
        ];
    }
    public function walletOperationsEP(Request $request,$id){
        $user=User::find($id);
        return TransactionFiltered::filter($request)->where("payable_id",$id)->orderBy('created_at', 'desc')->get();
    }
    public function getWallet($locale='ar'){
        $user=Auth::user();
    $Deposites=Transaction::where("payable_id",$user->id)->where("type","deposit")->orderBy('created_at', 'desc')->get();
    $Withdrawals=Transaction::where("payable_id",$user->id)->where("type","withdraw")->orderBy('created_at', 'desc')->get();

    // $totalDeposites=
    return Inertia::render('Wallet',[
        'locale'=>$locale,
        'balance'=>$user->balance,
        'totalDeposites'=>$Deposites->sum('amount'),
        'totalWithdrawals'=>abs($Withdrawals->sum('amount')),
        'savedAccounts'=>bankAccount::where('holder_id',$user->id)->get()->count(),
        'bankAccounts'=>bankAccount::where('holder_id',$user->id)->get(),
        'deposites'=>$Deposites,
        'withdrawals'=>$Withdrawals
    ]);
    }
    public function DepositMoney($locale = 'ar') {//this is the slug
        $user=Auth::user();
        
        return Inertia::render('DepositMoney',[
            'locale'=>$locale,
            'bankAccounts'=>bankAccount::where('holder_id',$user->id)->get(),
        ]);//this is the page name
    }
    
}
