import React, { useEffect, useState } from 'react';
import ReactDOM from "react-dom";
import Button from '@/Components/Button';
import Authenticated from '@/Layouts/Authenticated';
import Input from '@/Components/Input';
import Textarea from '@/Components/Textarea';
// import Select from '@/Components/Select';
import Select from '@/Components/SelectReviews';
import CountrySelect from '@/Components/country-state-city-select';
import Label from '@/Components/Label';
import ValidationErrors from '@/Components/ValidationErrors';
import { Head, Link, useForm } from '@inertiajs/inertia-react';
import { Country, State, City } from 'country-state-city';
import LocalizedStrings from 'react-localization';
import stringss from "../../strings";


export default function AddProperty(props) {

    // console.log(Country.getAllCountries());
    const countries = Country.getAllCountries();
    // console.log(countries);
    // console.log(State.getAllStates());
    const states = State.getStatesOfCountry('JO');
    // console.log(states);

    // console.log(City.getAllCities());
    const cities = City.getCitiesOfCountry('JO');
    // console.log(cities);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        type: 'studio',
        bedrooms: '',
        status: 'available',
        nighborhood: '',
        bulding_name: '',
        community_name: '',
        description: '',
        country: '',
        state: '',
        city: '',
        street_name: '',
        zip_code: '',
        longitude: '',
        latitude: '',
        price: '',
        stakes_limit: '',
        minimum_investment: '',
        picture: '',
        attach: '',
        amenitylist: '',
        // reviewlist: '',
        progress:'',
        report_description:'',
        risk_level:'',
    });
    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'file' ? event.target.files : event.target.value);
    };
    
    const submit = (e) => {
        e.preventDefault();

        post(route('addproperty'));
    };


    const [AmenityList, setInputList] = useState([]);

    const Amenity = () => {


        // console.log(data);

        return (
            <>
                <h6>{AmenityList.length + 1}</h6>
                <div className="mt-4">
                    <Label forInput={`amenity_name${AmenityList.length + 1}`} value="Amenity Name" />

                    <Input
                        type="text"
                        name={`amenity_name${AmenityList.length + 1}`}
                        value={data[`amenity_name${AmenityList.length + 1}`]}
                        className="mt-1 block  w-3\/6"
                        autoComplete={`amenity_name${AmenityList.length + 1}`}
                        handleChange={onHandleChangelo}
                    />

                </div>
                <div className="mt-4">
                    <Label forInput={`amenity_type${AmenityList.length + 1}`} value="Amenity Type" />

                    <Input
                        type="text"
                        name={`amenity_type${AmenityList.length + 1}`}
                        value={data[`amenity_type${AmenityList.length + 1}`]}
                        className="mt-1 block  w-3\/6"
                        autoComplete={`amenity_type${AmenityList.length + 1}`}
                        handleChange={onHandleChangelo}
                    />

                </div>
                <div className="mt-4">

                    <Label forInput={`amenity_description${AmenityList.length + 1}`} value="Amenity Description" />

                    <Textarea
                        name={`amenity_description${AmenityList.length + 1}`}
                        value={data[`amenity_description${AmenityList.length + 1}`]}
                        className="mt-1 block  w-2\/5"
                        handleChange={onHandleChangelo}
                    />
                </div>
            </>
        );
    };
    const onAddBtnClick = event => {
        setInputList(AmenityList.concat(<Amenity key={AmenityList.length} />));
        data['amenitylist'] = AmenityList.length + 1;
        // console.log(data);
    };
    // const [ReviewList, setReviewList] = useState([]);

    // const Review = () => {


    //     // console.log(data);

    //     return (
    //         <>
    //             <h6>{ReviewList.length + 1}</h6>
    //             <div className="mt-4">
    //                 <Label forInput={`author_name${ReviewList.length + 1}`} value="Author Name" />

    //                 <Input
    //                     type="text"
    //                     name={`author_name${ReviewList.length + 1}`}
    //                     value={data[`author_name${ReviewList.length + 1}`]}
    //                     className="mt-1 block  w-2\/5"
    //                     autoComplete={`author_name${ReviewList.length + 1}`}
    //                     handleChange={onHandleChangelo}
    //                 />

    //             </div>
    //             <div className="mt-4">
    //                 <Label forInput={`rating${ReviewList.length + 1}`} value="Rating out of 5" />

    //                 <input
    //                     type="number"
    //                     name={`rating${ReviewList.length + 1}`}
    //                     value={data[`rating${ReviewList.length + 1}`]}
    //                     className="border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm mt-1 block  w-2\/5"
    //                     autoComplete={`rating${ReviewList.length + 1}`}
    //                     onChange={onHandleChangelo}
    //                         min="0"
    //                         max="5"
    //                 />

    //             </div>
    //             <div className="mt-4">

    //                 <Label forInput={`message${ReviewList.length + 1}`} value="Review" />

    //                 <Textarea
    //                     name={`message${ReviewList.length + 1}`}
    //                     value={data[`message${ReviewList.length + 1}`]}
    //                     className="mt-1 block  w-2\/5"
    //                     handleChange={onHandleChangelo}
    //                 />
    //             </div>
    //         </>
    //     );
    // };
    // const onAddreviewBtnClick = event => {
    //     setReviewList(ReviewList.concat(<Review key={ReviewList.length} />));
    //     data['reviewList'] = ReviewList.length + 1;
    //     // console.log(data);
    // };
    const onHandleChangelo = (event) => {
        data[event.target.name] = event.target.value;
        // console.log(data);
        setData(event.target.name, event.target.type === 'file' ? event.target.files : event.target.value);
    };
    let strings = new LocalizedStrings(stringss);
    strings.setLanguage(props.locale);
    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Add Propery</h2>}
            menu={props.menu}
            strings={strings}
            locale={props.locale}
            >
                
            <Head title="Add Property" />
            <div className="max-w-6xl mx-auto mt-6 mb-6 sm:px-6 lg:px-8">
                <ValidationErrors errors={errors} />
                <div className='flex'>
                    <Link href={route('investmentFunds')} className='m-4 p-2'>{strings.investmentFunds} </Link>
                    <Link href={route('Add-Property')} className='m-4 p-2 rounded-md px-4 font-bold' style={{backgroundColor:"#E1EDF3" ,color:"#02044F"}}>{strings.addInvestment} </Link>
                    </div>
                    <hr className='mb-4'/>
                <form onSubmit={submit} encType="multipart/form-data">
                    <h3 className='font-bold'>photos</h3>
                    <div>
                        <input
                            type="file"
                            name="picture[]"
                            label="Property Pictures"
                            onChange={onHandleChange}
                            className="w-3\/6"
                            multiple
                        /></div>
                        {/* <h3 className='font-bold'>attachments</h3>
                    <div>
                        <input
                            type="file"
                            name="attach[]"
                            label="Property attachments"
                            onChange={onHandleChange}
                            className=""
                            multiple
                        /></div> */}
                    <div className="sm:w-1/2 my-4" >
                        <Label forInput="name" value={strings.PropertyName}/>
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
                    <div className='sm:flex justify-between gap-2.5' >
                    <div className="sm:w-1/2 my-4">
                        <Label forInput="community_name" value={strings.company} />
                        <Input
                            type="text"
                            name="community_name "
                            value={data.community_name}
                            className="mt-1 block w-full "
                            handleChange={onHandleChange}
                            required
                        />
                    </div>
                    <div className="sm:w-1/2 my-4">
                        <Label forInput="street_name" value={strings.location}/>

                        <Input
                            type="text"
                            name="street_name"
                            value={data.street_name}
                            className="mt-1 block w-full"
                            handleChange={onHandleChange}
                            required
                        />
                    </div>
                    </div>
                    <div className='sm:flex justify-between gap-2.5' >
                    <div className="sm:w-1/2 my-4">
                        <Label forInput="price" value={strings.capital} />

                        <Input
                            type="number"
                            name="price"
                            value={data.price}
                            className="mt-1 block w-full"
                            handleChange={onHandleChange}
                            required
                        />
                    </div>
                    <div className="sm:w-1/2 my-4">
                        <Label forInput="stakes_limit" value={strings.price} />

                        <Input
                            type="number"
                            name="stakes_limit"
                            value={data.stakes_limit}
                            className="mt-1 block w-full"
                            handleChange={onHandleChange}
                            required
                        />
                    </div>
                    </div>
                    <div className='sm:flex justify-between gap-2.5' >
                    <div className="sm:w-1/2 my-4">
                        <Label forInput="available_days" value={strings.fund_period} />

                        <Input
                            type="number"
                            name="available_days"
                            value={data.available_days}
                            className="mt-1 block w-full"
                            handleChange={onHandleChange}
                            required
                        />
                    </div>
                    </div>
                    <div className="sm:w-1/2 my-4">
                        <Label forInput="report_description" value={strings.details} />
                        
                        <Textarea
                            name="report_description"
                            value={data.report_description}
                            className="mt-1 block w-full"
                            handleChange={onHandleChange}
                            
                        />
                    </div>
                    <div className="flex items-center justify-center mt-4">
                        <Button className="sm:w-1/2 my-4 flex justify-center" processing={processing}>
                            {strings.save}
                        </Button>
                    </div>
                    </form>
            </div>
        </Authenticated>
    );






{/* 
                    <div>
                        <Label forInput="type" value="Type" />
                        <Select
                            name="type"
                            value={data.type}
                            handleChange={onHandleChange}
                            items={[{ value: "studio", label: "Studio" }, { value: "apartment", label: "Apartment" }, { value: "villa", label: "Villa" }]} />

                    </div>
                    <div>
                        <Label forInput="bedrooms" value="Bedrooms" />

                        <Input
                            type="number"
                            name="bedrooms"
                            value={data.bedrooms}
                            className="mt-1 block  w-2\/5"
                            autoComplete="bedrooms"
                            handleChange={onHandleChange}

                        />
                    </div>
                 
                    <div>
                        <Label forInput="status" value="Status" />

                        <Select
                            name="status"
                            value={data.status}
                            handleChange={onHandleChange}
                            items={[{ value: "available", label: "Available" }, { value: "under-construction", label: "Under Construction" }, { value: "repair", label: "Repair" },{ value: "sold", label: "Sold" }]} />

                    </div>
                    <div className="mt-4">
                        <Label forInput="nighborhood" value="Nighborhood" />

                        <Input
                            type="text"
                            name="nighborhood"
                            value={data.nighborhood}
                            className="mt-1 block  w-2\/5"
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
                            className="mt-1 block  w-2\/5"
                            autoComplete="bulding_name"
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
                            className="mt-1 block  w-2\/5"
                            handleChange={onHandleChange}
                            required
                        />

                    </div>
                    <h3 className='font-bold'>Address</h3>

                    <div>
                        <Label forInput="country" value="Country" />
                        <CountrySelect
                            name="country"
                            value={data.country}
                            handleChange={onHandleChange}
                            items={countries} />

                    </div>
                    <div>
                        <Label forInput="state" value="State" />
                        <CountrySelect
                            name="state"
                            value={data.state}
                            handleChange={onHandleChange}
                            items={states} />

                    </div>
                    <div>
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
                            className="mt-1 block  w-2\/5"
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
                            className="mt-1 block  w-2\/5"
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
                            className="mt-1 block  w-2\/5"
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
                            className="mt-1 block  w-2\/5"
                            handleChange={onHandleChange}
                            required
                        />
                    </div>
                    <h3 className='font-bold'>Financial Plan</h3>

                  
                    <div className="mt-4">
                        <Label forInput="minimum_investment" value="Minimum Investment" />

                        <Input
                            type="number"
                            name="minimum_investment"
                            value={data.minimum_investment}
                            className="mt-1 block  w-2\/5"
                            handleChange={onHandleChange}
                            required
                        />
                    </div>
                    <h3 className='font-bold'>Construction report</h3>

                    <div className="mt-4">
                        <Label forInput="progress" value="Progress Percent" />

                        <input
                            type="number"
                            name="progress"
                            value={data.progress}
                            className="border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm mt-1 block  w-2\/5"
                            onChange={onHandleChange}
                            min="0"
                            max="100"
                            step="1"
                            required
                        />
                    </div>
                    
                    <div>
                        <Label forInput="risk_level" value="Risk level" />

                        <Input
                            type="text"
                            name="risk_level"
                            value={data.risk_level}
                            className="mt-1 block  w-2\/5"
                            autoComplete="name"
                            isFocused={true}
                            handleChange={onHandleChange}
                            required
                        />
                    </div>
                    <h3 className='font-bold'>Amenities</h3>
                    <div>

                        {AmenityList}
                        <div className="cursor-pointer inline-flex items-center px-4 py-2 bg-gray-900 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-1px active:bg-gray-900 transition ease-in-out duration-150 " onClick={onAddBtnClick}>Add Amenity</div>
                    </div> */}
                    {/* <h3 className='font-bold'>Reviews</h3>
                    <div>

                        {ReviewList}
                        <div className="cursor-pointer inline-flex items-center px-4 py-2 bg-gray-900 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-1px active:bg-gray-900 transition ease-in-out duration-150 " onClick={onAddreviewBtnClick}>Add Review</div>
                    </div> */}
                    
                {/* </form>
            </div>
        </Authenticated> */}
    // );
}
