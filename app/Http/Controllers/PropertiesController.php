<?php

namespace App\Http\Controllers;

use App\Models\Address;
use App\Models\Amenity;
use App\Models\Attachment;
use App\Models\ConstructionReport;
use App\Models\Contract;
use App\Models\FinancialPlan;
use App\Models\Investment;
use App\Models\InvestorSavedProperty;
use App\Models\Photo;
use App\Models\Properties;
use App\Models\Review;
use App\Models\Stake;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\URL;
use App\Models\bankAccount;

class PropertiesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function invest($id, $locale = 'ar')
    {
        $user = Auth::user();
        $property = Properties::findOrFail($id);
        $savedProprties = $user ? InvestorSavedProperty::where('investor_id', $user->id)->get() : array();
        $propsIDs = array();
        foreach ($savedProprties as $savedProprty) {
            array_push($propsIDs, $savedProprty->property_id);
        }

        if (in_array($id, $propsIDs)) {
            $property['saved'] = true;
        } else {
            $property['saved'] = false;

        }
        $property['address'] = Address::where('property_id', $id)->get()->first();
        $property['amenities'] = Amenity::where('property_id', $id)->get();
        $property['reviews'] = Review::where('property_id', $id)->get();
        foreach ($property['reviews'] as $review) {
            $user = User::find($review->author_id);
            $review["author_photo"] = $user->photo_path;
            $review["author_name"] = $user->first_name . " " . $user->last_name;
        }
        $property['financialPlan'] = FinancialPlan::where('property_id', $id)->get()->first();
        $property['photos'] = Photo::where('property_id', $id)->get();
        $property['attachments'] = Attachment::where('property_id', $id)->get();
        $property['constructionReport'] = ConstructionReport::where('property_id', $id)->get();
        $contracts = Contract::where('property_id', $id)->get();
        $Cids = array();
        foreach ($contracts as $contract) {
            array_push($Cids, $contract->id);
        }
        $invested = 0;
        $property['stakes'] = Stake::whereIn('contract_id', $Cids)->get();
        foreach ($property['stakes'] as $stake) {
            $stake['investments'] = Investment::where('stake_id', $stake->id)->get();
            $invested += $stake->value;
        }
        if (!$property['financialPlan']) {
            unset($properties[$key]);
        }
        $property['expected_return'] = 20;
        $property['fund_period'] = 18;
        $property['invested'] = $invested;
        $invested_percent = ($invested / $property['financialPlan']->price) * 100;
        $property['invested_percent'] = $invested_percent;
        $user = Auth::user();
        return Inertia::render('signContracts', [
            'Property' => $property,
            'totalBalance'=>$user->balance,
            'bankAccounts'=>$user? bankAccount::where("holder_id",$user->id)->get() :null,
            'locale' => $locale,
        ]);

    }
    public function allPropertiesEP(Request $request)
    {
        $properties = Properties::filter($request)->orderBy('status', 'asc')->get();
        foreach ($properties as $key => $property) {
            $id = $property->id;
            // $propertyObj=Properties::findOrFail($id);
            $property['address'] = Address::where('property_id', $id)->get()->first();
            $property['amenities'] = Amenity::where('property_id', $id)->get();
            $property['reviews'] = Review::where('property_id', $id)->get();
            foreach ($property['reviews'] as $review) {
                $user = User::find($review->author_id);
                $review["author_photo"] = $user->photo_path;
                $review["author_name"] = $user->first_name . " " . $user->last_name;
            }
            $property['financialPlan'] = FinancialPlan::filter($request)->where('property_id', $id)->get()->first();
            $property['photos'] = Photo::where('property_id', $id)->get();
            $property['attachments'] = Attachment::where('property_id', $id)->get();
            $property['constructionReport'] = ConstructionReport::where('property_id', $id)->get();
            $contracts = Contract::where('property_id', $id)->get();
            $Cids = array();
            foreach ($contracts as $contract) {
                array_push($Cids, $contract->id);
            }
            $property['stakes'] = Stake::whereIn('contract_id', $Cids)->get();
            foreach ($property['stakes'] as $stake) {
                $stake['investments'] = Investment::where('stake_id', $stake->id)->get();
            }
            if (!$property['financialPlan']) {
                unset($properties[$key]);
            }
        }
        return $properties;

    }

    public function singlePropertyEP($id)
    {
        $propertyObj = Properties::findOrFail($id);
        $propertyObj['address'] = Address::where('property_id', $id)->get()->first();
        $propertyObj['amenities'] = Amenity::where('property_id', $id)->get();
        $propertyObj['reviews'] = Review::where('property_id', $id)->get();
        foreach ($propertyObj['reviews'] as $review) {
            $user = User::find($review->author_id);
            $review["author_photo"] = $user->photo_path;
            $review["author_name"] = $user->first_name . " " . $user->last_name;
        }
        $propertyObj['financialPlan'] = FinancialPlan::where('property_id', $id)->get()->first();
        $propertyObj['photos'] = Photo::where('property_id', $id)->get();
        $propertyObj['attachments'] = Attachment::where('property_id', $id)->get();
        $propertyObj['constructionReport'] = ConstructionReport::where('property_id', $id)->get();
        $contracts = Contract::where('property_id', $id)->get();
        $Cids = array();
        foreach ($contracts as $contract) {
            array_push($Cids, $contract->id);
        }
        $propertyObj['stakes'] = Stake::whereIn('contract_id', $Cids)->get();
        foreach ($propertyObj['stakes'] as $stake) {
            $stake['investments'] = Investment::where('stake_id', $stake->id)->get();
            $invested += $stake->value;
        }
        $propertyObj['expected_return'] = 20;
        $propertyObj['fund_period'] = 18;
        $propertyObj['invested'] = $invested;
        $invested_percent = ($invested / $propertyObj['financialPlan']->price) * 100;
        return $propertyObj;
    }

    
    public function index($locale = 'ar')
    {
        $user = Auth::user();

        $savedProprties = $user ? InvestorSavedProperty::where('investor_id', $user->id)->get() : array();
        $propsIDs = array();
        foreach ($savedProprties as $savedProprty) {
            array_push($propsIDs, $savedProprty->property_id);
        }
        $properties = Properties::all();
        foreach ($properties as $key => $property) {
            $id = $property->id;
            // $propertyObj=Properties::findOrFail($id);
            if (in_array($id, $propsIDs)) {
                $property['saved'] = true;
            } else {
                $property['saved'] = false;

            }
            $property['address'] = Address::where('property_id', $id)->get()->first();
            $property['amenities'] = Amenity::where('property_id', $id)->get();
            $property['reviews'] = Review::where('property_id', $id)->get();
            foreach ($property['reviews'] as $review) {
                $user = User::find($review->author_id);
                $review["author_photo"] = $user->photo_path;
                $review["author_name"] = $user->first_name . " " . $user->last_name;
            }
            $property['financialPlan'] = FinancialPlan::where('property_id', $id)->get()->first();
            $property['photos'] = Photo::where('property_id', $id)->get();
            $property['attachments'] = Attachment::where('property_id', $id)->get();
            $property['constructionReport'] = ConstructionReport::where('property_id', $id)->get();
            $contracts = Contract::where('property_id', $id)->get();
            $Cids = array();
            foreach ($contracts as $contract) {
                array_push($Cids, $contract->id);
            }
            $invested = 0;
            $property['stakes'] = Stake::whereIn('contract_id', $Cids)->get();
            foreach ($property['stakes'] as $stake) {
                $stake['investments'] = Investment::where('stake_id', $stake->id)->get();
                $invested += $stake->value;
            }
            if (!$property['financialPlan']) {
                unset($properties[$key]);
            }
            $property['expected_return'] = 20;
            $property['fund_period'] = 18;
            $property['invested'] = $invested;
            $invested_percent = ($invested / $property['financialPlan']->price) * 100;
            $property['invested_percent'] = $invested_percent;
        }

        return Inertia::render('Properties', [
            'Properties' => $properties,
            'savedProprties' => $propsIDs,
            'locale' => $locale,

        ]);
    }
    public function view($id, $locale = 'ar')
    {
        $user = Auth::user();
        $reviews = Review::where('property_id', $id)->get();
        foreach ($reviews as $review) {
            $user = User::find($review->author_id);
            $review["author_photo"] = $user->photo_path;
            $review["author_name"] = $user->first_name . " " . $user->last_name;
        }
        $savedProprties = $user ? InvestorSavedProperty::where('investor_id', $user->id)->get() : array();
        $propsIDs = array();
        foreach ($savedProprties as $savedProprty) {
            array_push($propsIDs, $savedProprty->property_id);
        }
        $contracts = Contract::where('property_id', $id)->get();
            $Cids = array();
            foreach ($contracts as $contract) {
                array_push($Cids, $contract->id);
            }
        $invested = 0;
            $stakes = Stake::whereIn('contract_id', $Cids)->get();
            foreach ($stakes as $stake) {
                $invested += $stake->value;
            }
            $Plan= FinancialPlan::where('property_id', $id)->get()->first();
            $invested_percent = ($invested / $Plan->price) * 100;
            $properties = Properties::all();
            foreach ($properties as $key => $property) {
                // $propertyObj=Properties::findOrFail($id);
                if (in_array($property->id, $propsIDs)) {
                    $property['saved'] = true;
                } else {
                    $property['saved'] = false;
    
                }
                $property['address'] = Address::where('property_id', $property->id)->get()->first();
                $property['amenities'] = Amenity::where('property_id', $property->id)->get();
                $property['reviews'] = Review::where('property_id', $property->id)->get();
                foreach ($property['reviews'] as $review) {
                    $user = User::find($review->author_id);
                    $review["author_photo"] = $user->photo_path;
                    $review["author_name"] = $user->first_name . " " . $user->last_name;
                }
                $property['financialPlan'] = FinancialPlan::where('property_id', $property->id)->get()->first();
                $property['photos'] = Photo::where('property_id', $property->id)->get();
                $property['attachments'] = Attachment::where('property_id', $property->id)->get();
                $property['constructionReport'] = ConstructionReport::where('property_id',  $property->id)->get();
                $contracts = Contract::where('property_id', $property->id)->get();
                $Cids = array();
                foreach ($contracts as $contract) {
                    array_push($Cids, $contract->id);
                }
                $invested = 0;
                $property['stakes'] = Stake::whereIn('contract_id', $Cids)->get();
                foreach ($property['stakes'] as $stake) {
                    $stake['investments'] = Investment::where('stake_id', $stake->id)->get();
                    $invested += $stake->value;
                }
                if (!$property['financialPlan']) {
                    unset($properties[$key]);
                }
                $property['expected_return'] = 20;
                $property['fund_period'] = 18;
                $property['invested'] = $invested;
                $invested_percent = ($invested / $property['financialPlan']->price) * 100;
                $property['invested_percent'] = $invested_percent;
            }
        return Inertia::render('Single-Property', [
            'Property' => Properties::findOrFail($id),
            'Address' => Address::where('property_id', $id)->get()->first(),
            'Plan' => $Plan,
            'Photos' => Photo::where('property_id', $id)->get(),
            'Attachments' => Attachment::where('property_id', $id)->get(),
            'Amenity' => Amenity::where('property_id', $id)->get(),
            'Reviews' => $reviews,
            'CReport' => ConstructionReport::where('property_id', $id)->get(),
            'saved' => in_array($id, $propsIDs) ? true : false,
            'expected_return' => 20,
            'fund_period' => 18,
            'invested'=> $invested,
            'invested_percent'=> $invested_percent,
            'properties'=> $properties,
            'locale' => $locale,
        ]);
    }

    public function savePropertyEP(Request $request)
    {
        $save = InvestorSavedProperty::create([
            "property_id" => $request->property_id,
            "investor_id" => $request->investor_id,
        ]);
        return $save;

    }
    public function unsavePropertyEP($proprerty_id, $user_id)
    {
        return InvestorSavedProperty::where("property_id", $proprerty_id)->where("investor_id", $user_id)->first()->delete();

    }
    public function save($id)
    {
        $user = Auth::user();
        InvestorSavedProperty::create([
            "property_id" => $id,
            "investor_id" => $user->id,
        ]);
        // return Redirect::to(URL::previous() . $id);
        return redirect()->back()->with('success', 'Property saved!!');

    }
    public function unsave($id)
    {
        $user = Auth::user();
        InvestorSavedProperty::where("property_id", $id)->where("investor_id", $user->id)->first()->delete();
        return redirect()->back()->with('success', 'Property deleted from saved properties!!');

    }
    public function add()
    { //this is the slug
        return Inertia::render('Add-Property');
    }
    public function updateView($id)
    { //this is the slug
        $reviews = Review::where('property_id', $id)->get();
        foreach ($reviews as $review) {
            $user = User::find($review->author_id);
            $review["author_photo"] = $user->photo_path;
            $review["author_name"] = $user->first_name . " " . $user->last_name;
        }
        return Inertia::render('Update-Property', [
            'Property' => Properties::findOrFail($id),
            'Address' => Address::where('property_id', $id)->orderBy('id', 'desc')->take(1)->get(),
            'Plan' => FinancialPlan::where('property_id', $id)->orderBy('id', 'desc')->take(1)->get(),
            'Photos' => Photo::where('property_id', $id)->get(),
            'Attachments' => Attachment::where('property_id', $id)->get(),
            'Amenity' => Amenity::where('property_id', $id)->get(),
            'Reviews' => $reviews,
        ]);
    }
    public function deleteView($id)
    { //this is the slug
        return Inertia::render('Delete-Property', [
            'Property' => Properties::findOrFail($id),
        ]);
    }
    public function addPhotos(Request $request)
    { //this is the slug
        $files = $request->file('picture');
        // print_r($files);
        foreach ($files as $key => $pictures) {
            foreach ($pictures as $picture) {
                $filename = $picture->getClientOriginalName();
                $extension = $picture->getClientOriginalExtension();
                $pic = date('His') . '-' . $filename;
                //move image to public/img folder
                $picture->move(public_path('images'), $pic);
                Photo::create([
                    "property_id" => $request->id,
                    "photo_name" => $pic,
                    "photo_path" => "/images/" . $pic,
                ]);
            }

        }

        // return $Property->id;
        return redirect(route('viewproperty', $request->id));
    }
    public function photoDelete(Request $request)
    {
        $request->validate([
            'id' => 'required|integer',
            'picid' => 'required|integer',
        ]);
        $Photos = Photo::find($request->picid);
        $Photos->delete();
        return redirect(route('viewproperty', $request->id));
    }
    public function addattachs(Request $request)
    { //this is the slug
        $attach = $request->file('attach');
        // print_r($files);
        if ($attach) {
            foreach ($attach as $key => $attachments) {
                foreach ($attachments as $attachment) {
                    $filename = $attachment->getClientOriginalName();
                    $extension = $attachment->getClientOriginalExtension();
                    $pic = date('His') . '-' . $filename;
                    //move image to public/img folder
                    $attachment->move(public_path('attachments'), $pic);
                    Attachment::create([
                        "property_id" => $request->id,
                        "attach_name" => $pic,
                        "attach_path" => "/attachments/" . $pic,
                    ]);
                }

            }
        }

        // return $Property->id;
        return redirect(route('viewproperty', $request->id));
    }
    public function attachDelete(Request $request)
    {
        $request->validate([
            'id' => 'required|integer',
            'attachid' => 'required|integer',
        ]);
        $attach = Photo::find($request->attachid);
        $attach->delete();
        return redirect(route('viewproperty', $request->id));
    }
    public function AmenityDelete(Request $request)
    {
        $request->validate([
            'id' => 'required|integer',
            'amenity_id' => 'required|integer',
        ]);
        $Amenity = Amenity::find($request->amenity_id);
        $Amenity->delete();
        return redirect(route('Update-Property', $request->id));
    }
    public function AmenityUpdate(Request $request)
    {
        $request->validate([
            'id' => 'required|integer',
            'amenity_id' => 'required|integer',
        ]);

        $update = Amenity::updateOrCreate([
            'id' => $request->amenity_id,
            "property_id" => $request->id,
        ], [
            "property_id" => $request->id,
            "amenity_name" => $request['amenity_name' . $request->amenity_id],
            "amenity_type" => $request['amenity_type' . $request->amenity_id],
            "amenity_description" => $request['amenity_description' . $request->amenity_id],
        ]);

        //    print_r($update);

        return redirect(route('Update-Property', $request->id));
    }
    public function AmenitySave(Request $request)
    {
        $request->validate([
            'id' => 'required|integer',
            'amenity_suffix' => 'required|string',
        ]);

        Amenity::create([
            "property_id" => $request->id,
            "amenity_name" => $request['amenity_name' . $request->amenity_suffix],
            "amenity_type" => $request['amenity_type' . $request->amenity_suffix],
            "amenity_description" => $request['amenity_description' . $request->amenity_suffix],
        ]);

        return redirect(route('Update-Property', $request->id));
    }
    public function ReviewDelete(Request $request)
    {
        $request->validate([
            'property_id' => 'required|integer',
            'review_id' => 'required|integer',
        ]);
        $Review = Review::find($request->review_id);
        $Review->delete();
        return redirect(route('Single-Property', $request->property_id));
    }
    public function ReviewUpdate(Request $request)
    {
        $request->validate([
            'id' => 'required|integer',
            'review_id' => 'required|integer',
        ]);

        $update = Review::updateOrCreate([
            'id' => $request->Review_id,
            "property_id" => $request->id,
        ], [
            "property_id" => $request->id,
            "author_id" => $request['author_id'],
            "rating" => $request['rating'],
            "message" => $request['message'],
        ]);

        //    print_r($update);

        return redirect(route('Update-Property', $request->id));
    }
    public function ReviewSave(Request $request)
    {
        $request->validate([
            'property_id' => 'required|integer',
        ]);

        Review::create([
            "property_id" => $request->id,
            "author_id" => $request['author_id'],
            "rating" => $request['rating'],
            "message" => $request['message'],
        ]);

        return redirect(route('Single-Property', $request->property_id));
    }
    // /**
    //  * Show the form for creating a new resource.
    //  *
    //  * @return \Illuminate\Http\Response
    //  */
    // public function create()
    // {
    //     //
    // }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StorePropertiesRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'required|string|max:255',
            'bedrooms' => 'required|integer|digits_between:0,10',
            'status' => 'required|string',
            'nighborhood' => 'required|string',
            'bulding_name' => 'required|string|max:255',
            'community_name' => 'required|string|max:255',
            'description' => 'required|string|max:255',
            "country" => 'required|string|max:255',
            "state" => 'required|string|max:255',
            "city" => 'required|string|max:255',
            "street_name" => 'required|string|max:255',
            "zip_code" => 'required|integer|digits_between:0,10',
            "longitude" => 'required|integer',
            "latitude" => 'required|integer',
            "price" => 'required|integer|digits_between:0,10',
            "minimum_investment" => 'required|integer|digits_between:0,10',
            "progress" => 'required|integer|max:100',
            "report_description" => 'required|string|max:255',
        ]);

        $Property = Properties::create([
            'name' => $request->name,
            'type' => $request->type,
            'bedrooms' => $request->bedrooms,
            'status' => $request->status,
            'nighborhood' => $request->nighborhood,
            'bulding_name' => $request->bulding_name,
            'community_name' => $request->community_name,
            'description' => $request->description,
        ]);
        Address::create([
            "property_id" => $Property->id,
            "country" => $request->country,
            "state" => $request->state,
            "city" => $request->city,
            "street_name" => $request->street_name,
            "zip_code" => $request->zip_code,
            "longitude" => $request->longitude,
            "latitude" => $request->latitude,
        ]);
        FinancialPlan::create([
            "property_id" => $Property->id,
            "price" => $request->price,
            "minimum_investment" => $request->minimum_investment,
        ]);
        ConstructionReport::create([
            "property_id" => $Property->id,
            "progress_percentage" => $request->progress,
            "description" => $request->report_description,
        ]);
        $files = $request->file('picture');
        // print_r($files);
        if ($files) {
            foreach ($files as $key => $pictures) {
                foreach ($pictures as $picture) {
                    $filename = $picture->getClientOriginalName();
                    $extension = $picture->getClientOriginalExtension();
                    $pic = date('His') . '-' . $filename;
                    //move image to public/img folder
                    $picture->move(public_path('images'), $pic);
                    Photo::create([
                        "property_id" => $Property->id,
                        "photo_name" => $pic,
                        "photo_path" => "/images/" . $pic,
                    ]);
                }

            }
        }
        $attach = $request->file('attach');
        // print_r($files);
        if ($attach) {
            foreach ($attach as $key => $attachments) {
                foreach ($attachments as $attachment) {
                    $filename = $attachment->getClientOriginalName();
                    $extension = $attachment->getClientOriginalExtension();
                    $pic = date('His') . '-' . $filename;
                    //move image to public/img folder
                    $attachment->move(public_path('attachments'), $pic);
                    Attachment::create([
                        "property_id" => $Property->id,
                        "attach_name" => $pic,
                        "attach_path" => "/attachments/" . $pic,
                    ]);
                }

            }
        }

        for ($i = 0; $i <= (int) $request->amenitylist; $i++) {
            if ($request['amenity_name' . $i]) {
                Amenity::create([
                    "property_id" => $Property->id,
                    "amenity_name" => $request['amenity_name' . $i],
                    "amenity_type" => $request['amenity_type' . $i],
                    "amenity_description" => $request['amenity_description' . $i],
                ]);
            }
        }
        // return $Property->id;
        return redirect(route('properties'));
    }
    public function update(Request $request)
    {
        $request->validate([
            'id' => 'required|integer',
            'name' => 'required|string|max:255',
            'type' => 'required|string|max:255',
            'bedrooms' => 'required|integer|digits_between:0,10',
            'status' => 'required|string',
            'nighborhood' => 'required|string',
            'bulding_name' => 'required|string|max:255',
            'community_name' => 'required|string|max:255',
            'description' => 'required|string|max:255',
            "country" => 'required|string|max:255',
            "state" => 'required|string|max:255',
            "city" => 'required|string|max:255',
            "street_name" => 'required|string|max:255',
            "zip_code" => 'required|integer|digits_between:0,10',
            "longitude" => 'required|integer',
            "latitude" => 'required|integer',
            "price" => 'required|integer|digits_between:0,10',
            "minimum_investment" => 'required|integer|digits_between:0,10',

        ]);
        $Property = Properties::find($request->id);
        $Property->name = $request->name;
        $Property->type = $request->type;
        $Property->bedrooms = $request->bedrooms;
        $Property->status = $request->status;
        $Property->nighborhood = $request->nighborhood;
        $Property->bulding_name = $request->bulding_name;
        $Property->community_name = $request->community_name;
        $Property->description = $request->description;

        $Property->save();
        Address::updateOrCreate(
            [
                "property_id" => $Property->id,
            ],
            [
                "property_id" => $Property->id,
                "country" => $request->country,
                "state" => $request->state,
                "city" => $request->city,
                "street_name" => $request->street_name,
                "zip_code" => $request->zip_code,
                "longitude" => $request->longitude,
                "latitude" => $request->latitude,
            ],
        );
        FinancialPlan::updateOrCreate(
            [
                "property_id" => $Property->id,
            ],
            [
                "property_id" => $Property->id,
                "price" => $request->price,
                "minimum_investment" => $request->minimum_investment,
            ]);
        for ($i = 0; $i <= (int) $request->amenitylist; $i++) {
            if ($request['amenity_name' . $i]) {
                Amenity::updateOrCreate([
                    "property_id" => $Property->id,
                    "id" => $request['amenity_id' . $i],
                ], [
                    "property_id" => $Property->id,
                    "amenity_name" => $request['amenity_name' . $i],
                    "amenity_type" => $request['amenity_type' . $i],
                    "amenity_description" => $request['amenity_description' . $i],
                ]);
            }
        }

        return redirect(route('properties'));
    }
    public function delete(Request $request)
    {
        $request->validate([
            'id' => 'required|integer',
        ]);
        $Property = Properties::find($request->id);
        $Property->delete();
        return redirect(route('properties'));
    }
    public function AddConstructionReport(Request $request)
    {
        $request->validate([
            'property_id' => 'required|integer',
            "progress" => 'required|integer|max:100',
            "report_description" => 'required|string|max:255',
        ]);

        ConstructionReport::create([
            "property_id" => $request->property_id,
            "progress_percentage" => $request->progress,
            "description" => $request->report_description,
        ]);
        // return $Property->id;
        return redirect(route('properties'));
    }
    public function getBookmarks($locale = 'ar')
    {
        $user = Auth::user();
        $savedProprties = InvestorSavedProperty::where('investor_id', $user->id)->get();
        $propsIDs = array();
        foreach ($savedProprties as $savedProprty) {
            array_push($propsIDs, $savedProprty->property_id);
        }
        $properties = Properties::wherein("id", $propsIDs)->get();
        foreach ($properties as $key => $property) {
            $id = $property->id;
            // $propertyObj=Properties::findOrFail($id);
            if (in_array($id, $propsIDs)) {
                $property['saved'] = true;
            } else {
                $property['saved'] = false;

            }
            $property['address'] = Address::where('property_id', $id)->get()->first();
            $property['amenities'] = Amenity::where('property_id', $id)->get();
            $property['reviews'] = Review::where('property_id', $id)->get();
            foreach ($property['reviews'] as $review) {
                $user = User::find($review->author_id);
                $review["author_photo"] = $user->photo_path;
                $review["author_name"] = $user->first_name . " " . $user->last_name;
            }
            $property['financialPlan'] = FinancialPlan::where('property_id', $id)->get()->first();
            $property['photos'] = Photo::where('property_id', $id)->get();
            $property['attachments'] = Attachment::where('property_id', $id)->get();
            $property['constructionReport'] = ConstructionReport::where('property_id', $id)->get();
            $contracts = Contract::where('property_id', $id)->get();
            $Cids = array();
            foreach ($contracts as $contract) {
                array_push($Cids, $contract->id);
            }
            $invested = 0;
            $property['stakes'] = Stake::whereIn('contract_id', $Cids)->get();
            foreach ($property['stakes'] as $stake) {
                $stake['investments'] = Investment::where('stake_id', $stake->id)->get();
                $invested += $stake->value;
            }
            if (!$property['financialPlan']) {
                unset($properties[$key]);
            }
            $property['expected_return'] = 20;
            $property['fund_period'] = 18;
            $property['invested'] = $invested;
            $invested_percent = ($invested / $property['financialPlan']->price) * 100;
            $property['invested_percent'] = $invested_percent;
        }
        return Inertia::render('Bookmarks', [
            'locale' => $locale,
            'properties' => $properties,
        ]);
    }
}
