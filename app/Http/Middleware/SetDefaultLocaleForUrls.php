<?php
 
namespace App\Http\Middleware;
 
use Closure;
use Illuminate\Support\Facades\URL;
 
class SetDefaultLocaleForUrls
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return \Illuminate\Http\Response
     */
    public function handle($request, Closure $next)
    {
        URL::defaults(['locale' => 'ar']);
 
        return $next($request);
    }
}