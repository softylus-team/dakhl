<?php

namespace App\Http\Controllers;
use App\Models\our_partners;
use App\Models\about_us;
use App\Models\how_we_work;
use App\Models\HomepageReview;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\User;

class SectionsController extends Controller
{
    public function index($locale='ar')
    {
        // $user = Auth::user();
        $reviews=HomepageReview::all();
        foreach ($reviews as $review) {
            $user=User::find($review->author_id);
            $review["author_photo"]=$user->photo_path;
            $review["author_name"]=$user->first_name." ".$user->last_name;
        }
        return Inertia::render('SectionsData', [
            'Partners' => our_partners::all(),
            'Reviews'=>$reviews,
            'Aboutus'=>about_us::all(),
            'locale'=>$locale,

        ]);
    }
    public function addPartner(Request $request){

        $request->validate([
            'name_en' => 'string|max:255',
            'name_ar' => 'string|max:255',
        ]);
        $files = $request->file('logo');
        // print_r($files);
        if($files){
        $logo='';
                foreach ($files as $picture) {
                    $filename = $picture->getClientOriginalName();
                    $extension = $picture->getClientOriginalExtension();
                    $pic = date('His') . '-' . $filename;
                    //move image to public/img folder
                    $picture->move(public_path('logos'), $pic);
                    $logo="/logos/" . $pic;
                }
            $partner=our_partners::create(
            [
                'name_en' => $request->name_en,
                'name_ar' => $request->name_ar,
                'logo' =>$logo
            ]
            );
            if($partner){
                return redirect()->back()->with('success', 'Saved successfully');
            }else{
                return redirect()->back()->with('success', 'Something went wrong try again');
            }
        }else{
            return redirect()->back()->with('success', 'The logo is required');
        }
        
        
        

    
    }
    public function deletePartner($id){
        $deleted=our_partners::find($id)->delete();
        if($deleted){
            return redirect()->back()->with('success', 'Deleted successfully');
        }else{
            return redirect()->back()->with('success', 'Something went wrong try again');
        }
    }

    public function addReview(Request $request){
        $request->validate([
            'author_id' => 'integer',
            'rating' => 'string|max:255',
            'message' => 'string|max:255',
        ]);
       
            $review=HomepageReview::create(
            [
                'author_id' => $request->author_id,
                'rating' => $request->rating,
                'message' =>$request->message
            ]
            );
            if($review){
                return redirect()->back()->with('success', 'Added successfully');
            }else{
                return redirect()->back()->with('success', 'Something went wrong try again');
            }
       
    }
    public function approveReview($id){
        $review=HomepageReview::find($id);
            if($review){
                $review->approved=1;
                $review->save();
                return redirect()->back()->with('success', 'Approved successfully');
            }
                return redirect()->back()->with('success', 'Something went wrong try again');
            
    }
    public function deleteReview($id){
        $deleted=HomepageReview::find($id)->delete();
        if($deleted){
            return redirect()->back()->with('success', 'Deleted successfully');
        }else{
            return redirect()->back()->with('success', 'Something went wrong try again');
        }
    }
    public function updateAboutus(Request $request){
        $id=$request->itemid;
        print_r($request->itemid);

        if ($id!=null) {
            $about_us=about_us::find($id);
            // print_r($request['title_ar'.$id]);
            $about_us->title_ar=$request['title_ar'.$id];
            $about_us->title_en=$request['title_en'.$id];
            $about_us->description_ar=$request['description_ar'.$id];
            $about_us->description_en=$request['description_en'.$id];
            $files = $request->file('icon'.$id);
            if ($files) {
                $logo='';
                foreach ($files as $picture) {
                    $filename = $picture->getClientOriginalName();
                    $extension = $picture->getClientOriginalExtension();
                    $pic = date('His') . '-' . $filename;
                    //move image to public/img folder
                    $picture->move(public_path('logos'), $pic);
                    $logo="/appIcons/" . $pic;
                }
                $about_us->icon=$logo;
            }
            $about_us->save();
            // return redirect()->back()->with('success', 'Saved successfully');
        }
        // return redirect()->back()->with('success', 'something went wrong');

    }
    function aboutUs(){
        return about_us::all();
    }
    function howWeWork(){
        return how_we_work::all();
    }
}
