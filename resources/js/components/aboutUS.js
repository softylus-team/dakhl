import React, { useEffect } from 'react';
import Button from '@/Components/Button';
import Input from '@/Components/Input';
import Label from '@/Components/Label';
import Textarea from '@/Components/Textarea';
import ValidationErrors from '@/Components/ValidationErrors';
import { Head, Link, useForm } from '@inertiajs/inertia-react';

export default function OurPartners({ strings, auth, locale, Aboutus }) {
    var formobj = {
        itemid:''
    }
    const { data, setData, post, processing, errors, reset } = useForm(formobj);

    // const onHandleChange = (event) => {
    //     setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.type === 'file' ? event.target.files : event.target.value);
    // };

    const submit = (e) => {
        e.preventDefault();

        post(route('updateAboutus'));
    };
    // console.log(Aboutus);
    return (
        <div className="max-w-6xl mx-auto mt-6 mb-6 sm:px-6 lg:px-8">
            <ValidationErrors errors={errors} />
            {Aboutus.map(
                function (item, index) {
                    // formobj['itemid'] = item.id;
                    formobj[`title_ar${item.id}`] = item.title_ar;
                    formobj[`title_en${item.id}`] = item.title_en;
                    formobj[`description_ar${item.id}`] = item.description_ar;
                    formobj[`description_en${item.id}`] = item.description_en;
                    data['itemid'] = item.id;
                    return (
                        <form key={index} onSubmit={submit} encType="multipart/form-data">
                            <Input
                                type="hidden"
                                name="itemid"
                                value={item.id}
                                className="mt-1 block w-full"
                                handleChange={(event) => {
                                    data[event.target.name] = event.target.value;
                                    setData(event.target.name, event.target.type === 'file' ? event.target.files : event.target.value);
                                }}
                                required
                            />
                            <div className="mt-4">
                                <img src={item.icon} />
                                <Label forInput="icon" value={strings.icon} />
                                <input
                                    type="file"
                                    name={`icon${item.id}`}
                                    onChange={(event) => {
                                        data[event.target.name] = event.target.value;
                                        setData(event.target.name, event.target.type === 'file' ? event.target.files : event.target.value);
                                    }}
                                    className=""
                                /></div>
                            <div className='mt-4'>
                                <Label forInput={`title_ar${item.id}`} value={strings.title_ar} />

                                <Input
                                    type="text"
                                    name={`title_ar${item.id}`}
                                    value={data[`title_ar${item.id}`]}
                                    className="mt-1 block w-full"
                                    autoComplete={`title_ar${item.id}`}
                                    handleChange={(event) => {
                                        data[event.target.name] = event.target.value;
                                        setData(event.target.name, event.target.type === 'file' ? event.target.files : event.target.value);
                                    }}

                                />
                            </div>
                            <div className='mt-4'>
                                <Label forInput={`title_en${item.id}`} value={strings.title_en} />

                                <Input
                                    type="text"
                                    name={`title_en${item.id}`}
                                    value={data[`title_en${item.id}`]}
                                    className="mt-1 block w-full"
                                    autoComplete={`title_en${item.id}`}
                                    handleChange={(event) => {
                                        data[event.target.name] = event.target.value;
                                        setData(event.target.name, event.target.type === 'file' ? event.target.files : event.target.value);
                                    }}

                                />
                            </div>

                            <div className="mt-4">
                                <Label forInput={`description_ar${item.id}`} value={strings.description_ar} />
                                <Textarea
                                    type="text"
                                    name={`description_ar${item.id}`}
                                    value={data[`description_ar${item.id}`]}
                                    className="mt-1 block w-full"
                                    handleChange={(event) => {
                                        data[event.target.name] = event.target.value;
                                        setData(event.target.name, event.target.type === 'file' ? event.target.files : event.target.value);
                                    }}
                                    required
                                />

                            </div>
                            <div className="mt-4">
                                <Label forInput="description_en" value={strings.description_en} />
                                <Textarea
                                    type="text"
                                    name={`description_en${item.id}`}
                                    value={data[`description_en${item.id}`]}
                                    className="mt-1 block w-full"
                                    handleChange={(event) => {
                                        data[event.target.name] = event.target.value;
                                        setData(event.target.name, event.target.type === 'file' ? event.target.files : event.target.value);
                                    }}
                                    required
                                />

                            </div>


                            <div className="flex items-center justify-end mt-4">

                                <Button className="ml-4" processing={processing}>
                                    {strings.update}
                                </Button>
                            </div>
                        </form>
                    )
                }
            )
            }

            {/* <div className='flex justify-center gap-6'>
                {(Partners) ?
                    Partners.map(function (partner, index) {
                        return (
                            <div key={index} className="text-center">
                                <img className='w-16' src={partner.logo} />
                                <p>{locale == 'ar' ? partner.name_ar : partner.name_en}</p>
                                <Link href={route('deletePartner', partner.id)} className="inline-flex items-center px-4 py-2 bg-gray-900 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-1px active:bg-gray-900 transition ease-in-out duration-150">
                                    Delete
                                </Link>
                            </div>
                        )
                    })

                    : <p>No Partners Found</p>
                }
            </div> */}
        </div>
    );
}
