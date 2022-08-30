import React from 'react';
import { Link } from '@inertiajs/inertia-react';

export default function NavLinkSide({ href, active, children, icon, text }) {
    return (

        <div className={
                    active
                        ? 'flex py-2 bg-l-blue w-full border-l-blue border-l-4'
                        : 'flex py-2'
                }>
            <img className="object-contain mx-4 my-auto  w-6 h-6" src={icon} />
            <Link
                href={href}
                className={
                    active
                        ? 'inline-flex items-center py-2 text-sm font-bold leading-5 text-d-blue focus:outline-none focus:border-indigo-700 transition duration-150 ease-in-out'
                        : 'inline-flex items-center py-2 text-sm font-bold leading-5 text-d-gray hover:text-d-blue focus:outline-none transition duration-150 ease-in-out'
                }
            >{text}
            </Link>
        </div>

    );
}
