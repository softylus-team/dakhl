import React from 'react';
import HowWorkCard from "@/components/howWorkCard";

export default function HowWeWork({ howWorkCards,locale }) {
    return (<>
        <div className='howWorkBg sm:flex hidden'>
            <div className='w-2/3'>
                <div className='flex'>
                    {howWorkCards.slice(0, 3).reverse().map(function (howWorkCard, index) {
                        return (
                            <HowWorkCard
                                key={index}
                                bg={howWorkCard.bg}
                                image={howWorkCard.icon}
                                title={locale == 'ar' ? howWorkCard.title_ar : howWorkCard.title_en}
                                desciption={locale == 'ar' ? howWorkCard.description_ar : howWorkCard.description_er}
                            />
                        )
                    })}

                </div>
                <div className='flex' style={{ marginTop: "-7rem" }}>
                    <div style={{ width: "7.4rem" }}></div>
                    {howWorkCards.slice(3, 6).reverse().map(function (howWorkCard, index) {
                        return (
                            <HowWorkCard
                                key={index}
                                bg={howWorkCard.bg}
                                image={howWorkCard.icon}
                                title={locale == 'ar' ? howWorkCard.title_ar : howWorkCard.title_en}
                                desciption={locale == 'ar' ? howWorkCard.description_ar : howWorkCard.description_er}
                            />
                        )
                    })}

                </div>
            </div>
            <div className='w-1/3'></div>
        </div>
        <div className='howWorkBg sm:hidden'>
                <div className='flex justify-center'>
                    {howWorkCards.slice(0, 2).reverse().map(function (howWorkCard, index) {
                        return (
                            <HowWorkCard
                                key={index}
                                bg={howWorkCard.bg}
                                image={howWorkCard.icon}
                                title={locale == 'ar' ? howWorkCard.title_ar : howWorkCard.title_en}
                                desciption={locale == 'ar' ? howWorkCard.description_ar : howWorkCard.description_er}
                            />
                        )
                    })}

                </div>
                <div className='flex justify-center' style={{ marginTop: "-4.6rem" }}>
                    {/* <div style={{ width: "4.6rem" }}></div> */}

                    {howWorkCards.slice(2, 3).reverse().map(function (howWorkCard, index) {
                        return (
                            <HowWorkCard
                                key={index}
                                bg={howWorkCard.bg}
                                image={howWorkCard.icon}
                                title={locale == 'ar' ? howWorkCard.title_ar : howWorkCard.title_en}
                                desciption={locale == 'ar' ? howWorkCard.description_ar : howWorkCard.description_er}
                            />
                        )
                    })}

                </div>
                <div className='flex justify-center' style={{ marginTop: "-4.6rem" }}>
                    {howWorkCards.slice(3, 6).reverse().map(function (howWorkCard, index) {
                        return (
                            <HowWorkCard
                                key={index}
                                bg={howWorkCard.bg}
                                image={howWorkCard.icon}
                                title={locale == 'ar' ? howWorkCard.title_ar : howWorkCard.title_en}
                                desciption={locale == 'ar' ? howWorkCard.description_ar : howWorkCard.description_er}
                            />
                        )
                    })}

                </div>
        </div>
    </>);
}