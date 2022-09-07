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
        // $request->validate([
        //     'first_name' => 'required|string|max:255',
        //     'last_name' => 'required|string|max:255',
        //     'birth_date' => 'date',
        //     'gender' => 'string',
        //     'phone' => 'string',
        //     'email' => 'required|string|email|max:255|unique:users',
        //     'password' => ['required', 'confirmed', Rules\Password::defaults()],
        //     // 'photo' => 'mimes:png,jpeg,jpg,gif,svg'

        // ]);
        $files = $request->file('photo');
        // print_r($files);
$photo='/profiles/defaultProfile.png';
        if ($files) {
            foreach ($files as $picture) {

                $filename = $picture->getClientOriginalName();
        $extension = $picture->getClientOriginalExtension();
                $pic = date('His') . '-' . $filename;
                //move image to public/img folder
                $picture->move(public_path('profiles'), $pic);
                $photo="/profiles/" . $pic;

            }
            
        }
// print_r($photo);
        $user = User::create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'birth_date' => $request->birth_date,
            'gender' => $request->gender,
            'phone' => $request->phone,
            'email' => $request->email,
            'photo_path'=>$photo,
            'password' => Hash::make($request->password),
        ]);
        

        event(new Registered($user));

        Auth::login($user);

        // return redirect(RouteServiceProvider::HOME);
        return redirect(route('dashboard'));
    }

    public function ApiRegister(Request $request)
    {
        $request->validate([
            'phone' => ['string'],
            'email' => ['required'],
            'birth_date' => ['date'],
            'national_id' => ['string'],
            'password' => ['required'],
        ]);
        // return "fff";

        $user = User::create([
            'first_name'=>"first_name",
            'last_name'=>"last_name",
            'photo_path'=>"photo_path",
            'role'=>"role",
            'phone' => $request->phone,
            'email' => $request->email,
            'birth_date' => $request->birth_date,
            'national_id' => $request->national_id,
            'password' => Hash::make($request->password),
        ]);
        
        // $files = $request->file('photo');
        // print_r($files);
            // $photo='/profiles/defaultProfile.png';
        
        // if($request->photo_path){
        //     $photo=$request->photo_path;

        // }
        // if ($files) {
        //     foreach ($files as $picture) {

        //         $filename = $picture->getClientOriginalName();
        // $extension = $picture->getClientOriginalExtension();
        //         $pic = date('His') . '-' . $filename;
        //         //move image to public/img folder
        //         $picture->move(public_path('profiles'), $pic);
        //         $photo="/profiles/" . $pic;

        //     }
        // }
// print_r($photo);

        event(new Registered($user));

        Auth::login($user);

        $user->createToken($request->email);
        $token = DB::table('personal_access_tokens')->where('tokenable_id', $user->id)->first();
        $user['token'] =$token->token;
        return $user;
    }
}
