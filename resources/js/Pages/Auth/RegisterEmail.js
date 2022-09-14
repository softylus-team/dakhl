import React, { useEffect } from 'react';
import Button from '@/Components/Button';
import Guest from '@/Layouts/Guest';
import Input from '@/Components/Input';
import Radio from '@/Components/Radio';
import Label from '@/Components/Label';
import Container from '@/components/container';
import ValidationErrors from '@/Components/ValidationErrors';
import { Head, Link, useForm } from '@inertiajs/inertia-react';
import stringss from "../../../strings";
import LocalizedStrings from 'react-localization';




export default function RegisterEmail(props) {

    let strings = new LocalizedStrings(stringss);
    strings.setLanguage(props.locale);
    const { data, setData, post, processing, errors, reset } = useForm({
        phone: props.phone,
        Identification:'',
        birth_date:'',
        email:'',
    });
    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.type === 'file' ? event.target.files : event.target.value);
        // console.log(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.type === 'file' ? event.target.files : event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('storerequest'));
    };
    return (

        <Guest
        locale={props.locale}
        auth={null}
        header={strings.register}
        strings={strings}>
        <Head title="Register" />

        <ValidationErrors errors={errors} />
            <Container className={"header_background_login dir-ltr"}>
                <div className='flex items-end' style={{ height: "52%" }}>
                    <div className='w-3/4'></div>
                    <div className='sm:w-1/4'>
                    </div>
                </div>
            </Container>

                <form className='d-flex align-items-center flex-column w-55 text-center sm:w-2/5 mx-auto my-8'  onSubmit={submit}>
                <div className="flex align-items-center text-center sm:w-2/5 mx-auto">
                        <img src="/appIcons/phonestep.jpeg" className="w-15 p-3"  />
                        <img src="/appIcons/otpre.jpeg" className="w-15 p-3"  />
                        <img src="/appIcons/emailactive.jpeg" className="w-15 p-3"  />
                    </div>
                        <div className="sm:text-3xl text-xl text-d-gray font-bold">
                        <h2>{strings.Identification} </h2>
                            <p className='sm:text-lg text-base text-l-gray font-normal  p-3'>{strings.PleaseEnter}
                            </p>
                        </div>
                        <div className="d-flex flex-column">
                    <Label forInput="email"  className=" flex wh-full font-bold text-d-blue" value={strings.email}/>
                    <div className="flex ">
                    <img src="/appIcons/email.svg" className="w-10" />
                    <Input
                        type="email"
                        name="email"
                        value={data.email}
                        autoComplete="email"
                        handleChange={onHandleChange}
                        required
                        className="flex items-center justify-center"
                        placeholder="Name@Domain.com"
                    />
                </div>
                </div>
                <div className="d-flex flex-column">
                    <Label forInput="birth_date"  className=" flex wh-full font-bold text-d-blue" value={strings.birth_date}/>
                    <div className="flex ">
                    <img src="/appIcons/birth_date.svg" className="w-10" />
                    <Input
                        type="date"
                        name="birth_date"
                        value={data.birth_date}
                        className="flex items-center justify-center"
                        autoComplete="birth_date"
                        handleChange={onHandleChange}
                        required
                        placeholder="يوم-شهر-سنه"
                    />
                </div>
                </div>
                <div className="d-flex flex-column">
                    <Label forInput="Identification"  className=" flex wh-full font-bold text-d-blue" value={strings.Identification}/>
                    <div className="flex ">
                    <img src="/appIcons/Identification.svg" className="w-10" />
                    <Input
                        type="number"
                        name="Identification"
                        value={data.Identification}
                        className="flex items-center justify-center"
                        // autoComplete="birth_date"
                        handleChange={onHandleChange}
                        required
                        // placeholder="Name@Domain.com"
                    />
                </div>
                </div>
                <div className="flex items-center justify-center text-center w-full mt-8">
                    <Button className="mt-1 block flex items-center justify-center w-full text-center" processing={processing}>
                    {strings.registerLogin}
                    </Button>
                </div>
            </form>
    </Guest>
    );
}
