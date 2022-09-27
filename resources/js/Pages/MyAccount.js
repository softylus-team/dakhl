import React, { useState } from 'react';
import { Link, Head, useForm } from '@inertiajs/inertia-react';
import Authenticated from '@/Layouts/Authenticated';
import AccountDetails from '@/Components/AccountDetails';
import Wallet from '@/Components/wallets';
import Reviews from '@/Components/Reviews';
import SavedProperties from '@/Components/savedProperties';
import LocalizedStrings from 'react-localization';
import stringss from "../../strings";

// import Textarea from '@/Components/Textarea';
// import Label from '@/Components/Label';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
// import PropertiesCollection from "../components/Properties";
export default function MyAccount(props) {
    let strings = new LocalizedStrings(stringss);
    strings.setLanguage(props.locale);
    // console.log(props.flash.success);
    return (
        <Authenticated
            locale={props.locale}
            auth={props.auth}
            errors={props.errors}
            header={strings.wallet}
            menu={props.menu}
            strings={stringss}
        >
            <Head title="My Account" />
            <div className="max-w-6xl mx-auto mt-6 mb-6 sm:px-6 lg:px-8">
                {props.flash.success ?
                    <div class="flex items-center bg-blue-500 text-white text-sm font-bold px-4 py-3" role="alert">
                        <svg class="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z" /></svg>
                        <p> {props.flash.success} </p>
                    </div> : ""}
                <Tabs>
                    <TabList>
                        <Tab>Account details</Tab>
                        <Tab>My balance</Tab>
                        <Tab>Saved properties</Tab>
                        <Tab>My Review</Tab>
                    </TabList>
                    <TabPanel>
                        <AccountDetails auth={props.auth} locale={props.locale} strings={strings} errors={props.errors} />
                    </TabPanel>
                    <TabPanel>
                        <Wallet user_balance={props.user_balance} stakes={props.stakes} errors={props.errors} contracts={props.contracts}  investments={props.investments}/>
                    </TabPanel>
                    <TabPanel>
                        <SavedProperties Properties={props.Properties} errors={props.errors} />
                    </TabPanel>
                    <TabPanel>
                        <Reviews auth={props.auth} locale={props.locale} strings={strings} Reviews={props.Reviews} errors={props.errors} />
                    </TabPanel>
                </Tabs>
            </div>
        </Authenticated>
    );
}
