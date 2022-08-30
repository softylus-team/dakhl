import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { makeStyles } from '@mui/styles'
import { fontFamily } from 'tailwindcss/defaultTheme';
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;


export default function SelectPlaceholder({locale,name,data,placeholder}) {
    const MenuProps = {
        PaperProps: {
          style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 200,
            direction: locale=="ar"?"rtl":"ltr",
            fontFamily: locale=="ar"?"cairo":"Roboto"
          },
        },
      };
  
// {locale == "ar" ? 'rtl dir-rtl' : 'ltr dir-ltr'}

  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };
  return (
        <Select
          displayEmpty
          value={personName}
          name={name}
          onChange={handleChange}
          input={<OutlinedInput />}
          renderValue={(selected) => {
            if (selected.length === 0) {
              return placeholder;
            }

            return selected.join(', ');
          }}
          MenuProps={MenuProps}
          inputProps={{ 'aria-label': 'Without label' }}
         
        >
          <MenuItem disabled value="">
            {placeholder}
          </MenuItem>
          {data.map((option) => (
            <MenuItem
              key={option.value}
              value={option.value}
            >
              {option.label}
            </MenuItem>
          ))}
        </Select>
        

  );
}
