import React, { useEffect } from 'react';
import Button from '@/Components/Button';
import Input from '@/Components/Input';
import Radio from '@/Components/Radio';
import Label from '@/Components/Label';
import Select from '@/Components/Select';
import ValidationErrors from '@/Components/ValidationErrors';
import { Head, Link, useForm } from '@inertiajs/inertia-react';

export default function AccountDetails({ auth, locale, strings }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        id: auth.user.id,
        first_name: auth.user.first_name,
        last_name: auth.user.last_name,
        birth_date: auth.user.birth_date,
        gender: auth.user.gender,
        phone: auth.user.phone,
        photo: '',
        email: auth.user.email,
        role: auth.user.role,
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.type === 'file' ? event.target.files : event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('updateMyAccount'));
    };
    return (
        <div className="">
            <ValidationErrors errors={errors} />
            <form onSubmit={submit} encType="multipart/form-data">
                <Input
                    type="hidden"
                    name="id"
                    value={data.id}
                    className="mt-1 block w-full"
                    handleChange={onHandleChange}
                    required
                />
                <div >
                    <Label forInput="photo" value={strings.profile_photo} />
                    <div className="flex gap-2.5 items-end">
                        <img className='w-20' src={auth.user.photo_path} />

                        <input
                            type="file"
                            name="photo"
                            label="Profile photo"
                            onChange={onHandleChange}
                            className=""
                        />
                    </div>
                </div>

                <div className='sm:flex justify-between gap-2.5 '>
                    <div className='sm:w-1/2 my-4'>
                        <Label forInput="first_name" value={strings.first_name} />

                        <Input
                            type="text"
                            name="first_name"
                            value={data.first_name}
                            className="mt-1 block w-full"
                            autoComplete="first_name"
                            isFocused={true}
                            handleChange={onHandleChange}

                        />
                    </div>
                    <div className='sm:w-1/2 my-4'>
                        <Label forInput="last_name" value={strings.last_name} />

                        <Input
                            type="text"
                            name="last_name"
                            value={data.last_name}
                            className="mt-1 block w-full"
                            autoComplete="Last_name"
                            handleChange={onHandleChange}

                        />
                    </div>
                </div>
                <div className='sm:flex justify-between gap-2.5 '>
                    <div className="sm:w-1/2 my-4">
                        <Label forInput="email" value={strings.email} />

                        <Input
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full"
                            autoComplete="email"
                            handleChange={onHandleChange}

                        />
                    </div>
                    <div className="sm:w-1/2 my-4">
                        <Label forInput="phone" value={strings.phone} />

                        <Input
                            type="text"
                            name="phone"
                            value={data.phone}
                            className="mt-1 block w-full"
                            autoComplete="phone"
                            handleChange={onHandleChange}

                        />
                    </div>
                </div>
                <div className='sm:flex justify-between gap-2.5 '>

                    <div className="sm:w-1/2 my-4">
                        <Label forInput="birth_date" value={strings.birth_date} />

                        <Input
                            type="date"
                            name="birth_date"
                            value={data.birth_date}
                            className="mt-1 block w-full"
                            autoComplete="birth_date"
                            handleChange={onHandleChange}

                        />
                    </div>
                    <div className="sm:w-1/2 my-4">
                        <Label forInput="gender" value={strings.gender} />
                        <div className='flex gap-2.5 '>

                            <label className='font-medium text-sm text-gray-700  mx-4'>
                                <Radio
                                    type="text"
                                    name="gender"
                                    value="female"
                                    handleChange={onHandleChange}
                                    checked={data.gender == 'female' ? true : false}
                                />
                                {strings.female}
                            </label>

                            <label className='font-medium text-sm text-gray-700 mx-4'>
                                <Radio
                                    type="text"
                                    name="gender"
                                    value="male"
                                    handleChange={onHandleChange}
                                    checked={data.gender == 'male' ? true : false}
                                />
                                {strings.male}
                            </label>
                        </div>

                    </div>
                </div>


                <div className="my-4">
                    <Label forInput="password" value={strings.password} />

                    <Input
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        handleChange={onHandleChange}

                    />
                </div>

                <div className="my-4">
                    <Label forInput="password_confirmation" value={strings.password_confirmation} />

                    <Input
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        handleChange={onHandleChange}

                    />
                </div>
                <div className="flex items-center justify-center mt-4">
                    <Button className="sm:w-1/2 my-4 flex justify-center" processing={processing}>
                        {strings.save}
                    </Button>
                </div>
            </form>
        </div>
    );
}
