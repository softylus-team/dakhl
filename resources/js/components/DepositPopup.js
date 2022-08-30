import React, { useRef } from 'react';
import Popup from 'reactjs-popup';
import Button from '@/Components/Button';
import Slider from '@mui/material/Slider';
import Radio from '@/Components/Radio';
import ValidationErrors from '@/Components/ValidationErrors';
import { useForm } from '@inertiajs/inertia-react';
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiSlider-thumb': {
            marginRight: -16,
            marginLeft: 0
        }
    }
}))
export default function DepositPopup({ locale, strings, triggerBtn, auth, bankAccounts }) {
    const theme = createTheme({
        direction: locale == "ar" ? 'rtl' : 'ltr',
    });

    // const [value, setValue] = React.useState(name,0.00);

    const handleSliderChange = (event, newValue) => {
        // setValue(newValue);
        setData(event.target.name, newValue);

    };
    // console.log(countriesStrings.countries);

    const { data, setData, post, processing, errors, reset } = useForm({
        bank_id: '',
        amount: '',
    });
    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'file' ? event.target.files : event.target.value);
    };
    const ref = useRef();
    const submit = (e) => {
        e.preventDefault();
        post(route('prepareCheckout'));
        ref.current.close();
        Object.keys(data).forEach(element => {
            data[element] = '';
        })

    };
    const handleBlur = () => {
        // if (value < 0) {
        //     setValue(0.00);
        // } else if (value > 100) {
        //     setValue(100.00);
        // }
    };
    const classes = useStyles();
    return (
        <Popup
            ref={ref}
            trigger={triggerBtn}
            modal
            nested
        >
            {close => (
                <div className={`modal max-w-2xl mx-auto p-6 sm:px-6 lg:px-8 bg-white rounded fav-shadow ${locale == "ar" ? "rtl dir-rtl" : "ltr dir-ltr"}`}>
                    <button className="close" onClick={close}>
                        <img src="/appIcons/close.svg" />
                    </button>
                    <div className="content">

                        <ValidationErrors errors={errors} />

                        <form onSubmit={submit} encType="multipart/form-data">

                            <div className={`my-4 flex items-center justify-between gap-6 ${locale == "ar" ? classes.root : ""}`}>
                                <label forInput="amount" className="w-18rem block font-semibold text-sm text-l-gray py-2">{strings.depositAmount}</label>
                                <ThemeProvider theme={theme}>
                                    <Slider
                                        value={data.amount}
                                        name="amount"
                                        onChange={handleSliderChange}
                                        aria-labelledby="amount"
                                        track={locale == "ar" ? 'inverted' : 'normal'}
                                    />
                                </ThemeProvider>

                                <input
                                    value={data.amount}
                                    name="amount"
                                    onChange={onHandleChange}
                                    onBlur={handleBlur}
                                    step="1.00"
                                    min="0.00"
                                    type='number'
                                    aria-labelledby="amount"
                                    className='w-16 rounded border text-base font-semibold border-gray-300 text-d-gray shadow-sm focus:border-d-gray dir-ltr'
                                    
                                />
                            </div>
                            {/* <div className='flex items-center gap-6'>
                                <img className="w-6 h-6" src="/appIcons/chooseAccount.svg" />
                                <p className='text-d-gray font-bold text-lg '>{strings.chooseAccount}</p>
                            </div> 
                             <div className="flex items-center sm:grid sm:grid-cols-3 gap-6">
                                {auth ?
                                    bankAccounts ?
                                        bankAccounts.map(function (account, index) {
                                            return (
                                                <label key={index} className={` border rounded ${data.bank_id == account.id ? "border-d-blue" : "border-gray-100"}`}>
                                                    <Radio
                                                        name="bank_id"
                                                        value={account.id}
                                                        handleChange={onHandleChange}
                                                        checked={data.bank_id == account.id ? true : false}
                                                        className="w-full h-full z-40 hidden"

                                                    />
                                                     <img className="w-full h-full p-4  object-contain mx-auto" src={"/appIcons/mastercard.svg"} /> 
                                                    <div className='flex justify-start items-center gap-2.5 p-6'>
                                                        <img src="/appIcons/account.svg" />
                                                        <div>
                                                            <p className="text-base font-semibold text-d-gray">
                                                                {account.holder_name}
                                                            </p>
                                                            <p className="text-sm font-normal text-l-gray ellipsis w-20" style={{ direction: "ltr" }}>
                                                                {account.account_number}
                                                            </p>
                                                        </div>

                                                    </div>
                                                </label>
                                            );
                                        }) :
                                        <AddBankPopup
                                            locale={locale}
                                            strings={strings}
                                            triggerBtn={
                                                <p className='underline text-l-gray text-base font-normal cursor-pointer'>{strings.addAccount}</p>

                                            } />
                                    : <>
                                         <label className={`w-40 h-20 border rounded ${data.card == 'master' ? "border-d-blue" : "border-gray-100"}`}>
                                    <Radio
                                        name="card"
                                        value="master"
                                        handleChange={onHandleChange}
                                        checked={data.card == 'master' ? true : false}
                                        className="w-full h-full z-40 hidden"

                                    />
                                    <img className="w-full h-full p-4  object-contain mx-auto" src={"/appIcons/mastercard.svg"} />

                                </label>

                                <label className={`w-40 h-20 border rounded ${data.card == 'visa' ? "border-d-blue" : "border-gray-100"}`}>
                                    <Radio
                                        name="card"
                                        value="visa"
                                        handleChange={onHandleChange}
                                        checked={data.card == 'visa' ? true : false}
                                        className="w-full h-full z-40 hidden"
                                    />
                                    <img className="w-full h-full p-4  object-contain mx-auto" src={"/appIcons/visacard.svg"} />

                                </label> 

                                    </>
                                }
                            </div> */}

                            <div className="my-4 flex items-center justify-center mt-4">
                                <Button className="w-1/2 flex justify-center" processing={processing}>
                                    {strings.depositMoney}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </Popup>
    )
};