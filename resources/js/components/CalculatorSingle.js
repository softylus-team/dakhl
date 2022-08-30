import * as React from 'react';
import Slider from '@mui/material/Slider';
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { makeStyles } from '@mui/styles'
import { Head, Link, useForm } from '@inertiajs/inertia-react';
import Button from '@/Components/Button';


const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiSlider-thumb': {
            marginRight: -16,
            marginLeft: 0
        }
    }
}))

export default function CalculatorSingle({ locale, strings }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        investValue: '',
        period: '',
        netProfit: '',
        expectedProfit: '',
        totalProfit: '',
    });
    const theme = createTheme({
        direction: locale == "ar" ? 'rtl' : 'ltr',
    });

    // const [value, setValue] = React.useState(name,0.00);

    const handleSliderChange = (event, newValue) => {
        // setValue(newValue);
        setData(event.target.name, newValue);

    };
    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value);
    };
    const handleBlur = () => {
        // if (value < 0) {
        //     setValue(0.00);
        // } else if (value > 100) {
        //     setValue(100.00);
        // }
    };
    const classes = useStyles()

    return (
        <div className='my-4 fav-shadow bg-white rounded p-6'>
            
            <div className={`my-4 flex items-center justify-between gap-6 ${locale == "ar" ? classes.root : ""}`}>
                <label forInput="investValue" className="w-18rem block font-semibold text-sm text-l-gray py-2">{strings.investValue}</label>
                <ThemeProvider theme={theme}>
                    <Slider
                        value={data.investValue}
                        name="investValue"
                        onChange={handleSliderChange}
                        aria-labelledby="investValue"
                        track={locale == "ar" ? 'inverted' : 'normal'}
                    />
                </ThemeProvider>

                <input
                    value={data.investValue}
                    name="investValue"
                    onChange={onHandleChange}
                    onBlur={handleBlur}
                    step="10.00"
                    min="0.00"
                    max="100.00"
                    type='number'
                    aria-labelledby="investValue"
                    className='w-16 rounded border-none text-base font-semibold  text-d-gray  focus:border-none dir-ltr'

                />
            </div>
            <div className={`my-4 flex items-center justify-between gap-6 ${locale == "ar" ? classes.root : ""}`}>
                <label forInput="totalProfit" className="w-18rem block font-semibold text-sm text-l-gray py-2">{strings.totalProfit}</label>
                <ThemeProvider theme={theme}>
                    <Slider
                        value={data.totalProfit}
                        name="totalProfit"
                        onChange={handleSliderChange}
                        aria-labelledby="totalProfit"
                        track={locale == "ar" ? 'inverted' : 'normal'}
                    />
                </ThemeProvider>
                <div className='relative'>
                    <input
                        value={data.totalProfit}
                        name="totalProfit"
                        onChange={onHandleChange}
                        onBlur={handleBlur}
                        step="10.00"
                        min="0.00"
                        max="100.00"
                        type='number'
                        aria-labelledby="totalProfit"
                        className='w-16 pr-4 rounded border-none  text-d-gray  text-base font-semibold focus:border-none dir-ltr'

                    />
                    <span className='flex justify-center items-center pr-2 absolute right-0 top-0 bottom-0 text-base font-semibold text-d-blue'>%</span>
                </div>

            </div>
            <div className={`my-4 flex items-center justify-between gap-6 ${locale == "ar" ? classes.root : ""}`}>
                <label forInput="netProfit" className="w-18rem block font-semibold text-sm text-l-gray py-2">{strings.netProfit}</label>
                <ThemeProvider theme={theme}>
                    <Slider
                        value={data.netProfit}
                        name="netProfit"
                        onChange={handleSliderChange}
                        aria-labelledby="netProfit"
                        track={locale == "ar" ? 'inverted' : 'normal'}
                    />
                </ThemeProvider>


                <div className='relative'>
                    <input
                        value={data.netProfit}
                        name="netProfit"
                        onChange={onHandleChange}
                        onBlur={handleBlur}
                        step="10.00"
                        min="0.00"
                        max="100.00"
                        type='number'
                        aria-labelledby="netProfit"
                        className='w-16 pr-4 rounded border-none text-base font-semibold  text-d-gray  focus:border-none dir-ltr'

                    />
                    <span className='flex justify-center items-center pr-2 absolute right-0 top-0 bottom-0 text-base font-semibold text-d-blue'>%</span>
                </div>
            </div>
            <div className={`my-4 flex items-center justify-between gap-6 ${locale == "ar" ? classes.root : ""}`}>
                <label forInput="expectedProfit" className="w-18rem block font-semibold text-sm text-l-gray py-2">{strings.expectedProfit}</label>
                <ThemeProvider theme={theme}>
                    <Slider
                        value={data.expectedProfit}
                        name="expectedProfit"
                        onChange={handleSliderChange}
                        aria-labelledby="expectedProfit"
                        track={locale == "ar" ? 'inverted' : 'normal'}
                    />
                </ThemeProvider>
                <div className='relative'>
                    <input
                        value={data.expectedProfit}
                        name="expectedProfit"
                        onChange={onHandleChange}
                        onBlur={handleBlur}
                        step="10.00"
                        min="0.00"
                        max="100.00"
                        type='number'
                        aria-labelledby="expectedProfit"
                        className='w-16 pr-4 rounded border-none  text-d-gray  text-base font-semibold focus:border-none dir-ltr'

                    />
                    <span className='flex justify-center items-center pr-2 absolute right-0 top-0 bottom-0 text-base font-semibold text-d-blue'>%</span>
                </div>

            </div>
            <div className='my-4 flex gap-14'>

                <div className={`w-1/2 flex items-center `}>
                    <label forInput="totalReturn" className="w-40 block font-semibold text-base text-d-blue py-2">{strings.totalReturn}</label>

                    <div className='relative'>
                        <input
                            value={data.totalReturn}
                            name="totalReturn"
                            onChange={onHandleChange}
                            onBlur={handleBlur}
                            step="10.00"
                            min="0.00"
                            max="100.00"
                            type='number'
                            aria-labelledby="totalReturn"
                            className='w-40 pr-4 rounded border-none  text-d-gray  text-base font-semibold focus:border-none'

                        />
                        <span className={`flex justify-center items-center mx-8 absolute ${locale == "ar" ? "left-0" : "right-0"} top-0 bottom-0 text-base font-semibold text-d-gray`}>{strings.currency}</span>
                    </div>

                </div>
            </div>

        </div>

    );
}