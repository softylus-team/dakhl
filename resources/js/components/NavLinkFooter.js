import React from 'react';
import { Link } from '@inertiajs/inertia-react';

export default function NavLinkFooter({ href, active, children,className }) {
    return (
        <Link
            href={href}
            className={`${
                active
                    ? 'items-center px-1 pt-1 text-sm font-normal leading-5 text-d-blue focus:outline-none focus:border-indigo-700 transition duration-150 ease-in-out'
                    : 'items-center px-1 pt-1 border-transparent text-sm font-normal leading-5 text-l-gray hover:text-d-blue focus:outline-none transition duration-150 ease-in-out'
            } ${className}`}
        >
            {children}
        </Link>
    );
}
