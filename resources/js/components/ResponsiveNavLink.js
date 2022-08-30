import React from 'react';
import { Link } from '@inertiajs/inertia-react';

export default function ResponsiveNavLink({ method = 'get', as = 'a', href, active = false, children,className }) {
    return (
        <Link
            method={method}
            as={as}
            href={href}
            className={`w-full flex items-start pl-3 pr-4 py-2 ${
                active
                    ? 'text-d-blue bg-l-blue focus:outline-none'
                    : 'border-transparent text-d-gray hover:text-d-blue'
            } text-base font-medium focus:outline-none transition duration-150 ease-in-out ${className?className:""}`}
        >
            {children}
        </Link>
    );
}
