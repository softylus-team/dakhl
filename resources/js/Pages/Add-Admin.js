import React, { useEffect, useState } from 'react';
import Button from '@/Components/Button';
import Authenticated from '@/Layouts/Authenticated';
import Input from '@/Components/Input';
import Select from '@/Components/Select';
import Label from '@/Components/Label';
import ValidationErrors from '@/Components/ValidationErrors';
import { Head, Link, useForm } from '@inertiajs/inertia-react';
import LocalizedStrings from 'react-localization';
import stringss from "../../strings";


export default function Addadmin(props) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        type: 'admin',
        id:'',
       
    });
    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'file' ? event.target.files : event.target.value);
    };
    const Users = props.Users;
    // console.log(props.Users);
    const userArray=[];
    const roleArray=[];
    Users.forEach((el)=>{
        // if(! userArray.includes(el.first_name))
        userArray.push(el.first_name +" " +el.last_name);

        if(! roleArray.includes(el.role))
        roleArray.push(el.role);
    });
    // console.log(data.id.value);
    const submit = (e) => {
        e.preventDefault();
        // setData(data.id , id.value);
        post(route('addAdmin'));
    };

    let strings = new LocalizedStrings(stringss);
    strings.setLanguage(props.locale);
    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={strings.users}
            menu={props.menu}
            strings={strings}
            locale={props.locale}
            >
                
            <Head title="Add Property" />
            <div className="max-w-6xl mx-auto mt-6 mb-6 sm:px-6 lg:px-8">
                <ValidationErrors errors={errors} />
                <div className='flex'>
                    <Link href={route('allUsers')} className='m-4 p-2'>{strings.users} </Link>
                    <Link href={route('Add-Admin')} className='m-4 p-2 rounded-md px-4 font-bold' style={{backgroundColor:"#E1EDF3" ,color:"#02044F"}} >{strings.addAdmin} </Link>
                    </div>
                    <hr className='mb-4'/>
                <form onSubmit={submit} encType="multipart/form-data">
                    <div className="sm:w-1/2 my-4">
                        <Label forInput="name" value={strings.name}/>
                        <Select
                            locale={props.locale}
                            name="name"
                            items={userArray}
                            className="mt-1 block w-full"
                            handleChange={onHandleChange}
                            required
                        />
                        <Input
                            type="hidden"
                            name="id"
                            value={userArray.indexOf(data.name)}
                            className="mt-1 block w-full"
                            handleChange={onHandleChange}
                            required
                        />
                    </div>
                   
                    <div className="sm:w-1/2 my-4">
                        <Label forInput="type" value={strings.status} />
                        <Select
                            name="type"
                            locale={props.locale}
                            className="mt-1 block w-full"
                            handleChange={onHandleChange}
                            items={roleArray}
                            required
                             />
                    </div>
                    <div className="flex items-center justify-center mt-4">
                        <Button className="sm:w-1/2 my-4 flex justify-center" processing={processing}>
                            {strings.save}
                        </Button>
                    </div>
                </form>
            </div>
        </Authenticated>
    );
}
