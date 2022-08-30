<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
use App\Models\ProfileMenu;
use App\Models\SideMenu;
use App\Models\User;
class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return string|null
     */
    public function version(Request $request)
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function share(Request $request)
    {
        $user=$request->user();
        return array_merge(parent::share($request), [
            'auth' => [
                'user' => $request->user(),
                'notifications'=>$user?$user->notifications->sortBy('pinned'):null
                // 'notifications'=>User::find($request->user()->id)->notifications
            ],
            'flash' => function () use ($request) {
                return [
                    'success' => $request->session()->get('success'),
                ];
            },
            'menu' => [
                'profile' => ProfileMenu::all(),
                'side'=>SideMenu::all()
            ],
        ]);
    }
}
