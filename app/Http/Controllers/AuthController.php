<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\General_questions;
use Illuminate\Support\Facades\DB;
use Twilio\Rest\Client;
use Illuminate\Support\Facades\Auth;


class AuthController extends Controller
{
    //
    /**
     * Create a new user instance after a valid registration.
     *
     * @param  array  $data
     * @return \App\User
     */
    protected function create(Request $request)
    {

        $phoneNumper=DB::select("SELECT * FROM users where phone = $request->phone" );
        if(count($phoneNumper)==0){
            return response()->json([
                'status' => 'not exist',
            ]);
        }
        /* Get credentials from .env */
        $token = getenv("TWILIO_AUTH_TOKEN");
        $twilio_sid = getenv("TWILIO_SID");
        $twilio_verify_sid = getenv("TWILIO_VERIFY_SID");
        $twilio = new Client($twilio_sid, $token);
        $twilio->verify->v2->services($twilio_verify_sid)
            ->verifications
            ->create($request->phone, "sms");
        
        return response()->json([
            'status' => 'watting',
        ]);
    }
    protected function verify(Request $request)
    {
        $data = $request->validate([
            'verification_code' => ['required', 'numeric'],
            'phone' => ['required', 'string'],
        ]);
        /* Get credentials from .env */
        $token = getenv("TWILIO_AUTH_TOKEN");
        $twilio_sid = getenv("TWILIO_SID");
        $twilio_verify_sid = getenv("TWILIO_VERIFY_SID");
        $twilio = new Client($twilio_sid, $token);
        $verification = $twilio->verify->v2->services($twilio_verify_sid)
            ->verificationChecks
            ->create([
                         'To' => $data['phone'],
                        'Code' =>$data['verification_code']
                    ]);
        if ($verification->valid) {
            $user = tap(User::where('phone', $data['phone']))->update(['isVerified' => true]);
            /* Authenticate user */
            Auth::login($user->first());
            $request->session()->regenerate();
            $user=$request->user();
            $user->tokens()->delete();
            $user->createToken($data['phone']);
            $token = DB::table('personal_access_tokens')->where('tokenable_id', $user->id)->first();
            $user['token'] =$token->token;
            return $user;
        }
        return response()->json([
            'status' => 'Invalid OTP',
        ]);
      
    }

    protected function infouserEP(Request $request,$id)
    {
        $infoUser =$request->validate([
            'marital_status'=>[  'string'],
            'number_of_family_members'=>[  'numeric'],
            'educational_level'=>[  'string'],
            'email'=>[  'string'],
            'phone'=>['string'],
            'annual_income'=>[  'string'],
            'net_worth'=>[  'string'],
            'question1'=>[  'numeric'],
            'question2'=>[  'numeric'],
            'question3'=>[  'numeric'],
            'question4'=>[  'numeric'],
            'question5'=>[  'numeric'],
            'question6'=>[  'numeric'],
        ]);

        $info = General_questions::create([
            'user_id'=>$id,
            'marital_status' => $request->marital_status,
            'number_of_family_members' => $request->number_of_family_members,
            'educational_level' => $request->educational_level,
            'email' => $request->email,
            'phone' => $request->phone,
            'annual_income' => $request->annual_income,
            'net_worth' => $request->net_worth,
            'question1' => $request->question1,
            'question2' => $request->question2,
            'question3' => $request->question3,
            'question4' => $request->question4,
            'question5' => $request->question5,
            'question6' => $request->question6,
        ]);
        User::where('id', $id)->update(['status' => "pending"]);

        return response()->json([
            'status' => 'Done',
        ]);
    }
    protected function fetchAnswer(Request $request)
    {

        $General_questions = General_questions::where('user_id',$request->user_id)->get();

        return $General_questions[0];
    }
}
