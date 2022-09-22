import React from 'react';


export default function Details({ strings,Price,expected_return ,fund_period}) {
    return (
        <>
            <div className='w-1/3 sm:p-6 p-4 text-center' style={{ backgroundColor: "#EEF5F9" }}>
                <p className='sm:text-xl text-base text-d-blue font-semibold' style={{ lineHeight: "2rem" }}>{Price} {strings.currency}</p>
                <p className='text-l-gray sm:text-base text-xs font-normal'>{strings.price}</p>
            </div>
            <div className='w-1/3 sm:p-6 p-4 text-center' style={{ backgroundColor: "#EEF5F9" }}>
                <p className='sm:text-xl text-base text-d-blue font-semibold' style={{ lineHeight: "2rem" }}>%{expected_return}</p>
                <p className='text-l-gray sm:text-base text-xs font-normal'>{strings.expected_return}</p>
            </div>
            <div className='w-1/3 sm:p-6 p-4 text-center' style={{ backgroundColor: "#EEF5F9" }}>
                <p className='sm:text-xl text-base text-d-blue font-semibold' style={{ lineHeight: "2rem" }}>{fund_period} {strings.month}</p>
                <p className='text-l-gray sm:text-base text-xs font-normal'>{strings.fund_period}</p>
            </div>
        </>
    )

}
