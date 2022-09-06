<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
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

        // if(User::whereIn('phone',$request->phone)->get()){
            // return response()->json([
            //     // 'status' => 'not exist',
            //     // $request->phone
            //     User::findOrFail($request->phone)
            // ]);
        // }
        // else{
        //     return response()->json([
        //         'status' => 'not exist',
        //         // $request->phone
        //     ]);
        // }
        
        /* Get credentials from .env */
        $token = getenv("TWILIO_AUTH_TOKEN");
        $twilio_sid = getenv("TWILIO_SID");
        $twilio_verify_sid = getenv("TWILIO_VERIFY_SID");
        $twilio = new Client($twilio_sid, $token);
        $twilio->verify->v2->services($twilio_verify_sid)
            ->verifications
            ->create($request->phone, "sms");
        // User::create([
        //     'phone' => $data['phone'],
        // ]);
        
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
            // $request->authenticate();
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

    

}
