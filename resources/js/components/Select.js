import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select1 from '@mui/material/Select';

export default function Select({ name, value, handleChange, items, placeholder }) {
  
  return (
    <Select1
      name={name}
      value={value}
      className="w-full rounded border border-gray-300 text-d-gray shadow-sm focus:border-d-gray"
      onChange={(e) => handleChange(e)}
      input={<OutlinedInput />}
      renderValue={value}
      // {(selected) => {
      //   if (selected.length === 0) {
      //     return placeholder;
      //   }

      //   return selected.join(', ');
      // }}
    >
     {/* <MenuItem selected value=""> */}
            {/* {placeholder} */}
            {/* {items[0].value}
          </MenuItem> */}
      {items.map((item, index) =>
        

        <MenuItem 
          key={index}
          value={item}
        >
          {item}
        </MenuItem>

      )}
    </Select1>
  );
}
