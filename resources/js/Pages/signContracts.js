import React, { useEffect, useState } from 'react';
import { Link, Head, useForm } from '@inertiajs/inertia-react';
import AddStake from '@/Components/AddStake';
import AddInvestment from '@/Components/AddInvestment';
import LocalizedStrings from 'react-localization';
import stringss from "../../strings";
import Guest from '@/Layouts/Guest';
import PropertyComponent from '@/components/property';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Container from '@/components/container';
import PaymentSteps from '@/Components/PaymentSteps';
import Slider from '@mui/material/Slider';
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { makeStyles } from '@mui/styles'
import AddBankPopup from '@/components/AddBankPopup'
import Radio from '@/Components/Radio';
import Checkbox from '@/Components/Checkbox';
import Button from '@/Components/Button';
import Popup from 'reactjs-popup';
import AddIcon from '@/Components/AddIcon';

// import PropertiesCollection from "../components/Properties";

const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiSlider-thumb': {
            marginRight: -16,
            marginLeft: 0
        }
    }
}))
export default function signContracts(props) {
    let strings = new LocalizedStrings(stringss);
    strings.setLanguage(props.locale);
    const Property = props.Property;
    // console.log(Property);
    const { data, setData, post, processing, errors, reset } = useForm({
        investValue: 0,
        card: '',
        confirmation: true,
        property_id: Property.id,
        user_id: props.auth.user.id,
        bank_id: '',
        state: '',
        period: '',
        paymentBrand: '',
        paymentMethod: 'wallet'
    });
    const theme = createTheme({
        direction: props.locale == "ar" ? 'rtl' : 'ltr',
    });

    // const [value, setValue] = React.useState(name,0.00);

    const handleSliderChange = (event, newValue) => {
        // setValue(newValue);
        setData(event.target.name, newValue);

    };
    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.type === 'file' ? event.target.files : event.target.value);
    };
    const handleBlur = () => {
        // if (value < 0) {
        //     setValue(0.00);
        // } else if (value > 100) {
        //     setValue(100.00);
        // }
    };
    const submit = (e) => {
        e.preventDefault();
        if(data.paymentMethod=='wallet'){
            if(data.investValue>parseInt(props.totalBalance)){
            alert("your balance is insufficent");
            return;
        }
        if(data.investValue<parseInt(Property.financialPlan.minimum_investment)){
            alert("your investment amount is below the minimum investment amount for this property");
            return;
        }
        }
        
        post(route('add-stake'));
    };
    const classes = useStyles()
    return (
        <Guest
            locale={props.locale}
            auth={props.auth}
            errors={props.errors}
            header={strings.payment}
            menu={props.menu}
            strings={strings}
        >
            <Head title={strings.payment} />
            <Container className={"sm:my-8 my-4"}>
                <h2 className='hidden sm:block mb-2 font-semibold text-d-gray text-base'>{strings.home}/{strings.properties}/{Property.name}/<span className='font-semibold text-l-gray text-base'>{strings.payment}</span></h2>
                <hr className='hidden sm:block'/>
                <PaymentSteps step={1} strings={strings} />
            </Container>
            <Container className={"flex gap-40 py-4"}>
                <div className='sm:w-2/3'>
                    <div className='flex items-center sm:gap-6 gap-2.5'>
                        <img className="w-6 h-6" src="/appIcons/detailsSingle.svg" />
                        <p className='text-d-gray font-bold sm:text-lg text-base'>{strings.details}</p>
                    </div>
                    <p className={`text-l-gray text-sm sm:text-base p-2 ${props.locale == 'ar' ? "sm:pr-12" : "sm:pl-12"}`}>{Property.description}</p>
                    <hr className='my-4' />
                    <div className='flex items-center sm:gap-6 gap-2.5'>
                        <img className="w-6 h-6" src="/appIcons/investmentAmount.svg" />
                        <p className='text-d-gray font-bold sm:text-lg text-base '>{strings.investmentAmount}</p>
                    </div>

                    <div className={`my-4 px-2 flex items-center justify-between gap-6 ${props.locale == "ar" ? classes.root : ""}`}>
                        <label htmlFor="investValue" className="w-18rem hidden sm:block font-semibold text-sm text-l-gray py-2">{strings.investValue}</label>
                        <ThemeProvider theme={theme}>
                            <Slider
                                value={data.investValue}
                                name="investValue"
                                id="investValue"
                                max={10000}
                                onChange={handleSliderChange}
                                aria-labelledby="investValue"
                                track={props.locale == "ar" ? 'inverted' : 'normal'}
                            />
                        </ThemeProvider>

                        <input
                            value={data.investValue}
                            name="investValue"
                            onChange={onHandleChange}
                            onBlur={handleBlur}
                            step="10.00"
                            min="0.00"
                            type='number'
                            aria-labelledby="investValue"
                            className='sm:w-32 w-20 rounded border-none text-base font-semibold  text-d-gray  focus:ring-0 dir-ltr'
                        />
                    </div>
                    <div className='flex items-center justify-between h-24 ' style={{ backgroundColor: "#F1F1F1" }}>
                        <p className='text-lg font-normal p-4 text-l-gray'>{strings.totalAmount}</p>
                        <div className='flex items-center gap-2.5 w-1/2'>
                            <input disabled
                                value={data.investValue}
                                name="investValue"
                                onChange={onHandleChange}
                                onBlur={handleBlur}
                                type='text'
                                aria-labelledby="investValue"
                                className='w-20 rounded  border-none p-0 text-xl font-bold  text-d-blue  focus:ring-0 dir-ltr pointer-events-none'
                                style={{ backgroundColor: "#F1F1F1" }}
                            />
                            <p className='text-xl font-bold  text-d-blue'>{strings.currency}</p>
                        </div>

                    </div>
                    <hr className='my-4' />
                    <div className='flex items-center sm:gap-6 gap-2.5'>
                        <img className="w-6 h-6" src="/appIcons/chooseAccount.svg" />
                        <p className='text-d-gray font-bold sm:text-lg text-base '>{strings.paymentMethod}</p>
                    </div>
                    <div className='sm:w-2/3'>
                        <div className='flex justify-between items-center'>
                            <label  className={`w-18rem flex items-center gap-2.5 font-semibold text-lg  py-2 ${data.paymentMethod == 'wallet' ? "text-d-blue" : "text-l-gray"}`}>
                                <Radio
                                    name="paymentMethod"
                                    value="wallet"
                                    handleChange={onHandleChange}
                                    checked={data.paymentMethod == 'wallet' ? true : false}
                                    className=""

                                /><p>{strings.wallet}</p>
                            </label>
                            <div className={`flex items-center justify-end w-1/2 gap-2.5 ${data.paymentMethod == 'wallet' ? "text-d-blue" : "text-l-gray"}`}>
                                <p className='text-base font-bold'><span className="text-sm font-normal text-l-gray">{strings.totalBalance}</span> {props.totalBalance} {strings.currency}</p>
                            </div>
                        </div>
                        <hr />
                        <label  className={`w-18rem flex items-center gap-2.5 font-semibold text-lg  py-2 ${data.paymentMethod == 'cards' ? "text-d-blue" : "text-l-gray"}`}>
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
                            <label  className={`w-18rem flex items-center gap-2.5 font-semibold text-lg  py-2 ${data.paymentMethod == 'bankAccount' ? "text-d-blue" : "text-l-gray"}`}>
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
                    <label className='flex my-8 items-center gap-2.5'>
                        <Checkbox
                            name="confirmation"
                            value="visa"
                            handleChange={onHandleChange}
                            checked={data.confirmation}
                            className="w-full h-full z-40 hidden"
                        />
                        <div className='text-base font-normal  text-d-gray'>
                            {strings.confirmCheckbox}
                            <input disabled
                                value={data.investValue}
                                name="investValue"
                                onChange={onHandleChange}
                                onBlur={handleBlur}
                                type='text'
                                aria-labelledby="investValue"
                                className='w-14 text-center rounded border-none mx-2 p-0 text-base font-normal  text-d-gray  focus:ring-0 dir-ltr pointer-events-none'
                                style={{ backgroundColor: "transparent" }}
                            />
                            {strings.currency} {strings.formYourBalance}

                        </div>


                    </label>
                    <div className='flex items-center w-5/6 gap-2.5'>
                        <Popup
                            trigger={
                                <Button type="button" className=" w-1/2 flex justify-center">
                                    {strings.pay}
                                    <input disabled
                                        value={data.investValue}
                                        name="investValue"
                                        onChange={onHandleChange}
                                        onBlur={handleBlur}
                                        type='text'
                                        aria-labelledby="investValue"
                                        className='w-14 text-center rounded border-none mx-2 p-0 text-base font-normal  text-white  focus:ring-0 dir-ltr pointer-events-none'
                                        style={{ backgroundColor: "transparent" }}
                                    />
                                    {strings.currency}
                                </Button>
                            }
                            modal
                            nested
                        >
                            <form onSubmit={submit} className="w-1/3 mx-auto" encType="multipart/form-data">
                                <div className={`p-4 h-56 flex flex-col justify-between items-center gap-6 text-center bg-white rounded fav-shadow ${props.locale == 'ar' ? "dir-rtl rtl" : ""}`}>
                                    <p className='text-d-gray text-xl font-bold'>{strings.payConfirmation}</p>
                                    <div className='text-d-gray text-base font-semibold'>{strings.ConfirmationMsg} {Property.name} {strings.and}{strings.pay} <input disabled
                                        value={data.investValue}
                                        name="investValue"
                                        onChange={onHandleChange}
                                        onBlur={handleBlur}
                                        type='text'
                                        aria-labelledby="investValue"
                                        autoFocus={false}
                                        className='w-14 text-center inline rounded border-none mx-2 p-0 text-base font-bold  text-d-blue  focus:ring-0 dir-ltr pointer-events-none'
                                        style={{ backgroundColor: "transparent" }}
                                    /> <span className='text-base font-bold text-d-blue'>{strings.currency}</span></div>
                                    <div className=' w-full flex items-center gap-2.5'>
                                        <Button className=" w-1/2 flex justify-center" processing={processing}>
                                            {strings.confirmPay}
                                            <input disabled
                                                value={data.investValue}
                                                name="investValue"
                                                onChange={onHandleChange}
                                                onBlur={handleBlur}
                                                type='text'
                                                aria-labelledby="investValue"
                                                className='w-10 text-center rounded border-none mx-2 p-0 text-base font-normal  text-white  focus:ring-0 dir-ltr pointer-events-none'
                                                style={{ backgroundColor: "transparent" }}
                                            />
                                            {strings.currency}
                                        </Button>
                                        <Link href={route("/")} className='block w-1/2 text-center rounded p-2 text-base font-semibold border border-d-blue text-d-blue' >
                                            {strings.goToHome}
                                        </Link>
                                    </div>
                                </div>
                                <input
                                    type="hidden"
                                    name="property_id"
                                    value={data.property_id}
                                    className="mt-1 block w-full"
                                    onChange={onHandleChange}

                                /><input
                                    type="hidden"
                                    name="user_id"
                                    value={data.user_id}
                                    className="mt-1 block w-full"
                                    onChange={onHandleChange}

                                />
                            </form>
                        </Popup>

                        <Link href={route("/")} className='block w-1/2 text-center rounded p-2 text-base font-semibold border border-d-blue text-d-blue' >
                            {strings.goToHome}
                        </Link>
                    </div>

                </div>
                <div className='hidden sm:block w-1/3'>
                    <PropertyComponent property={Property} strings={strings} locale={props.locale} />

                </div>
                {/* {props.flash.success ?
                    <div className="flex items-center bg-blue-500 text-white text-sm font-bold px-4 py-3" role="alert">
                        <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z" /></svg>
                        <p> {props.flash.success} </p>
                    </div> : ""}

                <Tabs>
                    <TabList>
                        <Tab>Add stake</Tab>
                        <Tab>add investment</Tab>
                    </TabList>
                    <TabPanel>
                        <AddStake auth={props.auth} user_balance={props.user_balance} Property={props.Property} errors={props.errors} />
                    </TabPanel>
                    <TabPanel>
                        <AddInvestment auth={props.auth} Property={props.Property} stakes={props.Stakes} errors={props.errors} />
                    </TabPanel>
                </Tabs> */}
            </Container>
        </Guest >
    );
}
