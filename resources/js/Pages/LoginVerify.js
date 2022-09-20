import React, { useEffect,useRef,useState   } from 'react';
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
    const [disable, setDisable] = React.useState(false);
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

    const Ref = useRef(null);
  
    // The state for our timer
    const [timer, setTimer] = useState('00:00:00');
  
    const getTimeRemaining = (e) => {
        const total = Date.parse(e) - Date.parse(new Date());
        const seconds = Math.floor((total / 1000) % 60);
        const minutes = Math.floor((total / 1000 / 60) % 60);
        const hours = Math.floor((total / 1000 / 60 / 60) % 24);
        return {
            total, hours, minutes, seconds
        };
    }
  
    const startTimer = (e) => {
        let { total, hours, minutes, seconds } 
                    = getTimeRemaining(e);
        if (total >= 0) {
            setTimer(
                (hours > 9 ? hours : '0' + hours) + ':' +
                (minutes > 9 ? minutes : '0' + minutes) + ':'
                + (seconds > 9 ? seconds : '0' + seconds)
            )
        }
    }
  
    const clearTimer = (e) => {
        setTimer('00:01:00');
        if (Ref.current) clearInterval(Ref.current);
        const id = setInterval(() => {
            startTimer(e);
        }, 1000)
        Ref.current = id;
    }
  
    const getDeadTime = () => {
        let deadline = new Date();
        deadline.setSeconds(deadline.getSeconds() + 60);
        return deadline;
    }
    useEffect(() => {
        clearTimer(getDeadTime());
    }, []);
    let button;
    if (timer!= "00:00:00") {
        button =  <Link className="mr-1 text-d-gray pointer-events-none" href="#" >{strings.Resend}</Link>;
      } else {
        button = <Link className="mr-1 text-d-blue" href={route('LoginOTPResend',{"phone":props.phone})}  disabled={true}>{strings.Resend}</Link> ;
      }
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
                   <u className='w-32'>{button}</u>
                </div>
                </div>
                <div className="App">
                    <h2 className='p-3'>{timer}</h2>
                </div>
                <div className="flex items-center justify-center text-center w-full mt-8">
                    <Button className="mt-1 block flex items-center justify-center w-full text-center" processing={processing}>
                    {strings.login}
                    </Button>
                </div>
            </form>
            </Container>
        </Guest>
    );
    
}
