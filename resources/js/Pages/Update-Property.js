import React, { useEffect, useState } from 'react';
import Button from '@/Components/Button';
import Authenticated from '@/Layouts/Authenticated';
import Input from '@/Components/Input';
import Textarea from '@/Components/Textarea';
import Select from '@/Components/SelectReviews';
import Label from '@/Components/Label';
import ValidationErrors from '@/Components/ValidationErrors';
import { Head, Link, useForm } from '@inertiajs/inertia-react';
import { Country, State, City } from 'country-state-city';
import CountrySelect from '@/Components/country-state-city-select';
import LocalizedStrings from 'react-localization';
import stringss from "../../strings";
export default function UpdateProperty(props) {
    const Photos = props.Photos;
    const Attachments=props.Attachments;
    const Amenities = props.Amenity;
    // const Reviews = props.Reviews;

    // console.log(Amenities.length);

    // console.log(Country.getAllCountries());
    const countries = Country.getAllCountries();
    // console.log(State.getAllStates());
    const states = State.getStatesOfCountry('JO');
    // console.log(City.getAllCities());
    const cities = City.getCitiesOfCountry('JO');
    // console.log(props.Address);
    var formobject={
        id: props.Property.id,
        name: props.Property.name,
        type: props.Property.type,
        risk_level: props.Property.risk_level,
        bedrooms: props.Property.bedrooms,
        status: props.Property.status,
        nighborhood: props.Property.nighborhood,
        bulding_name: props.Property.bulding_name,
        community_name: props.Property.community_name,
        description: props.Property.description,
        country: props.Address[0].country,
        state: props.Address[0].state,
        city: props.Address[0].city,
        street_name: props.Address[0].street_name,
        zip_code: props.Address[0].zip_code,
        longitude: props.Address[0].longitude,
        latitude: props.Address[0].latitude,
        price: props.Plan[0].price,
        stakes_limit: props.Property.stakes_limit,
        available_days: props.Property.available_days,
        minimum_investment: props.Plan[0].minimum_investment,
        picture: '',
        attach: '',
        picid: '',
        attachid: '',
        amenity_id: '',
        amenitylist: '',
    };
    const { data, setData, post, processing, errors, reset } = useForm(formobject);
    

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'file' ? event.target.files : event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('updateproperty'));
    };
    const photoSubmit = (e) => {
        e.preventDefault();

        post(route('addphotos'));
    };
    const attachSubmit = (e) => {
        e.preventDefault();

        post(route('addattachs'));
    };
    const photoDelete = (e) => {
        e.preventDefault();

        post(route('photodelete'));
    };
    const attachDelete = (e) => {
        e.preventDefault();

        post(route('attachdelete'));
    };
    const AmenityDeleteUpdate = (e) => {
        e.preventDefault();
        if (e.nativeEvent.submitter.name == "update") {
            post(route('amenityupdate'));
            // location.reload();
        }
        if (e.nativeEvent.submitter.name == "delete") {
            post(route('amenitydelete'));
            // location.reload();
        }
        if (e.nativeEvent.submitter.name == "save") {
            post(route('amenitysave'));
            location.reload();
        }
    };
    const [AmenityList, setInputList] = useState([]);
    function getRandomString(length) {
        var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var result = '';
        for ( var i = 0; i < length; i++ ) {
            result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
        }
        return result;
    }
    const Amenity = () => {
        var iddsfs=getRandomString(5);
        formobject['amenity_suffix'] = iddsfs;
        formobject[`amenity_name${iddsfs}`] = '';
        formobject[`amenity_type${iddsfs}`] = '';
        formobject[`amenity_description${iddsfs}`] = '';
        // console.log(formobject['amenity_suffix']);
        
        data['amenity_suffix']=iddsfs;
    
        return (
            <form onSubmit={AmenityDeleteUpdate}>
                <ValidationErrors errors={errors} />
                <h6>{AmenityList.length + Amenities.length + 1}</h6>
                <div className="mt-4">
                    <Label forInput={`amenity_name${iddsfs}`} value="Amenity Name" />

                    <Input
                        type="text"
                        name={`amenity_name${iddsfs}`}
                        value={data[`amenity_name${iddsfs}`]}
                        className="mt-1 block w-full"
                        autoComplete={`amenity_name${iddsfs}`}
                        handleChange={(event) => {
                            data[event.target.name]=event.target.value;
                            setData(event.target.name, event.target.type === 'file' ? event.target.files : event.target.value);
                        }}
                    />

                </div>
                <div className="mt-4">
                    <Label forInput={`amenity_type${iddsfs}`} value="Amenity Type" />

                    <Input
                        type="text"
                        name={`amenity_type${iddsfs}`}
                        value={data[`amenity_type${iddsfs}`]}
                        className="mt-1 block w-full"
                        autoComplete={`amenity_type${iddsfs}`}
                        handleChange={(event) => {
                            data[event.target.name]=event.target.value;
                            setData(event.target.name, event.target.type === 'file' ? event.target.files : event.target.value);
                        }}
                    />

                </div>
                <div className="mt-4">

                    <Label forInput={`amenity_description${iddsfs}`} value="Amenity Description" />

                    <Textarea
                        name={`amenity_description${iddsfs}`}
                        value={data[`amenity_description${iddsfs}`]}
                        className="mt-1 block w-full"
                        handleChange={(event) => {
                            data[event.target.name]=event.target.value;
                            setData(event.target.name, event.target.type === 'file' ? event.target.files : event.target.value);
                        }}
                    />
                </div>
                <Input
                    type="hidden"
                    name="amenity_suffix"
                    value={data.amenity_suffix}
                    className="mt-1 block w-full"
                    handleChange={(event) => {
                        data[event.target.name]=event.target.value;
                        setData(event.target.name, event.target.type === 'file' ? event.target.files : event.target.value);
                    }}
                    required
                />
                <div className="flex items-center justify-end mt-4">
                    {/* <Button className="ml-4" processing={processing} name="delete">
                        Delete Amenity
                    </Button> */}

                    <Button className="ml-4" processing={processing} name="save">
                        Save Amenity
                    </Button>
                </div>
            </form>
        );
        
    };
    const onAddBtnClick = event => {
        setInputList(AmenityList.concat(<Amenity key={AmenityList.length + Amenities.length + 1} />));
        data['amenitylist'] = AmenityList.length + Amenities.length + 1;
    };
 
//     const [ReviewList, setReviewList] = useState([]);
    
//     const Review = () => {
// var iddsfs=getRandomString(5);
//         formobject['review_suffix'] = iddsfs;
//         formobject[`author_name${iddsfs}`] = '';
//         formobject[`rating${iddsfs}`] = '';
//         formobject[`message${iddsfs}`] = '';
//         // console.log(formobject['review_suffix']);
//         data['review_suffix']=iddsfs;
    
//         return (
//             <form onSubmit={ReviewDeleteUpdate}>
//                 <ValidationErrors errors={errors} />
//                 <h6>{ReviewList.length + Reviews.length + 1}</h6>
//                 <div className="mt-4">
//                     <Label forInput={`author_name${iddsfs}`} value="Author Name" />

//                     <Input
//                         type="text"
//                         name={`author_name${iddsfs}`}
//                         value={data[`author_name${iddsfs}`]}
//                         className="mt-1 block w-full"
//                         autoComplete={`author_name${iddsfs}`}
//                         handleChange={(event) => {
//                             data[event.target.name]=event.target.value;
//                             setData(event.target.name, event.target.type === 'file' ? event.target.files : event.target.value);
//                         }}
//                     />

//                 </div>
//                 <div className="mt-4">
//                     <Label forInput={`rating${iddsfs}`} value="rating" />

//                     <input
//                         type="number"
//                         name={`rating${iddsfs}`}
//                         value={data[`rating${iddsfs}`]}
//                         className="border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm mt-1 block w-full"
//                         autoComplete={`rating${iddsfs}`}
//                         onChange={(event) => {
//                             data[event.target.name]=event.target.value;
//                             setData(event.target.name, event.target.type === 'file' ? event.target.files : event.target.value);
//                         }}
//                         max={5}
//                         min={0}
//                     />

//                 </div>
//                 <div className="mt-4">

//                     <Label forInput={`message${iddsfs}`} value="Review" />

//                     <Textarea
//                         name={`message${iddsfs}`}
//                         value={data[`message${iddsfs}`]}
//                         className="mt-1 block w-full"
//                         handleChange={(event) => {
//                             data[event.target.name]=event.target.value;
//                             setData(event.target.name, event.target.type === 'file' ? event.target.files : event.target.value);
//                         }}
//                     />
//                 </div>
//                 <Input
//                     type="hidden"
//                     name="review_suffix"
//                     value={data.review_suffix}
//                     className="mt-1 block w-full"
//                     handleChange={(event) => {
//                         data[event.target.name]=event.target.value;
//                         setData(event.target.name, event.target.type === 'file' ? event.target.files : event.target.value);
//                     }}
//                     required
//                 />
//                 <div className="flex items-center justify-end mt-4">
//                     {/* <Button className="ml-4" processing={processing} name="delete">
//                         Delete Review
//                     </Button> */}

//                     <Button className="ml-4" processing={processing} name="save">
//                         Save Review
//                     </Button>
//                 </div>
//             </form>
//         );
        
//     };
    // const onAddReviewBtnClick = event => {
    //     setReviewList(ReviewList.concat(<Review key={ReviewList.length + Reviews.length + 1} />));
    //     data['Reviewlist'] = ReviewList.length + Reviews.length + 1;
    //     // console.log(data);
    // };
    let strings = new LocalizedStrings(stringss);
    strings.setLanguage(props.locale);
    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Update Property: {data.name}</h2>}
            menu={props.menu}
            strings={strings}
        >
            <Head title="Update Property" />
            <div className="max-w-6xl mx-auto mt-6 mb-6 sm:px-6 lg:px-8">
                <ValidationErrors errors={errors} />
                {(Photos.length != 0) ?
                    Photos.map(function (photo, index) {
                        data['picid'] = photo.id;
                        return (
                            // Only do this if items have no stable IDs
                            <div className="flex" key={index}>
                                <img src={photo.photo_path} />
                                <form onSubmit={photoDelete}>

                                    <Input
                                        type="hidden"
                                        name="picid"
                                        value={data.picid}
                                        className="mt-1 block w-full"
                                        handleChange={onHandleChange}
                                        required
                                    />
                                    <div className="flex items-center justify-end mt-4">
                                        <Button className="ml-4" processing={processing}>
                                            Delete Photo
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        );
                    }) :
                    <div>No Photos Found</div>
                }
                <form onSubmit={photoSubmit}>
                    <h3 className='font-bold'>Add Photos</h3>
                    <div>
                        <input
                            type="file"
                            name="picture[]"
                            label="Property Pictures"
                            onChange={onHandleChange}
                            className=""
                            multiple
                        /></div>
                    <div className="flex items-center justify-end mt-4">
                        <Button className="ml-4" processing={processing}>
                            Add Photos
                        </Button>
                    </div>
                </form>
                {(Attachments.length != 0) ?
                    Attachments.map(function (attach, index) {
                        data['attachid'] = attach.id;
                        return (
                            // Only do this if items have no stable IDs
                            <div className="flex" key={index}>
                                <p>{attach.attach_name} </p>
                                <form onSubmit={attachDelete}>

                                    <Input
                                        type="hidden"
                                        name="attachid"
                                        value={data.attachid}
                                        className="mt-1 block w-full"
                                        handleChange={onHandleChange}
                                        required
                                    />
                                    <div className="flex items-center justify-end mt-4">
                                        <Button className="ml-4" processing={processing}>
                                            Delete attachment
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        );
                    }) :
                    <div>No attachments Found</div>
                }
                <form onSubmit={attachSubmit}>
                    <h3 className='font-bold'>Add attachments</h3>
                    <div>
                        <input
                            type="file"
                            name="attach[]"
                            onChange={onHandleChange}
                            className=""
                            multiple
                        /></div>
                    <div className="flex items-center justify-end mt-4">
                        <Button className="ml-4" processing={processing}>
                            Add Attachments
                        </Button>
                    </div>
                </form>
                <form onSubmit={submit}>

                    <h3 className='font-bold'>Info</h3>
                    <Input
                        type="hidden"
                        name="id"
                        value={data.id}
                        className="mt-1 block w-full"
                        handleChange={onHandleChange}
                        required
                    />
                    <div className="mt-4">
                        <Label forInput="name" value="Property Name" />

                        <Input
                            type="text"
                            name="name"
                            value={data.name}
                            className="mt-1 block w-full"
                            autoComplete="name"
                            isFocused={true}
                            handleChange={onHandleChange}
                            required
                        />
                    </div>
                    <div className="mt-4">
                        <Label forInput="risk_level" value="Risk Level" />

                        <Input
                            type="text"
                            name="risk_level"
                            value={data.risk_level}
                            className="mt-1 block w-full"
                            autoComplete="risk_level"
                            isFocused={true}
                            handleChange={onHandleChange}
                            required
                        />
                    </div>
                    <div className="mt-4">
                        <Label forInput="type" value="Type" />
                        <Select
                            name="type"
                            value={data.type}
                            handleChange={onHandleChange}
                            items={[{ value: "studio", label: "Studio" }, { value: "apartment", label: "Apartment" }, { value: "villa", label: "Villa" }]} />

                    </div>
                    <div className="mt-4">
                        <Label forInput="bedrooms" value="Bedrooms" />

                        <Input
                            type="number"
                            name="bedrooms"
                            value={data.bedrooms}
                            className="mt-1 block w-full"
                            autoComplete="bedrooms"
                            handleChange={onHandleChange}

                        />
                    </div>
                    <div className="mt-4">
                        <Label forInput="status" value="Status" />

                        <Select
                            name="status"
                            value={data.status}
                            handleChange={onHandleChange}
                            items={[{ value: "available", label: "Available" }, { value: "under-construction", label: "Under Construction" }, { value: "repair", label: "Repair" },{ value: "sold", label: "Sold" }]} />

                    </div>
                    <div className="mt-4">
                        <Label forInput="available_days" value="Available days" />

                        <Input
                            type="number"
                            name="available_days"
                            value={data.available_days}
                            className="mt-1 block w-full"
                            handleChange={onHandleChange}
                            required
                        />
                    </div>
                    <div className="mt-4">
                        <Label forInput="nighborhood" value="Nighborhood" />

                        <Input
                            type="text"
                            name="nighborhood"
                            value={data.nighborhood}
                            className="mt-1 block w-full"
                            autoComplete="nighborhood"
                            handleChange={onHandleChange}
                            required
                        />
                    </div>

                    <div className="mt-4">
                        <Label forInput="bulding_name" value="Building Name" />

                        <Input
                            type="text"
                            name="bulding_name"
                            value={data.bulding_name}
                            className="mt-1 block w-full"
                            autoComplete="bulding_name"
                            handleChange={onHandleChange}
                            required
                        />
                    </div>

                    <div className="mt-4">
                        <Label forInput="community_name" value="Community Name" />

                        <Input
                            type="text"
                            name="community_name"
                            value={data.community_name}
                            className="mt-1 block w-full"
                            handleChange={onHandleChange}
                            required
                        />
                    </div>
                    <div className="mt-4">
                        <Label forInput="description" value="Description" />
                        <Textarea
                            type="text"
                            name="description"
                            value={data.description}
                            className="mt-1 block w-full"
                            handleChange={onHandleChange}
                            required
                        />

                    </div>
                    <h3 className='font-bold'>Address</h3>

                    <div className="mt-4">
                        <Label forInput="country" value="Country" />
                        <CountrySelect
                            name="country"
                            value={data.country}
                            handleChange={onHandleChange}
                            items={countries} />

                    </div>
                    <div className="mt-4">
                        <Label forInput="state" value="State" />
                        <CountrySelect
                            name="state"
                            value={data.state}
                            handleChange={onHandleChange}
                            items={states} />

                    </div>
                    <div className="mt-4">
                        <Label forInput="city" value="City" />
                        <CountrySelect
                            name="city"
                            value={data.city}
                            handleChange={onHandleChange}
                            items={cities} />

                    </div>

                    <div className="mt-4">
                        <Label forInput="street_name" value="Street Name" />

                        <Input
                            type="text"
                            name="street_name"
                            value={data.street_name}
                            className="mt-1 block w-full"
                            handleChange={onHandleChange}
                            required
                        />
                    </div>
                    <div className="mt-4">
                        <Label forInput="zip_code" value="Zip Code" />

                        <Input
                            type="number"
                            name="zip_code"
                            value={data.zip_code}
                            className="mt-1 block w-full"
                            handleChange={onHandleChange}
                            required
                        />
                    </div>
                    <div className="mt-4">
                        <Label forInput="longitude" value="Longitude" />

                        <Input
                            type="number"
                            name="longitude"
                            value={data.longitude}
                            className="mt-1 block w-full"
                            handleChange={onHandleChange}
                            required
                        />
                    </div>
                    <div className="mt-4">
                        <Label forInput="latitude" value="latitude" />

                        <Input
                            type="number"
                            name="latitude"
                            value={data.latitude}
                            className="mt-1 block w-full"
                            handleChange={onHandleChange}
                            required
                        />
                    </div>
                    <h3 className='font-bold'>Financial Plan</h3>

                    <div className="mt-4">
                        <Label forInput="price" value="Price" />

                        <Input
                            type="number"
                            name="price"
                            value={data.price}
                            className="mt-1 block w-full"
                            handleChange={onHandleChange}
                            required
                        />
                    </div>
                    <div className="mt-4">
                        <Label forInput="stakes_limit" value="stakes limit" />

                        <Input
                            type="number"
                            name="stakes_limit"
                            value={data.stakes_limit}
                            className="mt-1 block w-full"
                            handleChange={onHandleChange}
                            required
                        />
                    </div>
                    <div className="mt-4">
                        <Label forInput="minimum_investment" value="Minimum Investment" />

                        <Input
                            type="number"
                            name="minimum_investment"
                            value={data.minimum_investment}
                            className="mt-1 block w-full"
                            handleChange={onHandleChange}
                            required
                        />
                    </div>

                    <div className="flex items-center justify-end mt-4">


                        <Button className="ml-4" processing={processing}>
                            Update Property
                        </Button>
                    </div>
                </form>
                <h3 className='font-bold'>Amenities</h3>
                <div>
                    {(Amenities) ?
                        Amenities.map(function (Amenitey, index) {
                            formobject['amenity_id'] = Amenitey.id;
                            formobject[`amenity_name${Amenitey.id}`] = Amenitey.amenity_name;
                            formobject[`amenity_type${Amenitey.id}`] = Amenitey.amenity_type;
                            formobject[`amenity_description${Amenitey.id}`] = Amenitey.amenity_description;
                            data['amenity_id'] = Amenitey.id;
                            return (<div key={index}>
                                <h6>{index + 1}</h6>
                                <form onSubmit={AmenityDeleteUpdate}>
                                    <ValidationErrors errors={errors} />
                                    <div className="mt-4">
                                        <Label forInput={`amenity_name${Amenitey.id}`} value="Amenity Name" />

                                        <Input
                                            type="text"
                                            name={`amenity_name${Amenitey.id}`}
                                            value={data[`amenity_name${Amenitey.id}`]}
                                            className="mt-1 block w-full"
                                            autoComplete={`amenity_name${Amenitey.id}`}
                                            handleChange={onHandleChange}
                                        />

                                    </div>
                                    <div className="mt-4">
                                        <Label forInput={`amenity_type${Amenitey.id}`} value="Amenity Type" />

                                        <Input
                                            type="text"
                                            name={`amenity_type${Amenitey.id}`}
                                            value={data[`amenity_type${Amenitey.id}`]}
                                            className="mt-1 block w-full"
                                            autoComplete={`amenity_type${Amenitey.id}`}
                                            handleChange={onHandleChange}
                                        />

                                    </div>
                                    <div className="mt-4">

                                        <Label forInput={`amenity_description${Amenitey.id}`} value="Amenity Description" />

                                        <Textarea
                                            name={`amenity_description${Amenitey.id}`}
                                            value={data[`amenity_description${Amenitey.id}`]}
                                            className="mt-1 block w-full"
                                            handleChange={onHandleChange}
                                        />
                                    </div>


                                    <Input
                                        type="hidden"
                                        name="amenity_id"
                                        value={data.amenity_id}
                                        className="mt-1 block w-full"
                                        handleChange={onHandleChange}
                                        required
                                    />
                                    <div className="flex items-center justify-end mt-4">
                                        <Button className="ml-4" processing={processing} name="delete">
                                            Delete Amenity
                                        </Button>

                                        <Button className="ml-4" processing={processing} name="update">
                                            Update Amenity
                                        </Button>
                                    </div>
                                </form>
                            </div>
                            );
                        }) :
                        <div>No Amenities Found</div>
                    }
                    {AmenityList}
                    <div id="addAmenity" className="cursor-pointer inline-flex items-center px-4 py-2 bg-gray-900 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-1px active:bg-gray-900 transition ease-in-out duration-150 " onClick={onAddBtnClick}>Add Amenity</div>
                </div>
                
            </div>
        </Authenticated>
    );
}
