<?php

namespace App\Http\Controllers;

use App\Billing\HyperPayBilling;
use App\Exports\InvestmentsExport;
use App\Facades\LaravelHyperpay;
use App\Models\Contract;
use App\Models\FinancialPlan;
use App\Models\Investment;
use App\Models\Properties;
use App\Models\Stake;
use App\Models\User;
use App\Notifications\InvoiceTransaction;
use GuzzleHttp\Client as GuzzleClient;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ContractController extends Controller
{
    //

    public function add_investment(Request $request)
    {
        $request->validate([
            'user_id' => 'required|integer',
            'property_id' => 'required|integer',
            'amount' => 'required|integer',
            'period' => 'required|integer',
            'stake' => 'required|integer',
        ]);
        $user = User::find($request->user_id);
        $financialPlan = FinancialPlan::where("property_id", $request->property_id)->first();
        $property = Properties::find($request->property_id);
        if ($user->balance >= $request->amount) {
            if ($financialPlan->minimum_investment <= $request->amount) {
                $stake = Stake::find($request->stake);
                Investment::create([
                    "contract_id" => $stake->contract_id,
                    "stake_id" => $stake->id,
                    "amount" => $request['amount'],
                    "period" => $request['period'],
                ]);
                $user->withdraw($request->amount, ["property" => $property->name, "type" => "invest"]);
                $stake->value = $stake->value + $request->amount;
                $stake->save();
                $tarnsactionData = [

                    'type' => "invest",
                    'amount' => $request->amount,
                    'property' => $property->name,
                ];
                $user->notify(new InvoiceTransaction($tarnsactionData));
                return redirect()->back()->with('success', 'your investment is added successfully');

            } else {
                return redirect()->back()->with('success', 'your investment amount (' . $request->amount . ') is below the minimum investment amount ( ' . $financialPlan->minimum_investment . ' ) for this property');
            }
        } else {
            return redirect()->back()->with('success', 'your balance is not enough');
        }

    }
    public function add_stake(Request $request, $locale = "ar")
    {
        $request->validate([
            'user_id' => 'required|integer',
            'property_id' => 'required|integer',
            'paymentMethod' => 'required|string',
            'investValue' => 'required|integer',
            // 'period' => 'required|integer',
        ]);
        $user = Auth::user();
        $property = Properties::find($request->property_id);
        if ($request->paymentMethod == "cards") {
            $request->validate([
                'paymentBrand' => 'required|string',
            ]);
            $trackable_data = [
                // 'user'=> Auth::user(),
            ];
            // $user = User::find(2);
            $amount = $request->investValue;
            $brand = $request->paymentBrand; // MASTER OR MADA
            $LaravelHyperpay = new LaravelHyperpay(new GuzzleClient);
            // return $LaravelHyperpay->addRedirectUrl(route("confirmPayment"))->addBilling(new HyperPayBilling())->checkout($trackable_data, $user, $amount, $brand, $request);
            // return $LaravelHyperpay->getData()->status;
            return Inertia::render('prepareCheckout', [
                'locale' => $locale,
                'paymentBrand' => $request->paymentBrand,
                'LaravelHyperpay' => $LaravelHyperpay->addRedirectUrl(route("confirmPayment", $request->property_id))->addBilling(new HyperPayBilling())->checkout($trackable_data, $user, $amount, $brand, $request),
            ]);
        }
        if ($request->paymentMethod == "wallet") {
            $contract = Contract::create([
                "investor_id" => $user->id,
                "property_id" => $request->property_id,
            ]);
            $stake = Stake::create([
                "owner_id" => $user->id,
                "contract_id" => $contract->id,
                "value" => $request->investValue,
                "state" => "1",
            ]);
            Investment::create([
                "contract_id" => $stake->contract_id,
                "stake_id" => $stake->id,
                "amount" => $request->investValue,
                "period" => 18,
            ]);
            $user->withdraw($request->investValue, ["property" => $property->name, "type" => "invest"]);

            $tarnsactionData = [

                'type' => "invest",
                'amount' => $request->investValue,
                'property' => $property->name,
            ];
            $user->notify(new InvoiceTransaction($tarnsactionData));
            return Inertia::render('confirmPayment', [
                'locale' => $locale,
                'data' => null,
                'status' => 200,
            ]);
        }
        // $financialPlan = FinancialPlan::where("property_id", $request->property_id)->first();
        // $property = Properties::find($request->property_id);

        // if ($user->balance >= $request->investValue) {
        //     if ($financialPlan->minimum_investment <= $request->investValue) {
        //         $contract = Contract::create([
        //             "investor_id" => $request->user_id,
        //             "property_id" => $request->property_id,
        //         ]);
        //         $stake = Stake::create([
        //             "owner_id" => $request->user_id,
        //             "contract_id" => $contract->id,
        //             "value" => $request->investValue,
        //             "state" => "0",
        //         ]);
        //         Investment::create([
        //             "contract_id" => $stake->contract_id,
        //             "stake_id" => $stake->id,
        //             "amount" => $request->investValue,
        //             "period" => 18,
        //         ]);
        //         $user->withdraw($request->investValue, ["property" => $property->name, "type" => "invest"]);
        //         $tarnsactionData = [

        //             'type' => "invest",
        //             'amount' => $request->investValue,
        //             'property' => $property->name,
        //         ];
        //         $user->notify(new InvoiceTransaction($tarnsactionData));

        //     } else {
        //         return redirect()->back()->with('success', 'your stake amount (' . $request->investValue . ') is below the minimum investment amount ( ' . $financialPlan->minimum_investment . ' ) for this property');
        //     }
        // } else {
        //     return redirect()->back()->with('success', 'your balance is not enough');
        // }

    }
    public function confirmPayment(Request $request, $property_id)
    {
        $resourcePath = $request->get('resourcePath');
        $checkout_id = $request->get('id');
        $property = Properties::find($property_id);
        $LaravelHyperpay = new LaravelHyperpay(new GuzzleClient);
        // return $LaravelHyperpay->paymentStatus($resourcePath, $checkout_id);
        $data = (array) $LaravelHyperpay->paymentStatus($resourcePath, $checkout_id);
        // return $data["exception"]==null?$data["original"]:$data["exception"];
        $tran = (array) $data["original"];
        if ($tran["status"] == 200) {
            $user = Auth::user();
            $contract = Contract::create([
                "investor_id" => $user->id,
                "property_id" => $property_id,
            ]);
            $stake = Stake::create([
                "owner_id" => $user->id,
                "contract_id" => $contract->id,
                "value" => $tran["amount"],
                "state" => "1",
            ]);
            Investment::create([
                "contract_id" => $stake->contract_id,
                "stake_id" => $stake->id,
                "amount" => $tran["amount"],
                "period" => 18,
            ]);
            // $user->withdraw($request->investValue, ["property" => $property->name, "type" => "invest"]);
            $tarnsactionData = [

                'type' => "invest",
                'amount' => $tran["amount"],
                'property' => $property->name,
            ];
            $user->notify(new InvoiceTransaction($tarnsactionData));
        }
        return Inertia::render('confirmPayment', [
            'locale' => "ar",
            'data' => $data["exception"] == null ? $data["original"] : $data["exception"],
            'status' => $tran["status"],
        ]);
    }
    public function add_investmentEP(Request $request)
    {
        // $request->validate([
        //     'user_id' => 'required|integer',
        //     'property_id' => 'required|integer',
        //     'amount' => 'required|integer',
        //     'period' => 'required|integer',
        //     'stake_id' => 'required|integer',
        // ]);
        $user = User::find($request->user_id);
        $financialPlan = FinancialPlan::where("property_id", $request->property_id)->first();
        $property = Properties::find($request->property_id);

        if ($user->balance >= $request->amount) {
            if ($financialPlan->minimum_investment <= $request->amount) {
                $stake = Stake::find($request->stake_id);
                Investment::create([
                    "contract_id" => $stake->contract_id,
                    "stake_id" => $stake->id,
                    "amount" => $request['amount'],
                    "period" => $request['period'],
                ]);
                $user->withdraw($request->amount, ["property" => $property->name, "type" => "invest"]);
                $stake->value = $stake->value + $request->amount;
                $stake->save();
                $tarnsactionData = [

                    'type' => "invest",
                    'amount' => $request->amount,
                    'property' => $property->name,
                ];
                $user->notify(new InvoiceTransaction($tarnsactionData));
                return 'your investment is added successfully';

            } else {
                return 'your investment amount (' . $request->amount . ') is below the minimum investment amount ( ' . $financialPlan->minimum_investment . ' ) for this property';
            }
        } else {
            return 'your balance is not enough';
        }

    }
    public function add_stakeEP(Request $request)
    {
        // $request->validate([
        //     'user_id' => 'required|integer',
        //     'property_id' => 'required|integer',
        //     'state' => 'required|string',
        //     'amount' => 'required|integer',
        //     'period' => 'required|integer',
        // ]);
        $user = User::find($request->user_id);
        $financialPlan = FinancialPlan::where("property_id", $request->property_id)->first();
        $property = Properties::find($request->property_id);

        // if ($user->balance >= $request->amount) {
        //     if ($financialPlan->minimum_investment <= $request->amount) {
        $contract = Contract::create([
            "investor_id" => $request->user_id,
            "property_id" => $request->property_id,
        ]);
        $stake = Stake::create([
            "owner_id" => $request->user_id,
            "contract_id" => $contract->id,
            "value" => $request->amount,
            "state" => $request->state,
        ]);
        Investment::create([
            "contract_id" => $stake->contract_id,
            "stake_id" => $stake->id,
            "amount" => $request->amount,
            "period" => $request->period,
        ]);
        if ($request->paymentMethod == "wallet") {
            $user->withdraw($request->amount, ["property" => $property->name, "type" => "invest"]);
        }
        $tarnsactionData = [

            'type' => "invest",
            'amount' => $request->amount,
            'property' => $property->name,
        ];
        $user->notify(new InvoiceTransaction($tarnsactionData));
        return 'your stake is added successfully';

        //     } else {
        //         return 'your stake amount (' . $request->amount . ') is below the minimum investment amount ( ' . $financialPlan->minimum_investment . ' ) for this property';
        //     }
        // } else {
        //     return 'your balance is not enough';
        // }

    }
    public function delete_investment_view($id, $locale = "ar")
    {
        $investment = Investment::find($id);
        $contract = Contract::find($investment->contract_id);
        return Inertia::render('Delete-investment', [
            'Property' => Properties::find($contract->property_id),
            'Investment' => $investment,
            'locale' => $locale,
        ]);
    }
    public function delete_investment(Request $request)
    {
        // $user = Auth::user();
        $investment = Investment::find($request->investment_id);
        $contract = Contract::find($investment->contract_id);
        $user = User::find($contract->investor_id);
        $property = Properties::find($contract->property_id);
        $user->deposit($investment->amount, ['property' => $property->name, 'type' => "cancel_investment"]);

        $stake = Investment::where("stake_id", $investment->stake_id)->get();
        if (count($stake) <= 1) {
            $contract->delete();
        } else {
            $investment->delete();
        }
        $tarnsactionData = [

            'type' => "cancel_investment",
            'amount' => $investment->amount,
            'property' => $property->name,
        ];
        $user->notify(new InvoiceTransaction($tarnsactionData));
        return redirect(route("myaccount", $user->id))->with('success', 'your investment is deleted successfully');
    }
    public function delete_investmentEP($investment_id)
    {
        // $user = Auth::user();
        $investment = Investment::find($investment_id);
        $contract = Contract::find($investment->contract_id);
        $user = User::find($contract->investor_id);
        $property = Properties::find($contract->property_id);
        $user->deposit($investment->amount, ['property' => $property->name, 'type' => "cancel_investment"]);
        $stake = Investment::where("stake_id", $investment->stake_id)->get();
        if (count($stake) <= 1) {
            $contract->delete();
        } else {
            $investment->delete();
        }
        $tarnsactionData = [

            'type' => "cancel_investment",
            'amount' => $investment->amount,
            'property' => $property->name,
        ];
        $user->notify(new InvoiceTransaction($tarnsactionData));
        return 'your investment is deleted successfully';
    }
    public function liquidize($id)
    {
        $investment = Investment::find($id);
        $contract = Contract::find($investment->contract_id);
        return Inertia::render('liquidize', [
            'Property' => Properties::find($contract->property_id),
            'Investment' => $investment,
        ]);
    }
    public function liquidize_investmentEP(Request $request)
    {
        $request->validate([
            'investment_id' => 'required|integer',
            'amount' => 'required|integer',
        ]);
        $user = Auth::user();
        $investment = Investment::find($request->investment_id);
        $stake = Stake::find($investment->stake_id);
        $contract = Contract::find($investment->contract_id);
        $investment->amount = $investment->amount + $request->amount;
        $stake->value = $stake->value + $request->amount;
        $property = Properties::find($contract->property_id);
        $user->withdraw($request->amount, ["property" => $property->name, "type" => "liquidize_investment"]);
        $investment->save();
        $stake->save();
        $tarnsactionData = [

            'type' => "liquidize_investment",
            'amount' => $investment->amount,
            'property' => $property->name,
        ];
        $user->notify(new InvoiceTransaction($tarnsactionData));
        return 'your investment is liquidized successfully';
    }
    public function update_investment(Request $request)
    {
        $request->validate([
            'investment_id' => 'required|integer',
            'amount' => 'required|integer',
        ]);
        $user = Auth::user();
        $investment = Investment::find($request->investment_id);
        $stake = Stake::find($investment->stake_id);
        $contract = Contract::find($investment->contract_id);
        $investment->amount = $investment->amount + $request->amount;
        $stake->value = $stake->value + $request->amount;
        $property = Properties::find($contract->property_id);
        $user->withdraw($request->amount, ["property" => $property->name, "type" => "liquidize_investment"]);
        $investment->save();
        $stake->save();
        $tarnsactionData = [

            'type' => "liquidize_investment",
            'amount' => $investment->amount,
            'property' => $property->name,
        ];
        $user->notify(new InvoiceTransaction($tarnsactionData));
        return redirect(route("myaccount", $user->id))->with('success', 'your investment is liquidized successfully');
    }
    public function export()
    {
        return new InvestmentsExport();
        // return Excel::download(new InvestmentsExport, 'investments.xlsx');
    }
}
