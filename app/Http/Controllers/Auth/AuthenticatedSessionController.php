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

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     *
     * @return \Inertia\Response
     */
    public function create($locale='ar')
    {
        return Inertia::render('Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
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
