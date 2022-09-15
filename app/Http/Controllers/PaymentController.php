<?php
namespace App\Http\Controllers;

use GuzzleHttp\Client as GuzzleClient;
use App\Facades\LaravelHyperpay;
use App\Billing\HyperPayBilling;
use App\Models\User;
use App\Models\bankAccount;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Arr;
use App\Notifications\InvoiceTransaction;

class PaymentController extends  Controller
{
    public function prepareCheckoutEP(Request $request)
    {
        $request->validate([
            'user_id' => 'required|integer',
            'amount' => 'required|integer',
        ]);
        $trackable_data = [
            // 'bank'=> bankAccount::find(14),
        ];
        // $user = Auth::user();
        $user = User::find($request->user_id);
        $amount = $request->amount;
        $brand = 'VISA'; // MASTER OR MADA
        $LaravelHyperpay= new LaravelHyperpay( new GuzzleClient );
        return $LaravelHyperpay->addRedirectUrl(route("paymentStatus"))->addBilling(new HyperPayBilling())->checkout($trackable_data, $user, $amount, $brand, $request);
        
        // return LaravelHyperpay1::test();

        // $user = User::find(2);
        // $bank= bankAccount::find($request->bank_id);
        // $heyPerPayConfig = config('hyperpay');
        //     $url = "https://eu-test.oppwa.com/v1/payments";
        //     $data = "entityId=".$heyPerPayConfig['entityId'] .
        //                 "&amount=$request->amount" .
        //                 "&currency=".$heyPerPayConfig['currency'] .
        //                 "&paymentBrand=STC_PAY" .
        //                 "&paymentType=DB" .
        //                 "&bankAccount.holder=$bank->holder_name" .
        //                 "&bankAccount.bankName=$bank->bank_name" .
        //                 "&bankAccount.number=$bank->account_number" .
        //                 "&bankAccount.bic=$bank->bic" .
        //                 "&bankAccount.iban=$bank->iban" .
        //                 "&bankAccount.country=$bank->country" .
        //                 "&shopperResultUrl=".route("paymentStatus").
        //                 "&testMode=EXTERNAL";
        
        //     $ch = curl_init();
        //     curl_setopt($ch, CURLOPT_URL, $url);
        //     curl_setopt($ch, CURLOPT_HTTPHEADER, array(
        //                    'Authorization:Bearer OGE4Mjk0MTc0YjdlY2IyODAxNGI5Njk5MjIwMDE1Y2N8c3k2S0pzVDg='));
        //     curl_setopt($ch, CURLOPT_POST, 1);
        //     curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
        //     curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);// this should be set to true in production
        //     curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        //     $responseData = curl_exec($ch);
        //     if(curl_errno($ch)) {
        //         return curl_error($ch);
        //     }
        //     curl_close($ch);
        //     $transactionData= (array) json_decode((string) $responseData, true) ;
        //     $transaction = $user->HyperpayTransactions()->where('status', 'pending')->whereBrand($transactionData['paymentBrand'])->first();
        //     if ($transaction) {
        //         $transaction->delete();
        //     }
        //     $transaction = $user->HyperpayTransactions()->create([
        //         'id' => Arr::get($transactionData, 'id'),
        //         $user->getForeignKey() => $user->id,
        //         'checkout_id' => Arr::get($transactionData, 'id'),
        //         'status' => 'pending',
        //         'amount' => Arr::get($transactionData, 'amount'),
        //         'currency' => Arr::get($transactionData, 'currency'),
        //         'brand' =>  Arr::get($transactionData, 'paymentBrand'),
        //         'data' => Arr::get($transactionData, 'result'),
        //         'trackable_data' => Arr::get($transactionData, 'bankAccount'),
        //     ]);
        //     // return Arr::get($transactionData, 'redirect');
        //     return Inertia::render('prepareCheckout', [
        //             'locale' => 'ar',
        //             'redirect'=>Arr::get($transactionData, 'redirect')
        //         ]);
    }
    public function prepareCheckout(Request $request)
    {
        $request->validate([
            'paymentMethod' => 'required|string',
            'amount' => 'required|integer',
        ]);
        $user = Auth::user();

        if($request->paymentMethod=="cards"){
            $request->validate([
                'paymentBrand' => 'required|string',
            ]);
          $trackable_data = [
            // 'user'=> Auth::user(),
        ];
        // $user = User::find(2);
        $amount = $request->amount;
        $brand = $request->paymentBrand; // MASTER OR MADA

        $LaravelHyperpay= new LaravelHyperpay( new GuzzleClient );
        // return $LaravelHyperpay->addRedirectUrl(route("paymentStatus"))->addBilling(new HyperPayBilling())->checkout($trackable_data, $user, $amount, $brand, $request);
        return Inertia::render('prepareCheckout', [
            'locale' => 'ar',
            'paymentBrand'=>$request->paymentBrand,
            'LaravelHyperpay'=>$LaravelHyperpay->addRedirectUrl(route("paymentStatus"))->addBilling(new HyperPayBilling())->checkout($trackable_data, $user, $amount, $brand, $request),
            'fromWallet'=>$request->fromWallet,
        ]);  
        }else if($request->paymentMethod=="bankAccount"){
        
        $bank= bankAccount::find($request->bank_id);
        $heyPerPayConfig = config('hyperpay');
            $url = "https://eu-test.oppwa.com/v1/payments";
            $data = "entityId=".$heyPerPayConfig['entityId'] .
                        "&amount=$request->amount" .
                        "&currency=".$heyPerPayConfig['currency'] .
                        "&paymentBrand=".$request->paymentBrand .
                        "&paymentType=DB" .
                        "&bankAccount.holder=$bank->holder_name" .
                        "&bankAccount.bankName=$bank->bank_name" .
                        "&bankAccount.number=$bank->account_number" .
                        "&bankAccount.bic=$bank->bic" .
                        "&bankAccount.iban=$bank->iban" .
                        "&bankAccount.country=$bank->country" .
                        "&shopperResultUrl=".route("paymentStatus").
                        "&testMode=EXTERNAL";
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, $url);
            curl_setopt($ch, CURLOPT_HTTPHEADER, array(
                           'Authorization:Bearer OGE4Mjk0MTc0YjdlY2IyODAxNGI5Njk5MjIwMDE1Y2N8c3k2S0pzVDg='));
            curl_setopt($ch, CURLOPT_POST, 1);
            curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
            curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);// this should be set to true in production
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            $responseData = curl_exec($ch);
            if(curl_errno($ch)) {
                return curl_error($ch);
            }
            curl_close($ch);
            $transactionData= (array) json_decode((string) $responseData, true) ;
            // return $transactionData;
            $transaction = $user->HyperpayTransactions()->where('status', 'pending')->whereBrand($transactionData['paymentBrand'])->first();
            if ($transaction) {
                $transaction->delete();
            }
            $transaction = $user->HyperpayTransactions()->create([
                'id' => Arr::get($transactionData, 'id'),
                $user->getForeignKey() => $user->id,
                'checkout_id' => Arr::get($transactionData, 'id'),
                'status' => 'pending',
                'amount' => Arr::get($transactionData, 'amount'),
                'currency' => Arr::get($transactionData, 'currency'),
                'brand' =>  Arr::get($transactionData, 'paymentBrand'),
                'data' => Arr::get($transactionData, 'result'),
                'trackable_data' => Arr::get($transactionData, 'bankAccount'),
            ]);
            $redirect= Arr::get($transactionData, 'redirect');
            
    }
    }
    public function paymentStatus(Request $request)
    {
        $resourcePath = $request->get('resourcePath');
        $checkout_id = $request->get('id');
        $LaravelHyperpay= new LaravelHyperpay( new GuzzleClient );
        // return $LaravelHyperpay->paymentStatus($resourcePath, $checkout_id);
        $data=(array)$LaravelHyperpay->paymentStatus($resourcePath, $checkout_id);
        $tran=(array)$data["original"];
        if($tran["status"]==200){
            $user = Auth::user();
            $user->deposit($tran["amount"],["type"=>"user_deposit","description" =>""]);
            $tarnsactionData=[
                        
                'type' => "user_deposit",
                'amount' => $tran["amount"],
                'property' =>null
            ];
            $user->notify(new InvoiceTransaction($tarnsactionData));
        }
        
        return Inertia::render('confirmDeposit', [
            'locale' => 'ar',
            'data'=>$data["exception"]==null?$data["original"]:$data["exception"],
            'status'=>$tran["status"],
            // 'status'=>200
        ]);
    }
    public function paymentStatusEP(Request $request)
    {
        $resourcePath = $request->get('resourcePath');
        $checkout_id = $request->get('id');
        $LaravelHyperpay= new LaravelHyperpay( new GuzzleClient );
        // return $LaravelHyperpay->paymentStatus($resourcePath, $checkout_id);
        $data=(array)$LaravelHyperpay->paymentStatus($resourcePath, $checkout_id);
        return $data["exception"]==null?$data["original"]:$data["exception"];
        
    }
    public function addBankAccount(Request $request){
        $request->validate([
            'full_name' => 'required|string',
            'bank_name' => 'required|string',
            'branch_name' => 'required|string',
            'country' => 'required|string',
            'inter_code' => 'required|string',
            'iban' => 'required|string',
            'acc_number' => 'required|integer',
        ]);
         bankAccount::create([
            "holder_id" => Auth::user()->id,
            "holder_name" => $request->full_name,
            "bank_name" => $request->bank_name,
            "branch_name" => $request->branch_name,
            "country" => $request->country,
            "swift_bic_code" => $request->inter_code,
            "iban" => $request->iban,
            "account_number" => $request->acc_number,
        ]);
        return redirect()->back()->with('success', 'saved successfully');
    }
    public function bankAccountActivate($id){
        $account=bankAccount::find($id);
        $account->active=1;
        $account->save();
        return redirect()->back()->with('success', 'saved successfully');

    }
    public function bankAccountDeactivate($id){
        $account=bankAccount::find($id);
        $account->active=0;
        $account->save();
        return redirect()->back()->with('success', 'saved successfully');

    }
    public function bankAccountDelete($id){
        $account=bankAccount::find($id);
        $account->delete();
        return redirect()->back()->with('success', 'saved successfully');

    }
} 