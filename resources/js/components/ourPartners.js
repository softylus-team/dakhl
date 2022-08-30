import React, { useEffect } from 'react';
import Button from '@/Components/Button';
import Input from '@/Components/Input';
import Label from '@/Components/Label';
import ValidationErrors from '@/Components/ValidationErrors';
import { Head, Link, useForm } from '@inertiajs/inertia-react';

export default function OurPartners({Partners,strings, auth,locale }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name_ar:  '',
        name_en:  '',
        logo: '',
    });

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.type === 'file' ? event.target.files : event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('addPartner'));
    };
    // console.log(Partners);
    return (
            <div className="max-w-6xl mx-auto mt-6 mb-6 sm:px-6 lg:px-8">
                <ValidationErrors errors={errors} />
                <form onSubmit={submit} encType="multipart/form-data">
                    <div className='mt-4'>
                        <Label forInput="name_ar" value={strings.name_ar} />

                        <Input
                            type="text"
                            name="name_ar"
                            value={data.name_ar}
                            className="mt-1 block w-full"
                            autoComplete="name_ar"
                            isFocused={true}
                            handleChange={onHandleChange}

                        />
                    </div>
                    <div className='mt-4'>
                        <Label forInput="name_en" value={strings.name_en} />

                        <Input
                            type="text"
                            name="name_en"
                            value={data.name_en}
                            className="mt-1 block w-full"
                            autoComplete="name_en"
                            isFocused={true}
                            handleChange={onHandleChange}

                        />
                    </div>
                    <div  className="mt-4">
                    <Label forInput="logo" value={strings.logo} />
                        <input
                            type="file"
                            name="logo"
                            label="logo"
                            onChange={onHandleChange}
                            className=""
                        /></div>
                    
                    

                    <div className="flex items-center justify-end mt-4">

                        <Button className="ml-4" processing={processing}>
                            {strings.AddPartner}
                        </Button>
                    </div>
                </form>
                <div className='flex justify-center gap-6'>
                    {(Partners)? 
                    Partners.map(function(partner,index){
                        return(
                          <div key={index} className="text-center">
                        <img className='w-16' src={partner.logo}/>
                        <p>{locale=='ar'?partner.name_ar:partner.name_en}</p>
                        <Link href={route('deletePartner', partner.id)} className="inline-flex items-center px-4 py-2 bg-gray-900 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-1px active:bg-gray-900 transition ease-in-out duration-150">
                                                    Delete
                                                </Link>
                    </div>  
                        )
                    })
                    
                    : <p>No Partners Found</p>
                    }
                </div>
            </div>
    );
}
