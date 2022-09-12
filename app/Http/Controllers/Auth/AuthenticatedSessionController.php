<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Providers\RouteServiceProvider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use Twilio\Rest\Client;
use Illuminate\Http\RedirectResponse;



class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     *
     * @return \Inertia\Response
     */
    public function loginbyPhoneNumber($locale='ar')
    {
        return Inertia::render('Login', [
            'status' => session('status'),
            'locale'=>$locale,

        ]);
    }

    protected function createLoginOTP(Request $request,$locale='ar')
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

            return Inertia::render('LoginVerify', [
                'phone' =>$request->phone,
                'locale'=>$locale,
    
            ]);
    }
    protected function VerifyOTP(Request $request,$locale='ar')
    {
        // $data = $request->validate([
        //     'verification_code' => ['required', 'numeric'],
        //     'phone' => ['required', 'string'],
        // ]);

        // /* Get credentials from .env */
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
        //     $user=DB::select("SELECT * FROM users where phone = $request->phone" );
        //     $idUser= $user[0]->id;
        //     $userFind = User::find($idUser);
        //     Auth::login($userFind);
            return redirect()->route('/');
        //     // return redirect(route('dashboard'));
        // }
        // return Inertia::render('/Login', [
        //     'locale'=>$locale,
        //     'status' => session('status'),
        // ]);
      
    }
    protected function LoginOTPResend(Request $request,$locale='ar')
    {
        $phoneNumper=DB::select("SELECT * FROM users where phone = $request->phone" );
        if(count($phoneNumper)==0){
            return route('login');
        }
        /* Get credentials from .env */
        $token = getenv("TWILIO_AUTH_TOKEN");
        $twilio_sid = getenv("TWILIO_SID");
        $twilio_verify_sid = getenv("TWILIO_VERIFY_SID");
        $twilio = new Client($twilio_sid, $token);
        $twilio->verify->v2->services($twilio_verify_sid)
            ->verifications
            ->create($request->phone, "sms");

        return Inertia::render('LoginVerify', [
            'phone' =>$request->phone,
            'locale'=>$locale,

        ]);
      
    }
    /**
     * Handle an incoming authentication request.
     *
     * @param  \App\Http\Requests\Auth\LoginRequest  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(LoginRequest $request)
    {
        $request->authenticate();

        $request->session()->regenerate();

        // return redirect()->intended(RouteServiceProvider::HOME);
        return redirect(route('dashboard'));
    }

    /**
     * Destroy an authenticated session.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy(Request $request)
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }
    /**
         * Handle an incoming API authentication request.
         *
         * @param  \App\Http\Requests\Auth\LoginRequest  $request
         * @return \Illuminate\Http\RedirectResponse
         */
    public function ApiAuth(LoginRequest $request)
    {
        
        $request->authenticate();
        $request->session()->regenerate();
        $user=$request->user();
        $user->tokens()->delete();
        $user->createToken($request->email);
        $token = DB::table('personal_access_tokens')->where('tokenable_id', $user->id)->first();
        $user['token'] =$token->token;
        return $user;
    }
    public function ApiAuthDestroy(Request $request)
    {
        $bearer = $request->bearerToken();
        if ($token = DB::table('personal_access_tokens')->where('token', $bearer)->first()) {
            // return User::find($token->tokenable_id);
            if ($user = User::find($token->tokenable_id)) {
                // return $user;
                Auth::logout();
                $request->session()->invalidate();
                $request->session()->regenerateToken();
                $user->tokens()->delete();
                return response()->json([
                    'success' => true,
                ]);
            }
        }
        
        return response()->json([
            'success' => false,
            'error' => 'Logout failed.',
        ]);
    }
}
