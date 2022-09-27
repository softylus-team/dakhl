import * as React from 'react';
import Slider from '@mui/material/Slider';
import Popup from 'reactjs-popup';
import Button from '@/Components/Button';
import Input from '@/Components/Input';
import CountrySelect from '@/Components/country-state-city-select';
import Label from '@/Components/Label';
import ValidationErrors from '@/Components/ValidationErrors';
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { makeStyles } from '@mui/styles'
import { Head, Link, useForm } from '@inertiajs/inertia-react';
import Settings from '@/Pages/Settings';


const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiSlider-thumb': {
            marginRight: -16,
            marginLeft: 0
        }
    }
}))

export default function AddBankPopup({ locale, strings, triggerBtn }) {
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
    const handleInputChange = (event) => {
        // setValue(event.target.value === '' ? '' : Number(event.target.value));
    };

    const handleBlur = () => {
        // if (value < 0) {
        //     setValue(0.00);
        // } else if (value > 100) {
        //     setValue(100.00);
        // }
    };
    const classes = useStyles();

    const submit = (e) => {
        e.preventDefault();

        post(route('addproperty'));
    };
    return (
        
        <Popup
            trigger={triggerBtn}
            modal
            nested
        >
            {close => (
                <div className={`modal w-36rem mx-auto p-6 sm:px-6 lg:px-8 bg-white rounded fav-shadow ${locale == "ar" ? "rtl dir-rtl" : "ltr dir-ltr"}`}>
                    <div className='flex mb-4 justify-between'>
            
                    <h3 className='font-bold text-base text-gray'>{strings.calculator}</h3> 
                    <button className="close focus:outline-none" onClick={close}>
                        <img src="/appIcons/close.svg" />
                    </button>
                    </div>
                    <hr style={{borderColor: "#6A6A6A",borderTopWidth: "2px"}} />
                    <div className="content">
                        <ValidationErrors errors={errors} />

                        <form onSubmit={submit} encType="multipart/form-data" className={locale == "ar" ? "dir-rtl" : "dir-ltr"}>

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
                                        className='w-16 rounded border text-base font-semibold border-gray-300 text-d-gray shadow-sm focus:border-d-gray dir-ltr'

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
                                            className='w-16 pr-4 rounded border border-gray-300 text-d-gray shadow-sm text-base font-semibold focus:border-d-gray dir-ltr'

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
                                            className='w-16 pr-4 rounded border text-base font-semibold border-gray-300 text-d-gray shadow-sm focus:border-d-gray dir-ltr'

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
                                            className='w-16 pr-4 rounded border border-gray-300 text-d-gray shadow-sm text-base font-semibold focus:border-d-gray dir-ltr'

                                        />
                                        <span className='flex justify-center items-center pr-2 absolute right-0 top-0 bottom-0 text-base font-semibold text-d-blue'>%</span>
                                    </div>

                                </div>

                                <div className={`my-4 flex items-center `}>
                                    <label forInput="period" className="w-40 block font-semibold text-sm text-l-gray py-2">{strings.period}</label>

                                    <div className='relative'>
                                        <input
                                            value={data.period}
                                            name="period"
                                            onChange={onHandleChange}
                                            onBlur={handleBlur}
                                            step="10.00"
                                            min="0.00"
                                            max="100.00"
                                            type='number'
                                            aria-labelledby="period"
                                            className='w-40 pr-4 rounded border border-gray-300 text-d-gray shadow-sm text-base font-semibold focus:border-d-gray'

                                        />
                                        <span className={`flex justify-center items-center mx-8 absolute ${locale == "ar" ? "left-0" : "right-0"} top-0 bottom-0 text-base font-semibold text-d-gray`}>{strings.month}</span>
                                    </div>

                                </div>
                                <div className="my-4 w-40 flex items-center justify-center ">
                                    <Button className="w-full flex justify-center" processing={processing}>
                                        {strings.calculate}
                                    </Button>
                                </div>
                                <div className={`my-4 flex items-center `}>
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
                                            className='w-40 pr-4 rounded border border-gray-300 text-d-gray shadow-sm text-base font-semibold focus:border-d-gray'

                                        />
                                        <span className={`flex justify-center items-center mx-8 absolute ${locale == "ar" ? "left-0" : "right-0"} top-0 bottom-0 text-base font-semibold text-d-gray`}>{strings.currency}</span>
                                    </div>

                                </div>
                        </form>
                    </div>
                </div>
            )}
        </Popup>
    )
};