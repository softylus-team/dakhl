import React, { useState, useEffect } from 'react';
import Guest from '@/Layouts/Guest';
import { Link, Head } from '@inertiajs/inertia-react';
import LocalizedStrings from 'react-localization';
import stringss from "../../strings";
import Property from '@/components/property';
import Container from '@/components/container';
import Pagination from '@/components/Pagination';
import CalculatorPopup from '@/components/CalculatorPopup';
import PropertiesFilterForm from '@/components/PropertiesFilterForm';
// import PropertiesCollection from "../components/Properties";
export default function Properties(props) {
    
    
    let strings = new LocalizedStrings(stringss);
    strings.setLanguage(props.locale);
    const Properties = props.Properties;
    const PropertiesFilter = props.PropertiesFilter;
    const propertyAddress = props.propertyAddress;
    const progressPercentage = props.progressPercentage;
    return (
        <Guest
            locale={props.locale}
            auth={props.auth}
            errors={props.errors}
            header={strings.properties}
            menu={props.menu}
            strings={strings}
        >

            <Head title={strings.properties} />
            <Container className={"my-8"}>
                <h2 className='mb-2 font-semibold text-d-gray text-base'>{strings.home}/<span className='font-semibold text-l-gray text-base'>{strings.properties}</span></h2>
                <hr />
                <div className='flex py-4 justify-between'>
                    <div className='flex gap-2.5 items-center'>
                        <img src="/appIcons/filter.svg" />
                        <p className='text-lg text-d-blue font-semibold'>{strings.filter}</p>
                    </div>
                    <CalculatorPopup locale={props.locale} strings={strings} triggerBtn={<img className='cursor-pointer' src="/appIcons/calculatorBiger.svg" />}/>
                </div>
                <PropertiesFilterForm locale={props.locale} strings={strings} data={PropertiesFilter} dataAddress={propertyAddress} progressPercentage={progressPercentage}/>
            </Container>
            <Container className={"my-8"}>
                {Properties ? (
                    <>
                        <Pagination
                            dataContainerClasses="grid sm:grid-cols-3 grid-cols-1 gap-6"
                            data={Properties}
                            RenderComponent={Property}
                            pageLimit={Math.ceil(Properties.length / 6)}
                            dataLimit={6}
                            strings={strings}
                            locale={props.locale}
                        />
                    </>
                ) : (
                    <p className='text-sm text-l-gray'>{strings.noProperties}</p>
                )}
            </Container>
            {/* <div className="max-w-6xl mx-auto mt-6 mb-6 sm:px-6 lg:px-8">
                {props.flash.success ?
                    <div class="flex items-center bg-blue-500 text-white text-sm font-bold px-4 py-3" role="alert">
                        <svg class="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z" /></svg>
                        <p> {props.flash.success} </p>
                    </div> : ""}
                <table className="w-full table-fixed border-collapse border border-gray-400">
                    <thead className="text-left">
                        <tr>
                            <th className="border border-gray-300">Name</th>
                            <th className="border border-gray-300">Type</th>
                            <th className="border border-gray-300">Bedrooms</th>
                            <th className="border border-gray-300">Status</th>
                            <th className="border border-gray-300">Nighborhood</th>
                            <th className="border border-gray-300">Building Name</th>
                            <th className="border border-gray-300">Community Name</th>
                            <th></th>
                            <th></th>
                            <th></th>

                        </tr>
                    </thead>
                    <tbody>
                        {(Properties) ?
                            Properties.map((property, index) =>
                                // Only do this if items have no stable IDs
                                <tr key={index}>
                                    <td className="border border-gray-300">{property.name}</td>
                                    <td className="border border-gray-300">{property.type}</td>
                                    <td className="border border-gray-300">{property.bedrooms}</td>
                                    <td className="border border-gray-300">{property.status}</td>
                                    <td className="border border-gray-300">{property.nighborhood}</td>
                                    <td className="border border-gray-300">{property.bulding_name}</td>
                                    <td className="border border-gray-300">{property.community_name}</td>
                                    <td>
                                        {
                                            (savedID) &&
                                                savedID.includes(property.id) ? (
                                                <Link href={route('unsaveproperty', property.id)} className="inline-flex items-center px-4 py-2 bg-gray-900 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-1px active:bg-gray-900 transition ease-in-out duration-150">
                                                    Saved
                                                </Link>
                                            ) : (
                                                <Link href={route('saveproperty', property.id)} className="inline-flex items-center px-4 py-2 bg-gray-900 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-1px active:bg-gray-900 transition ease-in-out duration-150">
                                                    Save
                                                </Link>
                                            )
                                        }

                                    </td>
                                    <td>
                                        <Link href={route('viewproperty', property.id)} className="inline-flex items-center px-4 py-2 bg-gray-900 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-1px active:bg-gray-900 transition ease-in-out duration-150">
                                            View
                                        </Link>
                                    </td>

                                    {props.auth.user ? (
                                        props.auth.user.role === "admin" ? (<>
                                            <td>
                                                <Link href={route('Update-Property', property.id)} className="inline-flex items-center px-4 py-2 bg-gray-900 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-1px active:bg-gray-900 transition ease-in-out duration-150">
                                                    Update
                                                </Link>
                                            </td>
                                            <td>
                                                <Link href={route('Delete-Property', property.id)} className="inline-flex items-center px-4 py-2 bg-gray-900 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-1px active:bg-gray-900 transition ease-in-out duration-150">
                                                    Delete
                                                </Link>
                                            </td></>
                                        ) : ""
                                    ) : ""}

                                </tr>
                            ) :
                            <tr><td colSpan="7">No Properies Found</td></tr>
                        }
                    </tbody>

                </table>
                
            </div> */}
            {/* {props.auth.user ? (
                props.auth.user.role === "admin" ? (
                    <Link href={route('Add-Property')} className="inline-flex items-center mt-4 px-4 py-2 bg-gray-900 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-1px active:bg-gray-900 transition ease-in-out duration-150">
                        Add a new property
                    </Link>
                ) : ""
            ) : ""} */}
        </Guest>
    );
}
