import React from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Link, Head } from '@inertiajs/inertia-react';
import LocalizedStrings from 'react-localization';
import stringss from "../../strings";
import Container from '@/components/container';
import Dropdown from '@/Components/Dropdown';

// import PropertiesCollection from "../components/Properties";
export default function Properties(props) {
    // // console.log(props.auth.user);
    const Properties = props.Properties;
    console.log(Properties);
    console.log(props);
    // console.log(Properties[0].created_at.toLocaleDateString());
    let strings = new LocalizedStrings(stringss);
    strings.setLanguage(props.locale);
    return (
        <Authenticated
            locale={props.locale}
            auth={props.auth}
            errors={props.errors}
            header={strings.investmentFunds}
            menu={props.menu}
            strings={strings}
        >
            <Head title="investmentFunds" />

            <Container>
                <div className="max-w-6xl mx-auto mt-6 mb-6 sm:px-6 lg:px-8">
                    <div className='flex'>
                    <Link href={route('investmentFunds')} className='m-4 p-2 rounded-md px-4 font-bold' style={{backgroundColor:"#E1EDF3" ,color:"#02044F"}}>{strings.investmentFunds} </Link>
                    <Link href={route('Add-Property')} className='m-4 p-2'>{strings.addInvestment} </Link>
                    </div>
                    <hr className='mb-4'/>
                    <table className="table-auto w-full">
                        <thead>
                            <tr  className={ ` ${props.locale == 'ar' ? "text-center" : "text-left"} hidden sm:table-row`}>
                                <th className="text-sm text-l-gray font-normal w-56">#</th>
                                <th className="text-sm text-l-gray font-normal w-56">{strings.fund}</th>
                                <th className="text-sm text-l-gray font-normal w-56">{strings.Company}</th>
                                <th className="text-sm text-l-gray font-normal w-56">{strings.Investors}</th>
                                <th className="text-sm text-l-gray font-normal w-56">{strings.sizelBalances}</th>
                                <th className="text-sm text-l-gray font-normal w-56">{strings.ExpiryDate}</th>
                                <th className="text-sm text-l-gray font-normal w-56">{strings.status}</th>
                                <th className="text-sm text-l-gray font-normal w-56">{strings.more}</th>
                                
                            </tr>
                        </thead>
                        <tbody className='MuiSlider-thumb px-8'>
                            {(Properties)?
                            
                            Properties.map((property, index) =>
                                // Only do this if items have no stable IDs
                                <tr key={index} className="text-center px-8 border-b">
                                    <td className=" text-d-black font-normal w-56">{++index}</td>
                                    <td className="text-sm text-d-black font-normal w-56 ">{property.name}</td>
                                    <td className="text-sm text-d-black font-normal w-56 ">{property.community_name}</td>
                                    <td className="text-sm text-d-black font-normal w-56 ">{property.investment}</td>
                                    <td className="text-sm text-d-black font-normal w-56 ">{property.sizelBalances[0].price} {strings.currency}</td>
                                    <td className="text-sm text-d-black font-normal w-56 ">{property.created_at}</td>
                                    {/* <td className="text-sm text-d-black font-normal w-56 ">{property.reminning_days}</td> */}
                                    {(property.status=="available")? 
                                    <td className="text-sm text-d-black font-normal w-56 ">
                                        <div style={{backgroundColor:"#E9FFEC" ,color:"#0AA45A"}}>
                                        {property.status}
                                        </div>
                                        </td>
                                    :<td className="text-sm text-d-black font-normal w-56" >
                                        <div style={{backgroundColor:"#FFEAEA" ,color:"#F86868"}}>
                                        {property.status}
                                        </div>
                                        </td>
                                    }

                                    <td className="">
                                        <Dropdown>
                                            <Dropdown.Trigger>
                                                <div className="inline-flex rounded-md  items-center text-sm leading-4 font-medium">
                                                        <img className="mr-2 mt-4" width="7" height="3" viewBox="0 0 10 6" fill="none" src="/appIcons/dotsThree.svg" />
                                                </div>
                                            </Dropdown.Trigger>
                                            <Dropdown.Content width={'56'} align={props.locale == "ar" ? "left" : "right"} >
                                                {/* <Dropdown.Link href={route('viewpropertyAdmin', property.id)} method="get" as="button"> */}
                                                <Dropdown.Link href={route('viewproperty', property.id)} method="get" as="button">
                                                    <div className='py-2 flex border-b border-gray-100'>
                                                        <div className=''>
                                                            <p className='text-blue'>{strings.details} </p>
                                                        </div>
                                                    </div>
                                                </Dropdown.Link>
                                                <Dropdown.Link href={route('Update-Property', property.id)} method="get" as="button">
                                                    <div className='py-2 flex border-b border-gray-100'>
                                                        <div className=''>
                                                            <p className='text-blue'>{strings.Modify} </p>
                                                        </div>
                                                    </div>
                                                </Dropdown.Link>
                                                <Dropdown.Link href={route('Delete-Property', property.id)} method="get" as="button">
                                                    <div className='py-2 flex border-b border-gray-100'>
                                                        <div className=''>
                                                            <p className='text-red-600'>{strings.deletes} </p>
                                                        </div>
                                                    </div>
                                                </Dropdown.Link>
                                            </Dropdown.Content>
                                        </Dropdown>             
                                    </td>

                                    {/* <td className="text-sm text-l-gray font-normal w-56 border-b-2">
                                        <Link href={route('Update-user', property.id)} className="inline-flex items-center px-4 py-2 bg-gray-900 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-1px active:bg-gray-900 transition ease-in-out duration-150">
                                            Update property
                                        </Link>
                                    </td> */}

                                    {/* <td className="text-sm text-l-gray font-normal w-56">
                                        <Link href={route('viewproperty', property.id)} className="inline-flex items-center px-4 py-2 bg-gray-900 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-1px active:bg-gray-900 transition ease-in-out duration-150">
                                            View property
                                        </Link>
                                    </td>
                                    
                                    <td className="text-sm text-l-gray font-normal w-56">
                                        <Link href={route('Delete-property', property.id)} className="inline-flex items-center px-4 py-2 bg-gray-900 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-1px active:bg-gray-900 transition ease-in-out duration-150">
                                            Delete property
                                        </Link>
                                    </td> */}
                                </tr>
                            ):
                            <tr><td colSpan="7">No Properties Found</td></tr>
                            }
                        </tbody>

                    </table>
                    {/* {props.auth.user? (
                    props.auth.user.role==="admin"? (
                    <Link href={route('Add-property')} className="inline-flex items-center mt-4 px-4 py-2 bg-gray-900 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-1px active:bg-gray-900 transition ease-in-out duration-150">
                        Add a new property
                    </Link>
                    ): ""
                    ):""} */}
                </div>
                </Container>
            
            </Authenticated>
    );
}
