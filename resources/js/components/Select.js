import React from 'react';

export default function Select({ name, value, handleChange, items, placeholder = "select one ..." }) {
  return (
    <select
      name={name}
      value={value}
      className="w-full rounded border border-gray-300 text-d-gray shadow-sm focus:border-d-gray"
      onChange={(e) => handleChange(e)}
    >
      <option value="" disabled selected>
        {placeholder}
      </option>
      {items.map((item, index) =>
        <option key={index} value={item.value}>
          {item.label}
        </option>
      )}
    </select>
  );
}
