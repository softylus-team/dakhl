import React, { useEffect } from 'react';
import Button from '@/Components/Button';
import Input from '@/Components/Input';
// import Radio from '@/Components/Radio';
import Label from '@/Components/Label';
import Select from '@/Components/Select';
import ValidationErrors from '@/Components/ValidationErrors';
import { Head, Link, useForm } from '@inertiajs/inertia-react';

export default function AddStake(props) {
    let stakesitem = [];
    // console.log(props.stakes);
    props.stakes ?
        props.stakes.map(function (stake) {
            let item = { value: stake.id, label: stake.state };
            stakesitem.push(item);
        })
        : "";
    // console.log(stakesitem);
    // console.log(props.Property);
    // console.log(props.auth.user);
    const { data, setData, post, processing, errors, reset } = useForm({
        property_id: props.Property.id,
        user_id: props.auth.user.id,
        value: '',
        state: '',
        amount: '',
        period: '',
    });
    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'file' ? event.target.files : event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('add-stake'));
    };
    return (
        <div className="max-w-6xl mx-auto mt-6 mb-6 sm:px-6 lg:px-8">
            <ValidationErrors errors={errors} />
            <form onSubmit={submit}>

                <div>
                    <Label forInput="property_id" value={`Property Name: ${props.Property.name}`} />

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
                        name="user_id"
                        value={data.user_id}
                        className="mt-1 block w-full"
                        handleChange={onHandleChange}

                    />
                </div>
                <div>
                    <Label forInput="amount" value="Investment amount" />

                    <Input
                        type="number"
                        name="amount"
                        value={data.amount}
                        className="mt-1 block w-full"
                        isFocused={true}
                        autoComplete="birth_date"
                        handleChange={onHandleChange}

                    />
                </div>
                <div className="mt-4">
                    <Label forInput="period" value="Hold Duration" />

                    <Input
                        type="number"
                        name="period"
                        value={data.period}
                        className="mt-1 block w-full"
                        autoComplete="birth_date"
                        handleChange={onHandleChange}

                    />

                </div>
                <div className="mt-4">
                    <Label forInput="state" value="State" />

                    <Input
                        type="text"
                        name="state"
                        value={data.state}
                        className="mt-1 block w-full"
                        autoComplete="birth_date"
                        handleChange={onHandleChange}

                    />

                </div>

                <div className="flex items-center justify-end mt-4">

                    <Button className="ml-4" processing={processing}>
                        add Stake
                    </Button>
                </div>
            </form>
        </div>
    );
}
