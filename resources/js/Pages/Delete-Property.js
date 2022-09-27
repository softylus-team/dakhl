import React, { useEffect } from 'react';
import Button from '@/Components/Button';
import Authenticated from '@/Layouts/Authenticated';
import Input from '@/Components/Input';
import stringss from "../../strings";
// import LocalizedStrings from 'react-localization';
import ValidationErrors from '@/Components/ValidationErrors';
import { Head, Link, useForm } from '@inertiajs/inertia-react';

export default function UpdateProperty(props) {
    const { data, setData, post, processing, errors, reset } = useForm({
        id: props.Property.id,
        name: props.Property.name,
    });

    // useEffect(() => {
    //     return () => {
    //         reset('password', 'password_confirmation');
    //     };
    // }, []);

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('deleteproperty'));
    };
    // let strings = new LocalizedStrings(stringss);
    // strings.setLanguage(props.locale);
    return (
        <Authenticated
        auth={props.auth}
        errors={props.errors}
        header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Delete Propery: {data.name}</h2>}
        menu={props.menu}
        strings={stringss}
    >

    <div className="max-w-6xl mx-auto mt-6 mb-6 sm:px-6 lg:px-8">
            <Head title="Delete Property" />
            <ValidationErrors errors={errors} />
          
            <form onSubmit={submit}>
                <h1 className='text-center font-bold'>You are about to delete Property: {data.name}. Are you sure?</h1>
                <Input
                        type="hidden"
                        name="id"
                        value={data.id}
                        className="mt-1 block w-full"
                        handleChange={onHandleChange}
                        required
                    />
                

                 <div className="flex items-center justify-center mt-4">
                

                    <Button className="mx-4" processing={processing}>
                        Confirm Delete Property
                    </Button>
                    <Link href={route("properties")} className="inline-flex items-center px-4 py-2 bg-gray-900 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-1px active:bg-gray-900 transition ease-in-out duration-150">
                                            Back to properties
                                        </Link>
                </div> 
            </form>
            </div>
            </Authenticated>
    );
}
