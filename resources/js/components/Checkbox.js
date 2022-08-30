import React from 'react';

export default function Checkbox({ name, value, handleChange, checked }) {
    return (
        <input
            type="checkbox"
            name={name}
            value={value}
            className="rounded-sm border-gray-300 text-d-blue shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            onChange={(e) => handleChange(e)}
            checked={checked}
        />
    );
}
