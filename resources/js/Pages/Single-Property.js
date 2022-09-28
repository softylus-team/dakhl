import React, { useState } from 'react';
import { Link, Head, useForm } from '@inertiajs/inertia-react';
import Guest from '@/Layouts/Guest';
import Button from '@/Components/Button';
import Input from '@/Components/Input';
import Textarea from '@/Components/Textarea';
import LocalizedStrings from 'react-localization';
import stringss from "../../strings";
import PropertyComponent from '@/components/property';
import Container from '@/components/container';
import Pagination from '@/components/Pagination';
import ValidationErrors from '@/Components/ValidationErrors';
import Calculator from '@/Components/CalculatorSingle';
import Map from '@/Components/Map';
import Attachment from '@/Components/Attachment';
import ProgressBar from "@ramonak/react-progress-bar";
import ImageCarousel from "@/components/Single-Property/imageCarousel";
import Details from "@/components/Single-Property/Details";
import Options from "@/components/Single-Property/Options";
import ReviewsForm from "@/components/Single-Property/ReviewsForm";
import Accordion from '@/Components/AccordionMui';

// import PropertiesCollection from "../components/Properties";
export default function singleProperty(props) {
    let strings = new LocalizedStrings(stringss);
    strings.setLanguage(props.locale);
    const { data, setData, post, processing, errors, reset } = useForm({
        property_id: props.Property.id,
        progress: '',
        report_description: '',
    });
    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'file' ? event.target.files : event.target.value);
    };
    
    const submit = (e) => {
        e.preventDefault();

        post(route('AddConstructionReport'));
    };
    const [showAddReview, setShowAddReview] = useState(false);

    const showForm = () => {
        setShowAddReview(!showAddReview);
    }
    // console.log(props.Property.name);
    const Property = props.Property;
    const Properties = props.properties;
    var date1 = new Date(Property.created_at);
    var date2 = new Date(Property.created_at);
    var fund_period= Math.round(Property.available_days/30);
    date2.setMonth(date2.getMonth() + fund_period);
    var Difference_In_Time = date2.getTime() - date1.getTime();
    var Difference_In_Days = Math.round(Difference_In_Time / (1000 * 3600 * 24)).toFixed(0);
    const Address = props.Address;
    for(var i=0;i<Properties.length;i++){
        if(Properties[i].id==Property.id){
           var id=Property.id;
           var indexID=i;
        }
    }
    const Plan = props.Plan;
    const Photos = props.Photos;
    const Attachments = props.Attachments
    const CReports = props.CReport;
    const Amenities = props.Amenity;
    const Reviews = props.Reviews;
console.log(Property);

    return (
        <Guest
            locale={props.locale}
            auth={props.auth}
            errors={props.errors}
            header={Property.name}
            menu={props.menu}
            strings={strings}
        >
            <Head title={Property.name} />
            <Container className={"sm:my-8 my-4"}>
                <h2 className='hidden sm:block mb-2 font-semibold text-d-gray text-base'>{strings.home}/{strings.properties}/<span className='font-semibold text-l-gray text-base'>{Property.name}</span></h2>
                <div className='sm:hidden flex justify-between items-center'>
                    <h2 className=' mb-2 font-semibold text-d-gray text-base'>{Property.name}</h2>
                    <Options />
                </div>
                <hr className='hidden sm:block' />
            </Container>
            <Container className={"hidden sm:flex gap-6"}>
                <div className='w-2/3'>
                    <div className='relative'>
                        <ImageCarousel Photos={Photos} />
                        <div className={`flex items-center gap-6 absolute top-1 left-0`}>
                            <Options />
                            {props.saved ?
                                // <Link href={route('viewproperty',Property.id)} >
                                <Link href={route('unsaveproperty', Property.id)} >
                                    <img className='w-14 h-14' src="/appIcons/savedProp.svg" />
                                </Link> :
                                <Link href={route('saveproperty', Property.id)} >
                                    <img className='w-14 h-14' src="/appIcons/unsavedProp.svg" />

                                </Link>
                            }
                        </div>

                    </div>
                    <div className='w-2/3 mx-auto pb-4 flex text-center justify-center items-center gap-6'>
                        <Details strings={strings} Price={Property.stake_amout} expected_return={props.expected_return} fund_period={Math.round(Property.available_days/30)} />
                    </div>
                    <div className='w-5/6 mt-8'>
                        <div className='flex items-center gap-6'>
                            <img className="w-6 h-6" src="/appIcons/CalculatorSingle.svg" />
                            <p className='text-d-gray font-bold text-lg '>{strings.investmentCalculator}</p>
                        </div>
                        <Calculator locale={props.locale} strings={strings} />
                        <hr className='my-4' />
                        <div className='flex items-center gap-6'>
                            <img className="w-6 h-6" src="/appIcons/detailsSingle.svg" />
                            <p className='text-d-gray font-bold text-lg '>{strings.details}</p>
                        </div>
                        <p className={`pb-2 text-l-gray text-base ${props.locale == 'ar' ? "pr-12" : "pl-12"}`}>{Property.description}</p>
                        <hr className='my-4' />
                    </div>
                    <div className=''>
                        <div className='flex items-center gap-6'>
                            <img className="w-6 h-6" src="/appIcons/locationSingle.svg" />
                            <p className='text-d-gray font-bold text-lg '>{strings.location}</p>
                        </div>

                        <Map lat={Address.latitude} lng={Address.longitude} />
                    </div>
                </div>
                <div className='w-1/3'>
                    <div className='p-4 fav-shadow rounded flex flex-col gap-6'>
                        
                        <h3 className='text-xl text-d-gray font-bold' style={{ lineHeight: "2rem" }}>{Property.name}</h3>
                        <div className='flex gap-2.5'>
                            <img src="/appIcons/propLocation.svg" className='w-4 h-4' />
                            <p className='text-d-blue text-base font-normal'>{Address.city}</p>
                        </div>
                        <p className='text-l-gray text-sm font-normal'>{strings.managedBy} ({Property.community_name})</p>
                        <div className='w-40 bg-l-cyan p-1.5 rounded text-center'>
                            <p className='text-m2-blue'>{Difference_In_Days} {strings.daysLeft}</p>
                        </div>
                        <div className=' flex justify-between items-center gap-14'>
                            <div>
                                <p className='text-l-gray text-base font-semibold' style={{ lineHeight: "2rem" }}>{strings.fundCapital}</p>
                                <p className='text-d-gray text-base font-bold'>{Properties[indexID].financialPlan.price} {strings.currency}</p>
                            </div>

                            <div>
                                <p className='text-l-gray text-base font-semibold'>{strings.minimumInvestment}</p>
                                <p className='text-d-gray text-base font-bold' style={{ lineHeight: "2rem" }}>{Property.stake_amout} {strings.currency}</p>
                            </div>
                        </div>
                        <div className=''>
                            <div className='flex justify-between items-center'>
                                <p className='text-l-gray text-base font-semibold'>{Properties[indexID].totalStakesinvestment} {strings.currency} {strings.invested}</p>
                                {/* <p className='text-base text-d-blue font-semibold' style={{ lineHeight: "2rem" }}>%{Math.round(props.invested_percent).toFixed(0)}</p> */}
                            </div>
                            <ProgressBar completed={props.invested_percent} bgColor="#02044F" baseBgColor="#B3BFD8" height="3px" isLabelVisible={false} dir={props.locale == "ar" ? "rtl" : "ltr"} />

                        </div>
                        <Link href={route('invest', Property.id)}>
                            <Button className=" w-full flex justify-center" processing={processing}>
                                {strings.startInvest}
                            </Button>

                        </Link>
                    </div>
                    <div className='mt-8 p-4 fav-shadow rounded flex flex-col gap-6'>

                        <div className='flex items-center gap-6'>
                            <img className="w-6 h-6" src="/appIcons/attachments.svg" />
                            <p className='text-d-gray font-bold text-lg '>{strings.attachments}</p>
                        </div>
                        <div className={`flex flex-col gap-2.5 ${props.locale == 'ar' ? "pr-12" : "pl-12"}`}>
                            {(Attachments.length != 0) ?
                                Attachments.map((attach, index) =>
                                    // Only do this if items have no stable IDs
                                    <Attachment key={index} name={attach.attach_name} link={attach.attach_path} />

                                ) :
                                <p className='text-l-gray text-sm'>{strings.noAttachments}</p>
                            }
                        </div>
                        {/* <hr className='my-4' />
                        <div className='flex items-center gap-6'>
                            <img className="w-6 h-6" src="/appIcons/reviews.svg" />
                            <p className='text-d-gray font-bold text-lg '>{strings.reviews}</p>
                        </div> */}
                        {/* <ReviewsForm property_id={props.Property.id} strings={strings} locale={props.locale} Reviews={Reviews}/> */}
                    </div>
                </div>
            </Container>
            <Container className="sm:hidden">
                <div className='relative'>
                    <ImageCarousel Photos={Photos} />
                    <div className={`absolute top-1 left-0`}>
                        {props.saved ?
                            <Link href={route('unsaveproperty', Property.id)} >
                                <img className='w-14 h-14' src="/appIcons/savedProp.svg" />

                            </Link> :
                            <Link href={route('saveproperty', Property.id)} >
                                <img className='w-14 h-14' src="/appIcons/unsavedProp.svg" />

                            </Link>
                        }
                    </div>

                </div>
                <div className='flex flex-col gap-6 mb-6'>


                    <div className='flex items-center justify-between'>
                        <div>
                            <div className='flex gap-2.5'>
                                <img src="/appIcons/propLocation.svg" className='w-4 h-4' />
                                <p className='text-d-blue text-base font-normal'>{Address.city}</p>
                            </div>
                            <p className='text-l-gray text-sm font-normal'>{strings.managedBy} ({Property.community_name})</p>
                        </div>
                        <div className='w-24 bg-l-cyan p-1 rounded text-center text-xs'>
                            <p className='text-m2-blue'>{Difference_In_Days} {strings.daysLeft}</p>
                        </div>
                    </div>
                    <div className=''>
                        <div className='flex justify-between items-center'>
                            <p className='text-l-gray text-base font-semibold'>{props.invested} {strings.currency} {strings.invested}</p>
                            <p className='text-base text-d-blue font-semibold' style={{ lineHeight: "2rem" }}>%{Math.round(props.invested_percent).toFixed(0)}</p>
                        </div>
                        <ProgressBar completed={props.invested_percent} bgColor="#02044F" baseBgColor="#B3BFD8" height="3px" isLabelVisible={false} dir={props.locale == "ar" ? "rtl" : "ltr"} />

                    </div>
                    <div className='flex'>
                        <Details strings={strings} minimum_investment={Plan.minimum_investment} expected_return={props.expected_return} fund_period={props.fund_period} />

                    </div>
                    <div>
                        <div className='flex items-center gap-2.5'>
                            <p className='text-d-gray text-base font-bold'>{Plan.price} {strings.currency}</p>
                            <p className='text-l-gray text-sm font-semibold' style={{ lineHeight: "2rem" }}>{strings.fundCapital}</p>
                        </div>

                        <div className='flex items-center gap-2.5'>
                            <p className='text-d-gray text-base font-bold' style={{ lineHeight: "2rem" }}>{Plan.minimum_investment} {strings.currency}</p>
                            <p className='text-l-gray text-sm font-semibold'>{strings.minimumInvestment}</p>
                        </div>
                    </div>
                    <Link href={route('invest', Property.id)}>
                        <Button className=" w-full flex justify-center" processing={processing}>
                            {strings.startInvest}
                        </Button>
                    </Link>
                </div>
                <Accordion
                    containerClass="single"
                    title={
                        <div className='flex items-center gap-2.5'>
                            <img className="w-6 h-6" src="/appIcons/CalculatorSingle.svg" />
                            <p className='text-d-gray font-bold text-base '>{strings.investmentCalculator}</p>
                        </div>}>
                    <Calculator locale={props.locale} strings={strings} />
                </Accordion>
                <Accordion
                    containerClass="single"
                    title={
                        <div className='flex items-center gap-2.5'>
                            <img className="w-6 h-6" src="/appIcons/detailsSingle.svg" />
                            <p className='text-d-gray font-bold text-base '>{strings.details}</p>
                        </div>}>

                    <p className={`pb-2 text-l-gray text-base px-2 `}>{Property.description}</p>

                </Accordion>
                <Accordion
                    containerClass="single"
                    title={
                        <div className='flex items-center gap-2.5'>
                            <img className="w-6 h-6" src="/appIcons/attachments.svg" />
                            <p className='text-d-gray font-bold text-base '>{strings.attachments}</p>
                        </div>}>

                    <div className={`flex flex-col gap-2.5 px-2`}>
                        {(Attachments.length != 0) ?
                            Attachments.map((attach, index) =>
                                // Only do this if items have no stable IDs
                                <Attachment key={index} name={attach.attach_name} link={attach.attach_path} />

                            ) :
                            <p className='text-l-gray text-sm'>{strings.noAttachments}</p>
                        }
                    </div>
                </Accordion>
                <Accordion
                    containerClass="single"
                    title={
                        <div className='flex items-center gap-2.5'>
                            <img className="w-6 h-6" src="/appIcons/locationSingle.svg" />
                            <p className='text-d-gray font-bold text-base '>{strings.location}</p>
                        </div>}>

                    <Map lat={Address.latitude} lng={Address.longitude} />

                </Accordion>
                <Accordion
                    containerClass="single"
                    title={
                        <div className='flex justify-between items-center'>
                            <div className='flex items-center gap-2.5'>
                                <img className="w-6 h-6" src="/appIcons/reviews.svg" />
                                <p className='text-d-gray font-bold text-base '>{strings.reviews}</p>
                            </div>

                        </div>}>


                        <ReviewsForm property_id={props.Property.id} strings={strings} locale={props.locale} Reviews={Reviews}/>
                    
                </Accordion>
            </Container>
            <Container className={"my-8"}>
                <hr className='my-4' />
                <p className='text-d-gray font-bold mb-4 text-lg '>{strings.similarProps}</p>

                {props.properties ? (
                    <>
                        <Pagination
                            dataContainerClasses="grid sm:grid-cols-3 grid-cols-1 gap-6"
                            data={props.properties}
                            RenderComponent={PropertyComponent}
                            pageLimit={Math.ceil(props.properties.length / 3)}
                            dataLimit={3}
                            strings={strings}
                            locale={props.locale}
                        />
                    </>
                ) : (
                    <p className='text-sm text-l-gray'>{strings.noProperties}</p>
                )}
            </Container>
            {/* <div className="max-w-6xl mx-auto mt-6 mb-6 sm:px-6 lg:px-8">

                <div className='flex'>
                    <table className="w-2/3 mr-4 table-fixed border-collapse text-center">
                        <thead><tr><th colSpan="2">Info</th></tr></thead>
                        <tbody>
                            <tr><th className="border border-gray-300">Name</th><td className="border border-gray-300">{Property.name}</td></tr>
                            <tr><th className="border border-gray-300">Type</th> <td className="border border-gray-300">{Property.type}</td></tr>
                            <tr><th className="border border-gray-300">Bedrooms</th><td className="border border-gray-300">{Property.bedrooms}</td></tr>
                            <tr><th className="border border-gray-300">Status</th><td className="border border-gray-300">{Property.status}</td></tr>
                            <tr><th className="border border-gray-300">Nighborhood</th><td className="border border-gray-300">{Property.nighborhood}</td></tr>
                            <tr><th className="border border-gray-300">Building Name</th><td className="border border-gray-300">{Property.bulding_name}</td></tr>
                            <tr><th className="border border-gray-300">Community Name</th><td className="border border-gray-300">{Property.community_name}</td></tr>
                        </tbody>
                        <thead><tr><th colSpan="2">Address</th></tr></thead>
                        <tbody>
                            <tr><th className="border border-gray-300">Country</th><td className="border border-gray-300">{Address.country}</td></tr>
                            <tr><th className="border border-gray-300">State</th><td className="border border-gray-300">{Address.state}</td></tr>
                            <tr><th className="border border-gray-300">City</th><td className="border border-gray-300">{Address.city}</td></tr>
                            <tr><th className="border border-gray-300">Street Name</th><td className="border border-gray-300">{Address.street_name}</td></tr>
                            <tr><th className="border border-gray-300">Zip Code</th><td className="border border-gray-300">{Address.zip_code}</td></tr>
                            <tr><th className="border border-gray-300">longitude</th><td className="border border-gray-300">{Address.longitude}</td></tr>
                            <tr><th className="border border-gray-300">latitude</th><td className="border border-gray-300">{Address.latitude}</td></tr>
                        </tbody>
                        <thead><tr><th colSpan="2">Financial Plan</th></tr></thead>
                        <tbody>
                            <tr><th className="border border-gray-300">Price</th><td className="border border-gray-300">{Plan.price}</td></tr>
                            <tr><th className="border border-gray-300">Minimum Investment</th><td className="border border-gray-300">{Plan.minimum_investment}</td></tr>
                        </tbody>

                        <thead><tr><th colSpan="2">Amenities</th></tr></thead>
                        <tbody>
                            {(Amenities) ?
                                Amenities.map(function (Amenitey, index) {

                                    return (<tr key={index}>
                                        <th className="border border-gray-300">{index + 1}</th>
                                        <td>
                                            <table className="w-full">
                                                <tr><th className="border border-gray-300">Amenity Name</th><td className="border border-gray-300">{Amenitey.amenity_name}</td></tr>
                                                <tr><th className="border border-gray-300">Amenity Type</th><td className="border border-gray-300">{Amenitey.amenity_type}</td></tr>
                                                <tr><th className="border border-gray-300">Amenity Description</th><td className="border border-gray-300">{Amenitey.amenity_description}</td></tr>
                                            </table>
                                        </td>
                                    </tr>
                                    );
                                }) :
                                <tr><td>No Amenities Found</td></tr>
                            }

                        </tbody>

                    </table>
                    <div>
                        {props.auth.user ? (
                            props.auth.user.role === "admin" ? (
                                <>
                                    <table className='h-fit table-fixed border-collapse text-center'>
                                        <thead><tr><th colSpan="2">Construction report</th></tr></thead>
                                        <tbody>
                                            {(CReports) ?
                                                CReports.map(function (CReport, index) {

                                                    return (<tr key={index}>
                                                        <th>{index + 1}</th>
                                                        <td>
                                                            <table className="w-full">
                                                                <tbody>
                                                                    <tr><th className="border border-gray-300">Progress Percentage</th><td className="border border-gray-300">{CReport.progress_percentage}</td></tr>
                                                                    <tr><th className="border border-gray-300">Description</th><td className="border border-gray-300">{CReport.description}</td></tr>
                                                                </tbody>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                    );
                                                }) :
                                                <tr>
                                                    <td>No Reports Found</td>

                                                </tr>
                                            }

                                            <tr>
                                                <td colSpan="2">

                                                    <button onClick={showForm} className={`${showButton} inline-flex items-center px-4 py-2 bg-gray-900 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-1px active:bg-gray-900 transition ease-in-out duration-150`}>
                                                        Add Report
                                                    </button>
                                                </td>
                                            </tr>


                                        </tbody>
                                    </table> */}

            {/* {showFormS && (
                                        <form onSubmit={submit}>
                                            <div className="mt-4">
                                                <Label forInput="progress" value="Progress Percent" />

                                                <input
                                                    type="number"
                                                    name="progress"
                                                    value={data.progress}
                                                    className="border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm mt-1 block w-full"
                                                    onChange={onHandleChange}
                                                    min="0"
                                                    max="100"
                                                    step="1"
                                                    required
                                                />
                                            </div>
                                            <div className="mt-4">
                                                <Label forInput="report_description" value="Report Description" />

                                                <Textarea
                                                    name="report_description"
                                                    value={data.report_description}
                                                    className="mt-1 block w-full"
                                                    handleChange={onHandleChange}

                                                />
                                            </div>
                                            <div className="flex items-center justify-end mt-4">
                                                <Button className="ml-4" processing={processing}>
                                                    Add Report
                                                </Button>
                                            </div>
                                        </form>
                                    )}
                                </>) : ""
                        ) : ""}
                    </div>
                </div> */}
            {/* {props.auth.user ? (
                    props.auth.user.role === "admin" ? (
                        <div className='flex justify-center mt-4'>
                            <Link href={route('Update-Property', Property.id)} className="inline-flex items-center mr-4 px-4 py-2 bg-gray-900 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-1px active:bg-gray-900 transition ease-in-out duration-150">
                                Update property
                            </Link>
                            <Link href={route('Delete-Property', Property.id)} className="inline-flex items-center px-4 py-2 bg-gray-900 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-1px active:bg-gray-900 transition ease-in-out duration-150">
                                Delete property
                            </Link>
                        </div>
                    ) :
                        ""
                ) : ""} */}

            {/* </div> */}
        </Guest >
    );
}
