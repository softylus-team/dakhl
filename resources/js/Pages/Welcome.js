import React from 'react';
import { Link, Head } from '@inertiajs/inertia-react';
import Guest from '@/Layouts/Guest';
import Container from '@/components/container'
import LocalizedStrings from 'react-localization';
import stringss from "../../strings";
import PropertyCard from "@/components/propertyCard";
import AboutCard from "@/components/aboutCard";
import HowWeWork from "@/components/HowWeWork";
import Button from '@/Components/Button';
import Carousel from '@/Components/Carousels';
import Reviews from '@/Components/homeReviews';

// import App from "../components/App";
export default function Welcome(props) {

    let strings = new LocalizedStrings(stringss);
    strings.setLanguage(props.locale);

    // console.log(props.Properties);

    return (
        <Guest
            locale={props.locale}
            auth={props.auth}
            errors={props.errors}
            header={strings.home}
            menu={props.menu}
            strings={strings}>
            <Head title={strings.home} />
            <Container className={"header_background dir-ltr"}>
                <div className='flex items-end' style={{ height: "100%" }}>
                    <div className='w-3/4'></div>
                    <div className='sm:w-1/4'>
                        <h1 className='sm:text-4xl  text-3xl text-d-gray font-bold'>
                            <span className='text-d-blue'>{strings.easyforyou}</span> {strings.investIN}
                        </h1>
                    </div>
                </div>

            </Container>
            <Container className={"sm:my-100"}>

                <div className='text-center sm:w-2/5 mx-auto my-50'>
                    <h2 className='sm:text-3xl text-xl text-d-gray font-bold'>
                        {strings.properties}
                    </h2>
                    <p className='sm:text-lg text-base text-l-gray font-normal'>{strings.propertiesDesc}</p>
                </div>

                {props.Properties &&
                    <div className='grid sm:grid-cols-3 gap-6'>
                        {props.Properties.slice(0, 3).map(function (property, index) {
                            return (
                                <PropertyCard
                                    key={index}
                                    strings={strings}
                                    img={property.Photos ? property.Photos.photo_path : "/images/placeholder.png"}
                                    location={property.community_name}
                                    title={property.name}
                                    // price={property.Plan.price}
                                    period={"0"}
                                    propStatus={property.status}
                                    monthlyEarning={"0"}
                                    // minimumInvest={property.Plan.minimum_investment}
                                />
                            )
                        })}

                    </div>}
                <div className="shrink-0 flex items-center" id="properties1">
                    <Link className="my-50 mx-auto sm:w-1/4" href={route('properties')}>
                        <Button type="button" className='flex justify-center w-full'>{strings.viewAll}
                        </Button>
                    </Link>
                </div>
            </Container>
            <Container className={"sm:my-100 dir-ltr"} >

                <div className='text-center sm:w-2/5 mx-auto my-50' id="aboutUSDesc">
                    <h2 className='sm:text-3xl text-xl text-d-gray font-bold'>
                        {strings.aboutUS}
                    </h2>
                    <p className='sm:text-lg text-base text-l-gray font-normal'>{strings.aboutUSDesc}</p>
                </div>

                {props.aboutusCards &&
                    <div className='grid sm:grid-cols-3 gap-6'>
                        {props.aboutusCards.slice(0, 3).map(function (aboutCard, index) {
                            return (
                                <AboutCard
                                    key={index}
                                    image={aboutCard.icon}
                                    title={props.locale == 'ar' ? aboutCard.title_ar : aboutCard.title_en}
                                    desciption={props.locale == 'ar' ? aboutCard.description_ar : aboutCard.description_en}

                                />
                            )
                        })}

                    </div>}

            </Container>
            <Container className={"sm:my-100 dir-ltr"}>

                <div className='text-center sm:w-2/5 mx-auto my-50' id="howWorkdesc">
                    <h2 className='sm:text-3xl text-xl text-d-gray font-bold'>
                        {strings.howWork}
                    </h2>
                    <p className='sm:text-lg text-base text-l-gray font-normal'>{strings.howWorkdesc}</p>
                </div>

                {props.howWorkCards &&
                    <HowWeWork howWorkCards={props.howWorkCards} locale={props.locale}/>
                }
                <div className="shrink-0 flex items-center">
                    
                    <Link className="my-50 mx-auto sm:w-1/4" href={route('properties')}>
                        <Button type="button" className='flex justify-center w-full'>{strings.startNow}
                        </Button>
                    </Link>
                </div>

            </Container>
            <Container className={"phone_background text-center dir-ltr flex items-center align-self-center sm:my-100 "}>
            <div className='flex items-end my-50'>
                <div className='my-50' >
                    <h1 className='flex sm:text-3xl text-xl text-d-gray font-bold'>{strings.startInvest}</h1>
                    <h3 className='flex align-self-sm-center'>{strings.The_application_is_now_available}</h3>
                <div className=' sm:flex flex-row gap-2.5'>
                    <img className="w-40 h-47" src="/appIcons/google_play.svg"  />
                    <img className="w-40 h-47" src="/appIcons/app_store.svg" />
                </div>
                </div>
                
            </div>
            </Container>
            {(props.Reviews) &&
                <Container className={"sm:my-100"}>
                    <h2 className='sm:text-3xl text-xl text-center text-d-gray font-bold'>
                        {strings.ourInvestor }
                    </h2>

                    <Carousel
                        className={'mr-10 w-fit'}
                        infinite={false}
                        autoPlay={false}
                        containerClass={"reviews-carousel-container"}
                        responsive={{
                            desktop: {
                                breakpoint: { max: 3000, min: 1024 },
                                items: 2,
                                slidesToSlide: 1 // optional, default to 1.
                            },
                            tablet: {
                                breakpoint: { max: 1024, min: 640 },
                                items: 2,
                                slidesToSlide: 1 // optional, default to 1.
                            },
                            mobile: {
                                breakpoint: { max: 640, min: 0 },
                                items: 1,
                                slidesToSlide: 1 // optional, default to 1.
                            }
                        }
                        }
                        slides={props.Reviews.map(function (review, index) { return (<Reviews key={index} imgPath={review.author_photo} rating={review.rating} className={"items-center"} message={review.message} authorName={review.author_name} />) })}
                    />

                </Container>}
            <Container className={"sm:my-100 py-6 dir-ltr"}>
                <h2 className='sm:text-3xl text-xl text-center text-d-gray font-bold'>
                    {strings.ourPartners}
                </h2>
                {(props.Partners) &&
                    <Carousel
                        responsive={{
                            desktop: {
                                breakpoint: { max: 3000, min: 1024 },
                                items: 5,
                                slidesToSlide: 1 // optional, default to 1.
                            },
                            tablet: {
                                breakpoint: { max: 1024, min: 640 },
                                items: 3,
                                slidesToSlide: 2 // optional, default to 1.
                            },
                            mobile: {
                                breakpoint: { max: 640, min: 0 },
                                items: 2,
                                slidesToSlide: 1 // optional, default to 1.
                            }
                        }
                        }
                        className={'mr-10 rounded text-center fav-border'}
                        slides={props.Partners.map(function (partner, index) { return (<img key={index} src={partner.logo} className={"mx-auto object-contain rounded"} style={{ width: "170px", height: "112px" }} />) })}
                    />
                }
            </Container>
        </Guest>
    );
}
