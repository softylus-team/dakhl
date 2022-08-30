import React from 'react';

export default function Radio({ name, value, handleChange ,checked=false,className}) {
    return (
        <input
            type="radio"
            name={name}
            value={value}
            className={`rounded-full border-gray-300 shadow-sm ${className?className:""}`}
            onChange={(e) => handleChange(e)}
            checked={checked}
        />
    );
}
