import React from 'react';
import { Link, Head } from '@inertiajs/inertia-react';
import LocalizedStrings from 'react-localization';
import stringss from "../../strings";
import Authenticated from '@/Layouts/Authenticated';
import Container from '@/components/container';
import Button from '@/Components/Button';


export default function confirmDeposit(props) {
    let strings = new LocalizedStrings(stringss);
    strings.setLanguage(props.locale);
    console.log(props.data);
    return (
        <Authenticated
            locale={props.locale}
            auth={props.auth}
            errors={props.errors}
            header={strings.wallet}
            menu={props.menu}
            strings={strings}
        >
            <Head title={strings.payment} />
            {/* <Container className={"my-8"}>
                <PaymentSteps step={2} strings={strings} />
            </Container> */}
            <Container className={"flex flex-col justify-center items-center text-center gap-6 py-4"}>
                {props.status==200?<>
                <img src="/appIcons/confirm_payment.svg" />
                <h6 className='text-xl text-d-gray font-bold'>{strings.successMessage}</h6></>
                :
                <>
                <img src="/appIcons/error.svg" />
                <h6 className='text-xl text-d-gray font-bold'>{strings.failMessage}</h6></>
                }
                {/* <ul className='list-disc text-lg text-d-gray font-normal'>
                    {props.data.result.parameterErrors.map(function (item, index) {
                        return (
                            <li key={index} >{item}</li>
                        );
                    })}
                </ul> */}
                <Link href={route("wallet")} className="w-full my-4 flex items-center justify-center">
                    <Button className="w-1/4 flex justify-center">
                        {strings.goToWallet}
                    </Button>
                </Link>
            </Container>
        </Authenticated >
    );
}
