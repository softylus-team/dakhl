import React, { useEffect } from 'react';
import Button from '@/Components/Button';
import Guest from '@/Layouts/Guest';
import Input from '@/Components/Input';
import Radio from '@/Components/Radio';
import Label from '@/Components/Label';
import ValidationErrors from '@/Components/ValidationErrors';
import { Head, Link, useForm } from '@inertiajs/inertia-react';
import stringss from "../../../strings";
import LocalizedStrings from 'react-localization';
export default function Register({ locale }) {

    let strings = new LocalizedStrings(stringss);
    strings.setLanguage(locale);
    const { data, setData, post, processing, errors, reset } = useForm({
        first_name: '',
        last_name: '',
        birth_date: '',
        gender: '',
        password: '',
        password_confirmation: '',
        photo: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.type === 'file' ? event.target.files : event.target.value);
        // console.log(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.type === 'file' ? event.target.files : event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('register1'));
    };

    return (
        <Guest
            locale={locale}
            auth={null}
            header={strings.register}
            strings={strings}>
            <Head title="Register" />

            <ValidationErrors errors={errors} />

            <form onSubmit={submit}>
                <div>
                    <Label forInput="first_name" value="First Name" />

                    <Input
                        type="text"
                        name="first_name"
                        value={data.first_name}
                        className="mt-1 block w-full"
                        autoComplete="first_name"
                        isFocused={true}
                        handleChange={onHandleChange}
                        required
                    />
                </div>
                <div className="mt-4">
                    <Label forInput="last_name" value="Last Name" />

                    <Input
                        type="text"
                        name="last_name"
                        value={data.last_name}
                        className="mt-1 block w-full"
                        autoComplete="Last_name"
                        handleChange={onHandleChange}
                        required
                    />
                </div>
                <div className="mt-4">
                    <Label forInput="birth_date" value="Birth Date" />

                    <Input
                        type="date"
                        name="birth_date"
                        value={data.birth_date}
                        className="mt-1 block w-full"
                        autoComplete="birth_date"
                        handleChange={onHandleChange}

                    />
                </div>
                <div className="mt-4">
                    <Label forInput="gender" value="Gender" />

                    <label className='font-medium text-sm text-gray-700  mr-4'>
                        <Radio
                            type="text"
                            name="gender"
                            value="female"
                            handleChange={onHandleChange}
                            checked={data.gender == 'female' ? true : false}
                        />
                        Female
                    </label>

                    <label className='font-medium text-sm text-gray-700'>
                        <Radio
                            type="text"
                            name="gender"
                            value="male"
                            handleChange={onHandleChange}
                            checked={data.gender == 'male' ? true : false}
                        />
                        Male
                    </label>

                </div>
                <div className="mt-4">
                    <Label forInput="email" value="Email" />

                    <Input
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        handleChange={onHandleChange}
                        required
                    />
                </div>

                <div className="mt-4">
                    <Label forInput="password" value="Password" />

                    <Input
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        handleChange={onHandleChange}
                        required
                    />
                </div>

                <div className="mt-4">
                    <Label forInput="password_confirmation" value="Confirm Password" />

                    <Input
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        handleChange={onHandleChange}
                        required
                    />
                </div>
                <div className="mt-4">
                    <Label forInput="photo" value="Profile photo" />

                    <input
                        type="file"
                        name="photo"
                        label="Profile photo"
                        onChange={onHandleChange}
                        className=""
                        accept='image/*'
                    /></div>
                <div className="flex items-center justify-end mt-4">
                    <Link href={route('login')} className="underline text-sm text-gray-600 hover:text-gray-900">
                        Already registered?
                    </Link>

                    <Button className="ml-4" processing={processing}>
                        Register
                    </Button>
                </div>
            </form>
        </Guest>
    );
}
