
import React, { useEffect } from 'react';
import Button from '@/Components/Button';
import Input from '@/Components/Input';
import Radio from '@/Components/Radio';
import Label from '@/Components/Label';
import Select from '@/Components/SelectMui';
import ValidationErrors from '@/Components/ValidationErrors';
import { Head, Link, useForm } from '@inertiajs/inertia-react';


export default function PropertiesFilterForm({ locale, strings }) {
    function Placeholder({icon,title }) {
        return (
            <div className='flex items-center sm:gap-2.5'>
                <img className='sm:h-7 h-5' src={icon} />
                <p className='text-sm text-d-gray'>{title}</p>
            </div>
        );
    }
    const { data, setData, post, processing, errors, reset } = useForm({
        propertyStatus: '',
        minimumPrice: '',
        expectedProfit: '',
        companies: '',
        location:'',
    });


    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    
    const onHandleChange = (event) => {
        console.log("hhh");
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);

    };

    const submit = (e) => {
        e.preventDefault();
        setData(e.target.name, e.target.type === 'checkbox' ? e.target.checked : e.target.value);
        setData(location,"ffffffff")
        post(route('updateProperties'));
    };
    return (
        <div className="">
            <ValidationErrors errors={errors} />
            <form onSubmit={submit} encType="multipart/form-data" className='sm:flex grid grid-cols-3 items-center justify-between sm:gap-6 gap-2.5'>
                {/* <div className='sm:w-1/6'> */}


                    <Select
                        name="propertyStatus"
                        locale={locale}
                        data={strings.propertyStatuses}
                        handleChange={onHandleChange}                        
                        placeholder={<Placeholder icon={"/appIcons/property.svg"} title={strings.properties}/>}
                    />
                {/* </div> */}
                <div className='sm:w-1/6'>
                    <Select
                        name="minimumPrice"
                        locale={locale}
                        data={strings.minimumPrices}                        
                        handleChange={onHandleChange}
                        placeholder={<Placeholder icon={"/appIcons/minimumPrice.svg"} title={strings.minimumPrice}/> }
                    />
                </div>
                <div className="sm:w-1/6">

                    <Select
                        name="expectedProfit"
                        locale={locale}
                        data={strings.expectedProfits}
                        handleChange={onHandleChange}
                        placeholder={ <Placeholder icon={"/appIcons/expectedProfit.svg"} title={strings.expectedProfit2}/>}
                    />
                </div>
                <div className="sm:w-1/6">


                    <Select
                        name="companies"
                        locale={locale}
                        data={strings.companies}
                        handleChange={onHandleChange}
                        placeholder={ <Placeholder icon={"/appIcons/companies.svg"} title={strings.company}/> }
                    />
                </div>
                <div className="sm:w-1/6">
                    <Select
                        name="location"
                        locale={locale}
                        data={strings.locations}
                        handleChange={onHandleChange}
                        placeholder={ <Placeholder icon={"/appIcons/locations.svg"} title={strings.location}/> }
                    />
                </div>

                <div className="sm:w-1/6 flex items-center justify-center">
                    <Button className=" w-full flex justify-center" processing={processing}>
                        {strings.apply}
                    </Button>
                </div>
            </form>
        </div>
    );
}
