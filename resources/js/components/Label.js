import React from 'react';

export default function Label({ forInput, value, className, children }) {
    return (
        <label htmlFor={forInput} className={`block font-medium text-base text-d-gray py-2 ${className?className:""}`}>
            {value ? value : { children }}
        </label>
    );
}
