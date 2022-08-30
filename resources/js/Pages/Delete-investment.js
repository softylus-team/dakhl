import React, { useEffect } from 'react';
import Button from '@/Components/Button';
import Authenticated from '@/Layouts/Authenticated';
import Input from '@/Components/Input';
import LocalizedStrings from 'react-localization';
    import stringss from "../../strings";
import ValidationErrors from '@/Components/ValidationErrors';
import { Head, Link, useForm } from '@inertiajs/inertia-react';

export default function deleteinvestment(props) {
    let strings = new LocalizedStrings(stringss);
    strings.setLanguage(props.locale);
    const { data, setData, post, processing, errors, reset } = useForm({
        name: props.Property.name,
        investment_id: props.Investment.id,
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

        post(route('deleteinvestment'));
    };

    return (
        <Authenticated
        locale={props.locale}
        auth={props.auth}
        errors={props.errors}
        header={strings.wallet}
        menu={props.menu}
        strings={strings}>
            <Head title="Cancel investment" />
            <div className="max-w-6xl mx-auto mt-6 mb-6 sm:px-6 lg:px-8">
            <ValidationErrors errors={errors} />
          
            <form onSubmit={submit}>
                <h1 className='text-center font-bold'>You are about to cancel investment in property: {data.name}. Are you sure?</h1>
                <Input
                        type="hidden"
                        name="investment_id"
                        value={data.investment_id}
                        className="mt-1 block w-full"
                        handleChange={onHandleChange}
                        required
                    />
                

                 <div className="flex items-center justify-center mt-4">
                

                    <Button className="mx-4" processing={processing}>
                        Confirm Cancel investment
                    </Button>
                    <Link href={route("myaccount",props.auth.user.id)} className="inline-flex items-center px-4 py-2 bg-gray-900 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-1px active:bg-gray-900 transition ease-in-out duration-150">
                                            Back to investments
                                        </Link>
                </div> 
            </form>
            </div>
            </Authenticated>
    );
}
