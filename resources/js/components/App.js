import React from "react";
import Guest from '@/Layouts/Guest';
import { Head, Link, useForm } from '@inertiajs/inertia-react';

// import '/messages.js';
const App =(props)=>{
    return(
        <Guest locale={props.locale}>
            <Head title="Home" />
        <div>
            <h1></h1>
        </div>
        </Guest>
    );
};

export default App;
