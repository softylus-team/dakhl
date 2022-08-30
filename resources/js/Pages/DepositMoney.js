import React from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Link, Head } from '@inertiajs/inertia-react';
import LocalizedStrings from 'react-localization';
import stringss from "../../strings";
import Button from '@/Components/Button';
import Container from '@/components/container';
import Slider from '@mui/material/Slider';
import AddIcon from '@/Components/AddIcon';
import Radio from '@/Components/Radio';
import ValidationErrors from '@/Components/ValidationErrors';
import { useForm } from '@inertiajs/inertia-react';
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { makeStyles } from '@mui/styles'
import AddBankPopup from '@/components/AddBankPopup'

const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiSlider-thumb': {
            marginRight: -16,
            marginLeft: 0
        }
    }
}));
export default function DepositMoney(props) {
    // console.log(props.stakes);
    let strings = new LocalizedStrings(stringss);
    strings.setLanguage(props.locale);
    const theme = createTheme({
        direction: props.locale == "ar" ? 'rtl' : 'ltr',
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
        paymentBrand: '',
        paymentMethod: '',
        fromWallet:true,
    });
    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'file' ? event.target.files : event.target.value);
    };
    const submit = (e) => {
        e.preventDefault();
        post(route('prepareCheckout'));
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
        <Authenticated
            locale={props.locale}
            auth={props.auth}
            errors={props.errors}
            header={strings.depositMoney}
            menu={props.menu}
            strings={strings}
        >
            <Head title={strings.depositMoney} />
            <Container>
                <h2 className='mb-2 font-semibold text-d-blue text-base'>{strings.wallet}/<span className='font-semibold text-l-gray text-base'>{strings.depositMoney}</span></h2>
                <hr />
                <ValidationErrors errors={errors} />

                <form onSubmit={submit} encType="multipart/form-data">
                    <label forInput="amount" className="w-18rem block font-semibold text-lg text-d-gray py-2">{strings.depositAmount}</label>
                    <div className={`sm:w-2/3 my-4 flex items-center justify-between gap-6 ${props.locale == "ar" ? classes.root : ""}`}>
                        <ThemeProvider theme={theme}>
                            <Slider
                                value={data.amount}
                                name="amount"
                                onChange={handleSliderChange}
                                aria-labelledby="amount"
                                track={props.locale == "ar" ? 'inverted' : 'normal'}
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
                    <hr />
                    <div className='sm:w-2/3'>
                        <label className="w-18rem block font-semibold text-lg text-d-gray py-2">{strings.paymentMethod}</label>
                        <label forInput="paymentMethod" className={`w-18rem flex items-center gap-2.5 font-semibold text-lg  py-2 ${data.paymentMethod == 'cards' ? "text-d-blue" : "text-l-gray"}`}>
                            <Radio
                                name="paymentMethod"
                                value="cards"
                                handleChange={onHandleChange}
                                checked={data.paymentMethod == 'cards' ? true : false}
                                className=""

                            /><p>{strings.paymentCard}</p>
                        </label>
                        <div className={`flex items-center gap-6 mb-6 ${data.paymentMethod == 'cards' ? "block" : "hidden"}`}>

                            <label className={`w-40 h-20 border rounded ${data.paymentBrand == 'APPLEPAY' ? "border-d-blue" : "border-gray-100"}`}>
                                <Radio
                                    name="paymentBrand"
                                    value="APPLEPAY"
                                    handleChange={onHandleChange}
                                    checked={data.paymentBrand == 'APPLEPAY' ? true : false}
                                    className="w-full h-full z-40 hidden"
                                />
                                <img className="w-full h-full p-4  object-contain mx-auto" src={"/appIcons/APPLEPAY.png"} />

                            </label>
                            <label className={`w-40 h-20 border rounded ${data.paymentBrand == 'MADA' ? "border-d-blue" : "border-gray-100"}`}>
                                <Radio
                                    name="paymentBrand"
                                    value="MADA"
                                    handleChange={onHandleChange}
                                    checked={data.paymentBrand == 'MADA' ? true : false}
                                    className="w-full h-full z-40 hidden"
                                />
                                <img className="w-full h-full p-4  object-contain mx-auto" src={"/appIcons/MADA.png"} />

                            </label>
                            <label className={`w-40 h-20 border rounded ${data.paymentBrand == 'STC_PAY' ? "border-d-blue" : "border-gray-100"}`}>
                                <Radio
                                    name="paymentBrand"
                                    value="STC_PAY"
                                    handleChange={onHandleChange}
                                    checked={data.paymentBrand == 'STC_PAY' ? true : false}
                                    className="w-full h-full z-40 hidden"
                                />
                                <img className="w-full h-full p-4  object-contain mx-auto" src={"/appIcons/STC_PAY.png"} />

                            </label>
                        </div>
                        <hr />
                        <div className='flex justify-between items-center pointer-events-none'>
                            <label forInput="paymentMethod" className={`w-18rem flex items-center gap-2.5 font-semibold text-lg  py-2 ${data.paymentMethod == 'bankAccount' ? "text-d-blue" : "text-l-gray"}`}>
                                <Radio
                                    name="paymentMethod"
                                    value="bankAccount"
                                    handleChange={onHandleChange}
                                    checked={data.paymentMethod == 'bankAccount' ? true : false}
                                    className=""

                                /><p>{strings.bankAccount}</p>
                            </label>
                            <AddBankPopup
                                locale={props.locale}
                                strings={strings}
                                triggerBtn={
                                    <div className={`flex items-center gap-2.5 ${data.paymentMethod == 'bankAccount' ? "text-d-blue cursor-pointer" : "text-l-gray pointer-events-none"}`}>
                                        <AddIcon fill={data.paymentMethod == 'bankAccount' ? "#02044F" : "#6A6A6A"} />
                                        <p className=' text-base font-normal'>{strings.addAccount}</p>

                                    </div>
                                } />
                        </div>

                        <div className={`${data.paymentMethod == 'bankAccount' ? "block" : "hidden"}`}>
                            {props.bankAccounts ?
                                props.bankAccounts.map(function (account, index) {
                                    return (
                                        <label key={index} className={`w-full block my-4 border rounded bg-white ${data.bank_id == account.id ? "border-d-blue" : "border-gray-100"}`}>
                                            <Radio
                                                name="bank_id"
                                                value={account.id}
                                                handleChange={onHandleChange}
                                                checked={data.bank_id == account.id ? true : false}
                                                className="w-full h-full z-40 hidden"

                                            />
                                            <div className='flex justify-between items-center gap-2.5 p-6'>
                                                <p className="text-base font-normal text-l-gray">
                                                    {account.holder_name}
                                                </p>
                                                <p className="text-base font-normal text-l-gray">
                                                    {account.bank_name}
                                                </p>
                                                <p className="text-sm font-normal text-l-gray ellipsis w-20" style={{ direction: "ltr" }}>
                                                    {account.account_number}
                                                </p>
                                            </div>
                                        </label>
                                    );
                                }) :
                                ""}
                        </div>
                    </div>

                    <div className="my-4 flex items-center justify-center gap-2.5 sm:w-2/3">
                        <Button className="w-1/2 flex justify-center" processing={processing}>
                            {strings.depositMoney}
                        </Button>
                        <Link href={route("wallet")} className='block w-1/2 text-center rounded p-2 text-base font-semibold border border-d-blue text-d-blue' >
                                            {strings.cancel}
                                        </Link>
                    </div>
                </form>
            </Container>
        </Authenticated>
    );
}
