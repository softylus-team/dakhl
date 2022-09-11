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

export default function LoginVerify(props ) {
    let strings = new LocalizedStrings(stringss);
    strings.setLanguage(props.locale);

    const { data, setData, post, processing, errors } = useForm({
        verification_code: '',
        phone: props.phone,

    });

    

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('VerifyOTP'));
    };


    return (
        <Guest
            locale={props.locale}
            auth={null}
            header={strings.login}
            strings={strings}>
            <Head title="Log in" />

            {props.status && <div className="mb-4 font-medium text-sm text-green-600">{props.status}</div>}
            <Container>

            
            <ValidationErrors errors={errors} />

            <form onSubmit={submit}>

                <div className="mt-4">
                    <Label forInput="verification_code" value="OTP" />

                    <Input
                        type="number"
                        name="verification_code"
                        value={data.verification_code}
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                        handleChange={onHandleChange}
                    />
                </div>
                
                <div className="flex items-center justify-end mt-4">
                    <Button className="ml-4 " processing={processing}>
                    {strings.login}
                    </Button>
                </div>
            </form>
            </Container>
        </Guest>
    );
}
