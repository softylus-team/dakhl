import React , { useRef } from 'react';
import Popup from 'reactjs-popup';
import Button from '@/Components/Button';
import Input from '@/Components/Input';
import CountrySelect from '@/Components/country-state-city-select';
import Label from '@/Components/Label';
import ValidationErrors from '@/Components/ValidationErrors';
import {useForm } from '@inertiajs/inertia-react';
import Countries from "../../countries";
import LocalizedStrings from 'react-localization';

export default function AddBankPopup({locale, strings, triggerBtn }) {
    let countriesStrings = new LocalizedStrings(Countries);
    countriesStrings.setLanguage(locale);
    
    // console.log(countriesStrings.countries);

    const { data, setData, post, processing, errors, reset } = useForm({
        full_name: '',
        bank_name: '',
        branch_name: '',
        country: '',
        // state: '',
        // city: '',
        inter_code: '',
        iban: '',
        acc_number: '',
    });
    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'file' ? event.target.files : event.target.value);
    };
    const ref = useRef();
    const submit = (e) => {
        e.preventDefault();
        post(route('addBankAccount'));
        ref.current.close();
        Object.keys(data).forEach(element => {
            data[element]='';
        })

    };
    return (
        <Popup
        ref={ref}
            trigger={triggerBtn}
            modal
            nested
        >
            {close => (
                <div className={`modal max-w-2xl mx-auto p-6 sm:px-6 lg:px-8 bg-white rounded fav-shadow ${locale=="ar"?"rtl":"ltr"}`}>
                    <button className="close" onClick={close}>
                        <img src="/appIcons/close.svg" />
                    </button>
                    <div className="content">
                    
                        <ValidationErrors errors={errors} />

                        <form onSubmit={submit} encType="multipart/form-data">

                            <div className='my-4 '>
                                <h1 className='font-bold'>{strings.AddBankAccount}</h1>
                                <hr className='font-bold'/>
                            </div>
                            <div className='my-4'>
                                <Label forInput="full_name" value={strings.full_name} />
                                <Input
                                    type="text"
                                    name="full_name"
                                    value={data.full_name}
                                    placeholder={strings.full_name_place}
                                    className="mt-1 block w-full"
                                    autoComplete="full_name"
                                    isFocused={true}
                                    handleChange={onHandleChange}
                                    required
                                />
                            </div>

                            <div className='sm:flex justify-between gap-2.5'>
                                
                                <div className='sm:w-1/2 my-4'>
                                    <Label forInput="branch_name" value={strings.branch_name} />

                                    <Input
                                        type="text"
                                        name="branch_name"
                                        value={data.branch_name}
                                        placeholder={strings.branch_name_place}
                                        className="mt-1 block w-full"
                                        autoComplete="branch_name"
                                        handleChange={onHandleChange}
                                        required

                                    />
                                </div>
                                <div className='sm:w-1/2 my-4'>
                                    <Label forInput="bank_name" value={strings.bank_name} />

                                    <Input
                                        type="text"
                                        name="bank_name"
                                        value={data.bank_name}
                                        placeholder={strings.bank_name_place}
                                        className="mt-1 block w-full"
                                        autoComplete="bank_name"
                                        handleChange={onHandleChange}
                                        required

                                    />
                                </div>
                            </div>
                            <div className='sm:flex justify-between gap-2.5'>

                               
                                <div className='sm:w-1/2 my-4'>
                                    <Label forInput="inter_code" value={`${strings.inter_code} Swift/BIC code`} />

                                    <Input
                                        type="text"
                                        name="inter_code"
                                        value={data.inter_code}
                                        placeholder={strings.inter_code_place}
                                        className="mt-1 block w-full"
                                        handleChange={onHandleChange}
                                        required
                                    />
                                </div>
                                <div className='sm:w-1/2 my-4'>
                                    <Label forInput="country" value={strings.country} />
                                    <CountrySelect
                                        name="country"
                                        value={data.country}
                                        placeholder={strings.country_place}
                                        handleChange={onHandleChange}
                                        items={countriesStrings.countries} />

                                </div>
                                {/* <div>
                                    <Label forInput="state" value="State" />
                                    <CountrySelect
                                        name="state"
                                        value={data.state}
                                        handleChange={onHandleChange}
                                        items={states} />

                                </div>
                                <div>
                                    <Label forInput="city" value="City" />
                                    <CountrySelect
                                        name="city"
                                        value={data.city}
                                        handleChange={onHandleChange}
                                        items={cities} />

                                </div> */}
                            </div>

                            <div className='my-4'>
                                <Label forInput="iban" value={strings.iban} />

                                <Input
                                    type="text"
                                    name="iban"
                                    value={data.iban}
                                    placeholder={strings.iban_place}
                                    className="mt-1 block w-full"
                                    handleChange={onHandleChange}
                                    required
                                />
                            </div>
                            <div className='my-4'>
                                <Label forInput="acc_number" value={strings.acc_number} />

                                <Input
                                    type="number"
                                    name="acc_number"
                                    value={data.acc_number}
                                    placeholder={strings.acc_number_place}
                                    className="mt-1 block w-full"
                                    handleChange={onHandleChange}
                                    required
                                />
                            </div>
                            
                            <div className="my-4 flex items-center justify-center mt-4">
                                <Button className="w-1/2 flex justify-center" processing={processing}>
                                    {strings.addAccount}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </Popup>
    )
};