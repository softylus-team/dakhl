import React from 'react';
import { Link } from '@inertiajs/inertia-react';
import Carousel from '@/Components/Carousels';
import ProgressBar from "@ramonak/react-progress-bar";
export default function property({ strings, locale, property }) {
    var date1 = new Date(property.created_at);
    var date2 = new Date(property.created_at);
    date2.setMonth(date2.getMonth() + property.fund_period);
    // To calculate the time difference of two dates
    var Difference_In_Time = date2.getTime() - date1.getTime();

    // To calculate the no. of days between two dates
    // route('viewproperty', property.id)
    var Difference_In_Days = Math.round(Difference_In_Time / (1000 * 3600 * 24)).toFixed(0);
    return (
        <Link href={route('viewproperty', property.id)} >
            <div className='p-2 rounded fav-shadow'>
                <div className='relative h-56'>
                    {(property.photos.length) ?
                        <Carousel
                            responsive={{
                                desktop: {
                                    breakpoint: { max: 3000, min: 1024 },
                                    items: 1,
                                    slidesToSlide: 1 // optional, default to 1.
                                },
                                tablet: {
                                    breakpoint: { max: 1024, min: 640 },
                                    items: 1,
                                    slidesToSlide: 1 // optional, default to 1.
                                },
                                mobile: {
                                    breakpoint: { max: 640, min: 0 },
                                    items: 1,
                                    slidesToSlide: 1 // optional, default to 1.
                                }
                            }
                            }
                            className={'h-full w-fit'}
                            infinite={true}
                            autoPlay={true}
                            buttons={false}
                            containerClass={"property-carousel-container"}
                            slides={property.photos.map(function (photo, index) { return (<img key={index} src={photo.photo_path} className={"mx-auto w-96 h-full object-cover"} />) })}
                        />
                        :
                        <img src={"/images/placeholder.png"} className="h-full w-full object-cover" />

                    }
                    {property.saved ?
                        <Link href={route('unsaveproperty', property.id)} className={`absolute top-1 ${locale == "ar" ? "left-0" : "right-0"}`}>
                            <img className='w-14 h-14' src="/appIcons/savedProp.svg" />

                        </Link> :
                        <Link href={route('saveproperty', property.id)} className={`absolute top-1 ${locale == "ar" ? "left-0" : "right-0"}`}>
                            <img className='w-14 h-14' src="/appIcons/unsavedProp.svg" />

                        </Link>
                    }
                    <Link href={""} className={`absolute top-16 ${locale == "ar" ? "left-0" : "right-0"}`}>
                        <img className='w-14 h-14' src="/appIcons/shareProp.svg" />

                    </Link>
                </div>
                <div className='py-4'>
                    <div className='flex gap-2.5'>
                        <img src="/appIcons/propLocation.svg" className='w-4 h-4' />
                        <p className='text-d-blue text-sm font-normal'>{property.address.city}</p>
                    </div>
                    <div className='pb-4'>
                        <h3 className='text-lg text-d-gray font-semibold' style={{ lineHeight: "2rem" }}>{property.name}</h3>
                        <p className='text-l-gray text-sm font-normal'>{strings.managedBy} ({property.community_name})</p>
                    </div>
                    <hr />
                    <div className='pb-4 flex text-center justify-between items-center gap-2.5'>
                        <div>
                            <p className='text-base text-d-blue font-semibold' style={{ lineHeight: "2rem" }}>{property.stake_amout} {strings.currency}</p>
                            <p className='text-l-gray text-sm font-normal'>{strings.price}</p>
                        </div>
                        <div>
                            <p className='text-base text-d-blue font-semibold' style={{ lineHeight: "2rem" }}>%{property.expected_return}</p>
                            <p className='text-l-gray text-sm font-normal'>{strings.expected_return}</p>
                        </div>
                        <div>
                            <p className='text-base text-d-blue font-semibold' style={{ lineHeight: "2rem" }}>{property.fund_period} {strings.month}</p>
                            <p className='text-l-gray text-sm font-normal'>{strings.fund_period}</p>
                        </div>
                    </div>
                    <hr />
                    <div className='py-2'>
                        <div className='flex justify-between items-center'>
                            <p className='text-l-gray text-sm font-normal'>{property.totalStakesinvestment} {strings.currency} {strings.invested}</p>
                            <p className='text-base text-d-blue font-semibold' style={{ lineHeight: "2rem" }}>%{property.progress_percentage}</p>
                        </div>
                        <ProgressBar completed={property.invested_percent} bgColor="#02044F" baseBgColor="#B3BFD8" height="3px" isLabelVisible={false} dir={locale == "ar" ? "rtl" : "ltr"} />

                    </div>
                    <div className='flex justify-between items-center'>
                        <div className='flex items-center gap-2.5'>

                            <p className='text-d-gray text-base font-semibold'>{property.financialPlan.price} {strings.currency}</p>
                            <p className='text-sm text-l-gray font-normal' style={{ lineHeight: "2rem" }}>{strings.fundCapital}</p>

                        </div>
                        <div className='bg-l-cyan p-1.5 rounded text-center'>
                            <p className='text-m2-blue'>{Difference_In_Days} {strings.daysLeft}</p>
                        </div>
                    </div>

                </div>
            </div>
        </Link>
    );
}
