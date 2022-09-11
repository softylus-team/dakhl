import React, { useEffect } from 'react';
import Button from '@/Components/Button';
import Checkbox from '@/Components/Checkbox';
import Guest from '@/Layouts/Guest';
import Input from '@/Components/Input';
import Label from '@/Components/Label';
import Container from '@/components/container';
import ValidationErrors from '@/Components/ValidationErrors';
import { Head, Link, useForm } from '@inertiajs/inertia-react';
import stringss from "../../strings";
import LocalizedStrings from 'react-localization';

export default function Login({ locale, status, canResetPassword }) {
    let strings = new LocalizedStrings(stringss);
    strings.setLanguage(locale);

    const { data, setData, post, processing, errors, reset } = useForm({
        phone: '',

    });

    useEffect(() => {
        return () => {
            reset('phone');
        };
    }, []);

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('LoginOTP'));
    };

    return (
        <Guest
            locale={locale}
            auth={null}
            header={strings.login}
            strings={strings}>
            <Head title="Log in" />

            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}
            <Container>

            
            <ValidationErrors errors={errors} />

            <form onSubmit={submit}>

                <div className="mt-4">
                    <Label forInput="phone" value={strings.phone} />

                    <Input
                        type="text"
                        name="phone"
                        value={data.phone}
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                        handleChange={onHandleChange}
                    />
                </div>

                <div className="block mt-4">
                    <label className="flex items-center ">
                        <Checkbox name="remember" value={data.remember} handleChange={onHandleChange} />

                        <span className="ml-2 text-sm text-gray-600 mx-2" >{strings.RememberMe}</span>
                    </label>
                </div>

                <div className="flex items-center justify-end mt-4">
                    <Button className="ml-4 " processing={processing}>
                    {strings.Next}
                    </Button>
                </div>
            </form>
            </Container>
        </Guest>
    );
}
