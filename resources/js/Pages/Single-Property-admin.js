import React, { useState } from 'react';
import LocalizedStrings from 'react-localization';
import stringss from "../../strings";
import Authenticated from '@/Layouts/Authenticated';
import ValidationErrors from '@/Components/ValidationErrors';



export default function singleProperty(props) {

    let strings = new LocalizedStrings(stringss);
    strings.setLanguage(props.locale);
    console.log(props);


    return (
        <Authenticated
            locale={props.locale}
            auth={props.auth}
            // errors={props.errors}
            header={props.property.name}
            menu={props.menu}
            strings={strings}
        >
            {/* <Head title={Property.name} /> */}
            <div className="max-w-6xl mx-auto mt-6 mb-6 sm:px-6 lg:px-8">
                <ValidationErrors errors={errors} />
        <h1>sssss</h1>


            </div>
        </Authenticated >
    );
}
