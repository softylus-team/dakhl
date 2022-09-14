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




export default function RegisterVerify(props) {

    let strings = new LocalizedStrings(stringss);
    strings.setLanguage(props.locale);
    const { data, setData, post, processing, errors, reset } = useForm({
        verification_code: '',
        phone: props.phone,
    });

    // useEffect(() => {
    //     return () => {
    //         reset('password', 'password_confirmation');
    //     };
    // }, []);

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.type === 'file' ? event.target.files : event.target.value);
        // console.log(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.type === 'file' ? event.target.files : event.target.value);
    };

   
    const submit = (e) => {
        e.preventDefault();

        post(route('RegisterVerifyOTP'));
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
                        <img src="/appIcons/emailicon.jpeg" className="w-15 p-3"  />
                    </div>
                        <div className="sm:text-3xl text-xl text-d-gray font-bold">
                        <h2>{strings.Verificationcode} OTP</h2>
                            <p className='sm:text-lg text-base text-l-gray font-normal  p-3'>{strings.Pleasesend}
                            <em className='text-d-blue p-3'>{props.phone}</em>
                            </p>
                        </div>
                        <div className="d-flex flex-column">
                    <Label forInput="verification_code"  className=" flex wh-full font-bold text-d-blue" value={strings.Verificationcode}/>
                    <div className="flex ">
                    <img src="/appIcons/verify.svg" className="w-10" />
                    <Input
                        type="number"
                        name="verification_code"
                        value={data.verification_code}
                        className="flex items-center justify-center"
                        autoComplete="current-password"
                        handleChange={onHandleChange}
                        placeholder="12345"
                    />
                   <u className='w-32'> <Link className="mr-1 text-d-blue" href={route('RegisterOTPResend',{"phone":props.phone})}>{strings.Resend}</Link></u>
                </div>
                </div>

                        <div className="flex items-center justify-center text-center w-full mt-8">
                            <Button className="mt-1 block flex items-center justify-center w-full text-center" processing={processing}>
                            {strings.CheckFollowup}
                            </Button>
                        </div>
            </form>
    </Guest>
    );
}
