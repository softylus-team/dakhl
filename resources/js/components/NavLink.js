import React from 'react';
import { Link } from '@inertiajs/inertia-react';

export default function NavLink({ href, active, children,className }) {
    return (
        <Link
            href={href}
            className={`${className} ${
                active
                    ? 'inline-flex items-center px-1 pt-1 text-sm font-bold leading-5 text-d-blue focus:outline-none focus:border-indigo-700 transition duration-150 ease-in-out'
                    : 'inline-flex items-center px-1 pt-1 border-transparent text-sm font-bold leading-5 text-d-gray hover:text-d-blue focus:outline-none transition duration-150 ease-in-out'
            }`}
        >
            {children}
        </Link>
    );
}
