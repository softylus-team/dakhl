import { React, useState } from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Link, Head } from '@inertiajs/inertia-react';
import LocalizedStrings from 'react-localization';
import stringss from "../../strings";
import Button from '@/Components/Button';
import Input from '@/Components/Input';
import Label from '@/Components/Label';
import Accordion from '@/Components/AccordionMui';
import Container from '@/components/container';
import AccountDetails from '@/Components/AccountDetails';
import Calculator from '@/Components/Calculator';
import NotiSettings from '@/Components/NotiSettings';
import NotificationIcon from '@/components/notificationIcon'


export default function Settings(props) {


    // console.log(props.properties);
    let strings = new LocalizedStrings(stringss);
    strings.setLanguage(props.locale);
    return (
        <Authenticated
            locale={props.locale}
            auth={props.auth}
            errors={props.errors}
            header={strings.settings}
            menu={props.menu}
            strings={strings}
        >
            <Head title={strings.settings} />


            <Container>
                <Accordion
                    containerClass="settings"
                    title={
                        <div className='flex gap-2.5'>
                            <img className="w-5" src="/appIcons/user.svg" />
                            <p className='text-d-gray text-lg '>{strings.myProfile}</p>
                        </div>}>
                    <AccountDetails auth={props.auth} locale={props.locale} strings={strings} errors={props.errors} />

                </Accordion>
            </Container>
            <Container className={"mt-8"}>
                <Accordion
                    containerClass="settings"
                    title={
                        <div className='flex items-center gap-2.5'>
                            <NotificationIcon fill={"#01277A"} />
                            <p className='text-d-gray text-lg '>{strings.notifications}</p>
                        </div>
                    }>
                    <NotiSettings auth={props.auth} locale={props.locale} strings={strings} errors={props.errors} />
                </Accordion>
            </Container>
            <Container className={"mt-8"}>
                <Accordion
                    containerClass="settings"
                    title={
                        <div className='flex items-center gap-2.5'>
                            <img className="w-5" src="/appIcons/calculator.svg" />
                            <p className='text-d-gray text-lg '>{strings.calculator}</p>
                        </div>
                    }>
                    <Calculator auth={props.auth} locale={props.locale} strings={strings} errors={props.errors} />
                </Accordion>
            </Container>
            <Container className={"my-8"}>
                <div className='h-17 flex items-center fav-shadow rounded bg-white p-4'>
                    <Link href={route('logout')} method="post" as="button" className='flex items-center gap-2.5'>

                        <img className="object-contain w-6 h-6" src={"/appIcons/logout.svg"} />
                        <p className='text-l-gray text-lg font-normal'>{strings.logout}</p>
                    </Link>
                </div>
            </Container>

        </Authenticated>
    );
}
