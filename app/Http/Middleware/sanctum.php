<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;
use App\Models\User;
use Carbon\Carbon;

class Sanctum
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        $bearer = $request->bearerToken();
        if ($token = DB::table('personal_access_tokens')->where('token', $bearer)->first()) {
            // return User::find($token->tokenable_id);
            if ($user = User::find($token->tokenable_id)) {
                // return $user;
                Auth::login($user);
                $request["user_id"]=$user->id;
                DB::table('personal_access_tokens')->where('token', $bearer)->update(array(
                    'last_used_at'=> Carbon::now()->toDateTimeString()));
                return $next($request);
            }
        }

        return response()->json([
            'success' => false,
            'error' => 'Access denied.',
        ]);
    }
}
