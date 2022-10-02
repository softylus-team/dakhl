
import React, { useEffect } from 'react';
import Button from '@/Components/Button';
import Input from '@/Components/Input';
import Radio from '@/Components/Radio';
import Label from '@/Components/Label';
import Select from '@/Components/Select';
import ValidationErrors from '@/Components/ValidationErrors';
import { Head, Link, useForm } from '@inertiajs/inertia-react';
import Slider from '@mui/material/Slider';
import { createTheme, ThemeProvider } from '@mui/material/styles'


export default function PropertiesFilterForm({ locale, strings ,data,dataAddress,progressPercentage}) {
    function Placeholder({icon,title }) {
        return (
            <div className='flex items-center sm:gap-2.5 py-4'>
                <img className='sm:h-7 h-5' src={icon} />
                <p className='text-sm text-d-gray'>{title}</p>
            </div>
        );
    }
    // const Properties = props.Properties;

    const {  setData, get, processing, errors, reset } = useForm({
        status: '',
        minimumPrice: '',
        expectedProfit: '',
        companies: '',
        location:'',
    });

    const typeArray=[];
    const statusArray=[];
    const minimumPriceArray=[];
    const expectedProfitArray=[];
    const companiesArray=[];
    const locationArray=[];

    data.forEach((el)=>{
        if(! typeArray.includes(el.type))
        typeArray.push(el.type);
        if(! statusArray.includes(el.status))
        statusArray.push(el.status);

        if(! minimumPriceArray.includes(el.stake_amout) && el.stake_amout != null)
        minimumPriceArray.push(el.stake_amout);
        if(! companiesArray.includes(el.name))
        companiesArray.push(el.name);
    });
    
    dataAddress.forEach((el)=>{
        if(! locationArray.includes(el.city))
        locationArray.push(el.city);
    });
    
    progressPercentage.forEach((e)=>{
        if(! expectedProfitArray.includes(e))
        expectedProfitArray.push(e);
    })

    const handleChange = (event) => {
        console.log("hhh");
        setData(event.target.name, event.target.value);
    };

    const maxMinimumPrice=Math.max(...minimumPriceArray);
    const minMinimumPrice=Math.min(...minimumPriceArray);

    const maxExpectedProfit=Math.max(...expectedProfitArray);
    const minExpectedProfit=Math.min(...expectedProfitArray);
  
    const handleSliderChange = (event, newValue) => {
        // setValue(newValue);
        console.log("gggggg");
        console.log(newValue);
        setData(event.target.name, newValue);

    };
    const theme = createTheme({
        direction: locale == "ar" ? 'ltr' : 'rtl',
    });
    const submit = (e) => {
        e.preventDefault();
        // console.log(statusArray);
        // console.log(companiesArray);
        // // console.log(expectedProfitArray[0]);
        // console.log(Math.max(...minimumPriceArray));
        // console.log(Math.min(...minimumPriceArray));
        // console.log(minimumPriceArray);
        // console.log(typeArray);
        // console.log(dataAddress);
        // console.log(expectedProfitArray);
        // console.log(progressPercentage);

        get(route('properties'));
    };
 
    
    return (
        <div className="">

            <ValidationErrors errors={errors} />
            <div>
                    {/* {Propertie.length} */}
                </div>
            <form method= "GET" onSubmit={submit} encType="multipart/form-data" className='sm:flex grid grid-cols-3 items-center justify-between sm:gap-6 gap-2.5'>

                <div className='sm:w-1/6 py-4'>
                <Placeholder icon={"/appIcons/property.svg"} title={strings.properties} />
                    <Select
                        name="status"
                        // value={data.propertyStatus}
                        // value={statusArray[0]}
                        locale={locale}
                        items={statusArray}
                        handleChange={handleChange}               
                    />
                </div>
              
                {/* <div className='sm:w-1/6'>
                    <Select
                        name="minimumPrice"
                        // value={""}
                        locale={locale}
                        items={minimumPriceArray}                        
                        handleChange={handleChange}
                        placeholder={<Placeholder icon={"/appIcons/minimumPrice.svg"} title={strings.minimumPrice}/> }
                    />
                </div> */}
                <div className='sm:w-1/6'>
                <Placeholder icon={"/appIcons/minimumPrice.svg"} title={strings.minimumPrice}/>
                <ThemeProvider theme={theme}>
                    <Slider
                    name="minimumPrice"
                    onChange={handleSliderChange}
                    aria-label="Temperature"
                    defaultValue={30}
                    valueLabelDisplay="auto"
                    step={1000}
                    marks
                    min={minMinimumPrice}
                    max={maxMinimumPrice}
                    value={data.minimumPrice}
                    aria-labelledby="minimumPrice"
                    track={locale == "ar" ? 'inverted' : 'normal'}
                    />
                </ThemeProvider>
                </div>

                <div className="sm:w-1/6">
                <Placeholder icon={"/appIcons/property.svg"} title={strings.type}/>
                    <Select
                        name="type"
                        // value={""}
                        locale={locale}
                        items={typeArray}
                        handleChange={handleChange}
                        // placeholder={ <Placeholder icon={"/appIcons/expectedProfit.svg"} title={strings.expectedProfit2}/>}
                    />
                </div>
                <div className="sm:w-1/6">
                <Placeholder icon={"/appIcons/companies.svg"} title={strings.company}/>
                    <Select
                        name="companies"
                        locale={locale}
                        // value={""}
                        items={companiesArray}
                        handleChange={handleChange}
                        // placeholder={ <Placeholder icon={"/appIcons/companies.svg"} title={strings.company}/> }
                    />
                </div>
                {/* <div className="sm:w-1/6" disabled  >
                <Placeholder icon={"/appIcons/locations.svg"} title={strings.location} />
                    <Select
                        name="location"
                        // value={""}
                        locale={locale}
                        items={locationArray}
                        handleChange={handleChange}
                        // placeholder={ <Placeholder icon={"/appIcons/locations.svg"} title={strings.location}/> }
                    />
                </div> */}
                {/* <div className="sm:w-1/6">
                <Placeholder icon={"/appIcons/expectedProfit.svg"} title={strings.expectedProfit2}/>
                    <Select
                        name="expectedProfitArray"
                        // value={""}
                        locale={locale}
                        items={expectedProfitArray}
                        handleChange={handleChange}
                        // placeholder={ <Placeholder icon={"/appIcons/locations.svg"} title={strings.location}/> }
                    />
                </div> */}
                {/* <div className='sm:w-1/6'>
                <Placeholder icon={"/appIcons/expectedProfit.svg"} title={strings.expectedProfit2}/>
                <ThemeProvider theme={theme}>
                    <Slider
                    name="expectedProfitArray"
                    onChange={handleSliderChange}
                    aria-label="Temperature"
                    defaultValue={10}
                    valueLabelDisplay="auto"
                    step={2}
                    marks
                    min={minExpectedProfit}
                    max={maxExpectedProfit}
                    value={data.minimumPrice}
                    aria-labelledby="expectedProfitArray"
                    track={locale == "ar" ? 'inverted' : 'normal'}
                    />
                </ThemeProvider>
                </div> */}

                <div className="sm:w-1/6 flex items-center justify-center">
                    <Button className=" w-full flex justify-center" processing={processing}>
                        {strings.apply}
                    </Button>
                </div>
            </form>
        </div>
    );
}
