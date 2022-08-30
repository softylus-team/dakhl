
import React from 'react';
import { Link } from '@inertiajs/inertia-react';


export default function Options({ strings, minimum_investment, expected_return, fund_period }) {

    return (
        <div className={`flex items-center sm:gap-6`}>
            <Link href={""} >
                <img className='w-14 h-14' src="/appIcons/zoom.svg" />
            </Link>
            <Link href={""} >
                <img className='w-14 h-14' src="/appIcons/shareProp.svg" />
            </Link>
        </div>
    )

}
