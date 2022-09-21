<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use Twilio\Rest\Client;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     *
     * @return \Illuminate\View\View
     */
    public function create($locale='ar')
    {
        return Inertia::render('Auth/Register',[
            'locale'=>$locale,
            'status' => session('status'),

        ]);
    }
    protected function createRegisterOTP(Request $request,$locale='ar')
    {

        // $phoneNumper=DB::select("SELECT * FROM users where phone = $request->phone" );
        // // return $phoneNumper;
        // if(count($phoneNumper)>0){
        //     return redirect()->route('phoneNumberLogin');
        // }
        // /* Get credentials from .env */
        // $token = getenv("TWILIO_AUTH_TOKEN");
        // $twilio_sid = getenv("TWILIO_SID");
        // $twilio_verify_sid = getenv("TWILIO_VERIFY_SID");
        // $twilio = new Client($twilio_sid, $token);
        // $twilio->verify->v2->services($twilio_verify_sid)
        //     ->verifications
        //     ->create($request->phone, "sms");
        return Inertia::render('Auth/RegisterVerify', [
                'phone' =>$request->phone,
                'locale'=>$locale,
        ]);
    }

    protected function RegisterVerifyOTP(Request $request,$locale='ar')
    {
        // return $request;
        // $data = $request->validate([
        //     'verification_code' => ['required', 'numeric'],
        //     'phone' => ['required', 'string'],
        // ]);

        /* Get credentials from .env */
        // $token = getenv("TWILIO_AUTH_TOKEN");
        // $twilio_sid = getenv("TWILIO_SID");
        // $twilio_verify_sid = getenv("TWILIO_VERIFY_SID");
        // $twilio = new Client($twilio_sid, $token);
        // $verification = $twilio->verify->v2->services($twilio_verify_sid)
        //     ->verificationChecks
        //     ->create([
        //                  'To' => $data['phone'],
        //                 'Code' =>$data['verification_code']
        //             ]);
        // if ($verification->valid) {
        //     // return $request;
            return Inertia::render('Auth/RegisterEmail', [
                'phone' =>$request->phone,
                'locale'=>$locale,
        ]);
            // return redirect()->route('/');
            // return redirect(route('dashboard'));
        // }
        // return Inertia::render('/Login', [
        //     'locale'=>$locale,
        //     'status' => session('status'),
        // ]);
      
    }

    protected function RegisterOTPResend(Request $request,$locale='ar')
    {
        // $phoneNumper=DB::select("SELECT * FROM users where phone = $request->phone" );
        // if(count($phoneNumper)==0){
        //     return route('login');
        // }
        // /* Get credentials from .env */
        // $token = getenv("TWILIO_AUTH_TOKEN");
        // $twilio_sid = getenv("TWILIO_SID");
        // $twilio_verify_sid = getenv("TWILIO_VERIFY_SID");
        // $twilio = new Client($twilio_sid, $token);
        // $twilio->verify->v2->services($twilio_verify_sid)
        //     ->verifications
        //     ->create($request->phone, "sms");

            return Inertia::render('Auth/RegisterVerify', [
                'phone' =>$request->phone,
                'locale'=>$locale,
        ]);
      
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
        
        // return $request;
        $request->validate([
            // 'first_name' => 'required|string|max:255',
            // 'last_name' => 'required|string|max:255',
            // 'gender' => 'string',
            'birth_date' => 'date',
            'email' => 'string|email|max:255|unique:users',
            'national_id' => 'integer',

        ]);

        // print_r($files);
        // $photo='/profiles/defaultProfile.png';
        // if ($files) {
        //     foreach ($files as $picture) {

        //         $filename = $picture->getClientOriginalName();
        //         $extension = $picture->getClientOriginalExtension();
        //         $pic = date('His') . '-' . $filename;
        //         //move image to public/img folder
        //         $picture->move(public_path('profiles'), $pic);
        //         $photo="/profiles/" . $pic;

        //     }
            
        // }

        // return "hghghghghghghghghghg";

        $user = User::create([
            // 'first_name' => $request->first_name,
            // 'last_name' => $request->last_name,
            // 'gender' => $request->gender,
            // 'photo_path'=>$photo,
            'birth_date' => $request->birth_date,
            'phone' => $request->phone,
            'email' => $request->email,
            'national_id' => $request->Identification,
        ]);
        // return $user;
        
        event(new Registered($user));

        Auth::login($user);

        // return redirect(RouteServiceProvider::HOME);
        return redirect(route('dashboard'));
    }


    // Register API function
    protected function createEP(Request $request)
    {

        $request->validate([
            'phone' => ['string','required']
        ]);

        $phoneNumper=DB::select("SELECT * FROM users where phone = $request->phone" );
        if(count($phoneNumper)==0){
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
        
        return response()->json([
            'status' => 'phone number is exist',
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
            return response()->json([
                'status' => 'verified',
            ]);
        }
        return response()->json([
            'status' => 'Invalid OTP',
        ]);
      
    }
    public function ApiRegister(Request $request)
    {
        $request->validate([
            'phone' => ['string'],
            'email' => ['required'],
            'birth_date' => ['date'],
            'national_id' => ['string'],
        ]);


        $user = User::create([
            'first_name'=>"first_name",
            'last_name'=>"last_name",
            'photo_path'=>"photo_path",
            'role'=>"role",
            'phone' => $request->phone,
            'email' => $request->email,
            'birth_date' => $request->birth_date,
            'national_id' => $request->national_id,
        ]);

        event(new Registered($user));
        Auth::login($user);
        $user->createToken($request->email);
        $token = DB::table('personal_access_tokens')->where('tokenable_id', $user->id)->first();
        $user['token'] =$token->token;
        return $user;
    }
}
