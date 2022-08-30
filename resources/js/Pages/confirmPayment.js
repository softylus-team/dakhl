import React from 'react';
import { Link, Head } from '@inertiajs/inertia-react';
import LocalizedStrings from 'react-localization';
import stringss from "../../strings";
import Guest from '@/Layouts/Guest';
import Container from '@/components/container';
import PaymentSteps from '@/Components/PaymentSteps';
import Button from '@/Components/Button';


export default function confirmPayment(props) {
    console.log(props.data);
    let strings = new LocalizedStrings(stringss);
    strings.setLanguage(props.locale);
    return (
        <Guest
            locale={props.locale}
            auth={props.auth}
            errors={props.errors}
            header={strings.confirm_payment}
            menu={props.menu}
            strings={strings}
        >
            <Head title={strings.payment} />
            <Container className={"my-8"}>
                <PaymentSteps step={3} strings={strings} />
            </Container>
            <Container className={"flex flex-col justify-center items-center text-center gap-6 py-4"}>
                {props.status==200?
                <><img src="/appIcons/confirm_payment.svg" />
                <h6 className='text-xl text-d-gray font-bold'>{strings.subscribedSuccessfully}</h6>
                <ul className='list-disc text-lg text-d-gray font-normal'>
                    {strings.confirmationList.map(function (item, index) {
                        return (
                            <li key={index} >{item}</li>
                        );
                    })}
                </ul></>:
                <>
                <img src="/appIcons/error.svg" />
                <h6 className='text-xl text-d-gray font-bold'>{strings.failMessage}</h6>
                
                </>}
                <Link href={route("dashboard")} className="w-full my-4 flex items-center justify-center">
                    <Button className="w-1/4 flex justify-center">
                        {strings.goToInvetments}
                    </Button>
                </Link>
            </Container>
        </Guest >
    );
}
