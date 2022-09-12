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
            strings={strings}
            >
            {/* <Head title="Log in" /> */}

            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}
            <Container>

            
            <ValidationErrors errors={errors} />
            <Container className={"header_background_login dir-ltr"}>
                <div className='flex items-end' style={{ height: "52%" }}>
                    <div className='w-3/4'></div>
                    <div className='sm:w-1/4'>
                    </div>
                </div>

            </Container>
                    <form className='d-flex align-items-center flex-column w-55 text-center sm:w-2/5 mx-auto' onSubmit={submit}>
                        <div className="sm:text-3xl text-xl text-d-gray font-bold">
                            <h2>{strings.login}</h2>
                            <p className='sm:text-lg text-base text-l-gray font-normal  p-3'>{strings.loginParagraph}</p>
                        </div>
                        <div className="d-flex flex-column ">
                            <Label forInput="phone" className=" flex wh-full font-bold text-d-blue" value={strings.phone}  />
                            <div className="flex ">
                            <img src="/appIcons/mobilephone.svg" className="w-10" />
                            <Input
                                type="text"
                                name="phone"
                                value={data.phone}
                                className="flex items-center justify-center"
                                autoComplete="current-password"
                                handleChange={onHandleChange}
                                placeholder="12 123 1234 669+"
                            />
                        </div>
                        </div>
                        <div className="flex items-center justify-center text-center w-full mt-8">
                            <Button className="mt-1 block flex items-center justify-center w-full text-center" processing={processing}>
                            {strings.Next}
                            </Button>
                        </div>
                        <div className="sm:text-3xl text-xl text-d-gray">
                            <p className='sm:text-lg text-base text-l-gray font-normal  p-3'>{strings.loginRegister}
                            <Link className="mr-2 font-bold text-d-blue " href={route('register')}>
                                            {strings.registerLogin}
                            </Link>
                            </p>
                        </div>
                    </form>
            </Container>
        </Guest>
    );
}
