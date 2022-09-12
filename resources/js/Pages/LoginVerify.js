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


export default function LoginVerify(props ) {
    let strings = new LocalizedStrings(stringss);
    strings.setLanguage(props.locale);

    const { data, setData, post, processing, errors } = useForm({
        verification_code: '',
        phone: props.phone,

    });

    

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('VerifyOTP'));
    };

    
    return (
        <Guest
            locale={props.locale}
            auth={null}
            header={strings.login}
            strings={strings}>
            <Head title="Log in" />

            {props.status && <div className="mb-4 font-medium text-sm text-green-600">{props.status}</div>}
            <Container>

            
            <ValidationErrors errors={errors} />
            <Container className={"header_background_login dir-ltr"}>
                <div className='sm:w-1/4'>
                </div>

            </Container>
            <form onSubmit={submit} className='d-flex align-items-center flex-column w-55 text-center sm:w-2/5 mx-auto'>
            <div className="sm:text-3xl text-xl text-d-gray font-bold">
                            <h2>{strings.Verificationcode} OTP</h2>
                            <p className='sm:text-lg text-base text-l-gray font-normal  p-3'>{strings.Pleasesend} 
                            <em className='text-d-blue p-3'>{props.phone}</em></p>
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
                   <u className='w-32'> <Link className="mr-1 text-d-blue" href={route('LoginOTPResend',{"phone":props.phone})}>{strings.Resend}</Link></u>
                </div>
                </div>
                <div id="clockdiv"></div>
                <div className="flex items-center justify-center text-center w-full mt-8">
                    <Button className="mt-1 block flex items-center justify-center w-full text-center" processing={processing}>
                    {strings.login}
                    </Button>
                </div>
            </form>
            </Container>
        </Guest>
    );
    
    // 10 minutes from now
    var time_in_minutes = 1;
    var current_time = Date.parse(new Date());
    var deadline = new Date(current_time + time_in_minutes*60*1000);
    
    
    function time_remaining(endtime){
        var t = Date.parse(endtime) - Date.parse(new Date());
        var seconds = Math.floor( (t/1000) % 60 );
        var minutes = Math.floor( (t/1000/60) % 60 );
        var hours = Math.floor( (t/(1000*60*60)) % 24 );
        var days = Math.floor( t/(1000*60*60*24) );
        return {'total':t, 'days':days, 'hours':hours, 'minutes':minutes, 'seconds':seconds};
    }
    function run_clock(id,endtime){
        var clock = document.getElementById(id);
        function update_clock(){
            var t = time_remaining(endtime);
            clock.innerHTML = 'minutes: '+t.minutes+'<br>seconds: '+t.seconds;
            if(t.total<=0){ clearInterval(timeinterval); }
        }
        update_clock(); // run function once at first to avoid delay
        var timeinterval = setInterval(update_clock,1000);
    }
    run_clock('clockdiv',deadline);
}
