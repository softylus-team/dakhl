import React from 'react';

export default function Textarea({ name, value, handleChange,placeholder="Enter Details..." }) {
    return (
        <textarea
            name={name}
            value={value}
            className="w-full rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            onChange={(e) => handleChange(e)}
            placeholder={placeholder}
        ></textarea>
    );
}
