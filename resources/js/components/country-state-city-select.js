import React from 'react';

export default function CountrySelect({ name, value, handleChange , items,placeholder }) {
    return (
        <select
            name={name}
            value={value}
            className="w-full rounded border border-gray-300 text-d-gray shadow-sm focus:border-d-gray "
            onChange={(e) => handleChange(e)}
        >
            <option value={"place"} hidden>{placeholder?placeholder:"Select one ..."}</option>
            {items.map((item, index) =>
  <option key={index} value={item.code} >
    {item.name}
  </option>
)}
        </select>
    );
}
