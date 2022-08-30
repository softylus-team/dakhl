import React, { useEffect } from 'react';
import Button from '@/Components/Button';
import Authenticated from '@/Layouts/Authenticated';
import Input from '@/Components/Input';
import Radio from '@/Components/Radio';
import Checkbox from '@/Components/Checkbox';
import Label from '@/Components/Label';
import Select from '@/Components/Select';
import ValidationErrors from '@/Components/ValidationErrors';
import { Head, Link, useForm } from '@inertiajs/inertia-react';

export default function updateUser(props) {
    const { data, setData, post, processing, errors, reset } = useForm({
        id:props.user.id,
        first_name: props.user.first_name,
        last_name: props.user.last_name,
        birth_date: props.user.birth_date,
        gender: props.user.gender,
        phone: props.user.phone,
        email: props.user.email,
        role: props.user.role,
        activated: props.user.activated,
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('updateuser'));
    };

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Update User: {props.user.first_name}</h2>}
        >
            <Head title="Update User" />
            <div className="max-w-6xl mx-auto mt-6 mb-6 sm:px-6 lg:px-8">
                <ValidationErrors errors={errors} />

                <form onSubmit={submit}>
                <Input
                        type="hidden"
                        name="id"
                        value={data.id}
                        className="mt-1 block w-full"
                        handleChange={onHandleChange}
                        required
                    />
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

                        />
                    </div>
                    <div>
                        <Label forInput="last_name" value="Last Name" />

                        <Input
                            type="text"
                            name="last_name"
                            value={data.last_name}
                            className="mt-1 block w-full"
                            autoComplete="Last_name"
                            handleChange={onHandleChange}

                        />
                    </div>
                    <div>
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
                                checked={data.gender == 'female'? true : false}
                            />
                            Female
                        </label>

                        <label className='font-medium text-sm text-gray-700'>
                            <Radio
                                type="text"
                                name="gender"
                                value="male"
                                handleChange={onHandleChange}
                                checked={data.gender == 'male'? true : false}
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
                            autoComplete="email"
                            handleChange={onHandleChange}

                        />
                    </div>
                    <div className="mt-4">
                        <Label forInput="phone" value="phone" />

                        <Input
                            type="text"
                            name="phone"
                            value={data.phone}
                            className="mt-1 block w-full"
                            autoComplete="phone"
                            handleChange={onHandleChange}

                        />
                    </div>
                    {props.auth.user ? (
                    props.auth.user.role === "admin" ? (
                        <>
                        <div className="mt-4">
                        <Label forInput="role" value="Role" />

                        <Select
                            name="role"
                            value={data.role}
                            handleChange={onHandleChange}
                            items={[{ value: "admin", label: "Admin" }, { value: "investor", label: "Investor" }, { value: "reseller", label: "Reseller" }]} />

                    </div>
                    <div className="mt-4">
                    <Label forInput="activated" value="Activated" />

                    <Checkbox
                        name="activated"
                        value={data.activated}
                        handleChange={onHandleChange}
                        checked={data.activated ? true : false}
                        />

                </div>
                </>
                    ) : ""
                ) : ""}
                    
                    <div className="mt-4">
                        <Label forInput="password" value="New Password (leave blank to leave unchanged)" />

                        <Input
                            type="password"
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full"
                            autoComplete="new-password"
                            handleChange={onHandleChange}

                        />
                    </div>

                    <div className="mt-4">
                        <Label forInput="password_confirmation" value="Confirm New Password (leave blank to leave unchanged)" />

                        <Input
                            type="password"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            className="mt-1 block w-full"
                            handleChange={onHandleChange}

                        />
                    </div>

                    <div className="flex items-center justify-end mt-4">

                        <Button className="ml-4" processing={processing}>
                            Update User
                        </Button>
                    </div>
                </form>
            </div>
        </Authenticated>
    );
}
