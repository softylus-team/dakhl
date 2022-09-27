import React from 'react';
import { Link } from '@inertiajs/inertia-react';

export default function propertyCard({id, strings, img, location, title, price, period, propStatus, monthlyEarning, minimumInvest }) {

    return (
        <Link href={route('viewproperty', id)} >
        <div style={{ boxShadow: " 0px -2px 9px rgba(205, 205, 205, 0.25), 1.23281e-15px 7.13px 19.27px rgba(223, 223, 223, 0.4605)" }}>
            <div className='relative px-1 pt-1'>
                <img className={"w-full h-72 object-cover"} src={img} alt={title} />
                <div className='absolute bottom-0 right-0 left-0 flex justify-between bg-white/75 px-6 h-16 items-center '>
                    <p className='text-d-gray font-semibold text-xl'>{location}</p>
                    <p className='text-d-blue  text-xl'>{title}</p>
                </div>

            </div>
            <div className='px-6 py-3'>

                <div className='border-b border-gray flex '>
                    <div>
                        <p className='text-l-gray font-normal text-lg'>{strings.totalCost}</p>
                        <p className='text-d-blue font-bold text-xl'>{price} SAR</p>
                    </div>
                </div>
                <div className='border-b border-gray flex justify-between'>

                    <div>
                        <p className='text-l-gray font-normal text-lg'>{strings.investPeriod}</p>
                        <p className='text-d-gray font-bold text-xl'>{period} {strings.month}</p>
                    </div>
                    <div>
                        <p className='text-l-gray font-normal text-lg'>{strings.status}</p>
                        <p className='text-d-gray font-bold text-xl'>{propStatus}</p>
                    </div>
                </div>
                <div className='flex justify-between'>
                    <div>
                        <p className='text-l-gray font-normal text-lg'>{strings.monthlyEarning}</p>
                        <p className='text-d-gray font-bold text-xl'>{monthlyEarning}% SAR</p>
                    </div>
                    <div>
                        <p className='text-l-gray font-normal text-lg'>{strings.minimumInvest}</p>
                        <p className='text-d-gray font-bold text-xl'>{minimumInvest}</p>
                    </div>
                </div>
            </div>
        </div>
        </Link>

    );
}
