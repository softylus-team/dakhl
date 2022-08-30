import React, { useState } from 'react';
import { Link, Head, useForm } from '@inertiajs/inertia-react';
import Authenticated from '@/Layouts/Authenticated';
import Button from '@/Components/Button';
import Textarea from '@/Components/Textarea';
import Label from '@/Components/Label';
import Input from '@/Components/Input';
import ValidationErrors from '@/Components/ValidationErrors';
// import PropertiesCollection from "../components/Properties";
export default function liquidize(props) {
    // console.log(props.Property);
    // console.log(props.Investment);
    // console.log(props.auth.user);
    const { data, setData, post, processing, errors, reset } = useForm({
        property_id: props.Property.id,
        investment_id: props.Investment.id,
        amount: '',
        // period: '',
    });
    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'file' ? event.target.files : event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('update-investment'));
    };


    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Liquidize Investment</h2>}
        >
            <Head title="Liquidize Investment" />
            <div className="max-w-6xl mx-auto mt-6 mb-6 sm:px-6 lg:px-8">
                {props.flash.success ?
                    <div class="flex items-center bg-blue-500 text-white text-sm font-bold px-4 py-3" role="alert">
                        <svg class="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z" /></svg>
                        <p> {props.flash.success} </p>
                    </div> : ""}
                <ValidationErrors errors={errors} />

                <form onSubmit={submit}>
                    <div>
                        <Label forInput="property_id" value={`Liquidize the investment in property : ${props.Property.name}`} />

                        <Input
                            type="hidden"
                            name="property_id"
                            value={data.property_id}
                            className="mt-1 block w-full"
                            handleChange={onHandleChange}

                        />
                    </div>
                    <div>

                        <Input
                            type="hidden"
                            name="investment_id"
                            value={data.investment_id}
                            className="mt-1 block w-full"
                            handleChange={onHandleChange}

                        />
                    </div>
                    <div>
                        <Label forInput="amount" value="amount" />

                        <Input
                            type="number"
                            name="amount"
                            value={data.amount}
                            className="mt-1 block w-full"
                            isFocused={true}
                            handleChange={onHandleChange}

                        />
                    </div>
                    {/* <div className="mt-4">
                        <Label forInput="period" value="Hold Duration" />

                        <Input
                            type="number"
                            name="period"
                            value={data.period}
                            className="mt-1 block w-full"
                            autoComplete="birth_date"
                            handleChange={onHandleChange}

                        />

                    </div> */}


                    <div className="flex items-center justify-end mt-4">

                        <Button className="ml-4" processing={processing}>
                            Liquidize
                        </Button>
                    </div>
                </form>



            </div>
        </Authenticated >
    );
}
