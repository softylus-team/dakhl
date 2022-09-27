import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/inertia-react';
import Button from '@/Components/Button';
import Input from '@/Components/Input';
import Dropdown from '@/Components/Dropdown';

export default function Wallets(props) {
    let form = {
        investemnt_id: '',
        amount: ''
    }
    const { data, setData, post, processing, errors, reset } = useForm(form);
    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'file' ? event.target.files : event.target.value);
        data['investment_id'] = record.id
    };

    console.log(props.stakes);
    console.log(props.contracts);
    console.log(props.investments);

    const submit = (e) => {
        e.preventDefault();

        post(route('delete-investment'));
    };
    // console.log(props.stakes);
    return (
        <div className="max-w-6xl mx-auto mt-6 mb-6 sm:px-6 lg:px-8">
            <div>
                <h6>Current balance</h6>
                <h2>{props.user_balance}$</h2>
                {/* <Link href={route('deposite')} className="inline-flex items-center px-4 py-2 bg-gray-900 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-1px active:bg-gray-900 transition ease-in-out duration-150">make a deposite</Link> */}
            </div>
            <div className="flex justify-between items-center py-4 mx-4">
                <h1 className='font-bold'>investments</h1>
                <Link href='/investmentsExport' className="inline-flex items-center px-4 py-2 bg-gray-900 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-1px active:bg-gray-900 transition ease-in-out duration-150">Export</Link>
            </div>
            <table className="w-full border-collapse border border-gray-400">

                <thead>
                    <tr>
                        <th className="border border-gray-300">Date</th>
                        <th className="border border-gray-300">Property</th>
                        <th className="border border-gray-300">status</th>
                        <th className="border border-gray-300">value</th>
                        <th className="border border-gray-300">state</th>
                        <th className="border border-gray-300">
                            <table className="w-full table-fixed border-collapse border border-gray-400">
                                <thead>
                                    <tr>
                                        <th className="text-center border border-gray-300" colSpan="3">Investments</th>
                                    </tr>
                                    <tr>
                                        <th className="border border-gray-300">Date</th>
                                        <th className="border border-gray-300">Amount</th>
                                        {/* <th className="border border-gray-300">Period</th> */}
                                        <th className="border border-gray-300">Actions</th>
                                    </tr>
                                </thead>
                            </table>


                        </th>
                    </tr>
                </thead>
                <tbody>
                    {(props.stakes) ?
                        props.stakes.map(function (record, index) {
                            var created_at = new Date(record.created_at)
                            // data['amount'] = record.amount;
                            return (<tr key={index}>
                                <td className="border border-gray-300">{created_at.toLocaleDateString("en-US")+" "+created_at.toLocaleTimeString('en-US')}</td>
                                <td className="border border-gray-300">{record.property}</td>
                                <td className="border border-gray-300">{record.status}</td>
                                <td className="border border-gray-300">{record.value}</td>
                                <td className="border border-gray-300">{record.state}</td>
                                <td className="border border-gray-300">
                                    <table className="w-full table-fixed border-collapse border border-gray-400">

                                        <tbody>
                                            {record.investments ?
                                                record.investments.map(function (investment, index) {
                                                    var created_at = new Date(investment.created_at);
                                                    form['investment_id'] = investment.id;
                                                    return (<tr key={index}>
                                                        <td className="border border-gray-300">{created_at.toLocaleDateString("en-US")+" "+created_at.toLocaleTimeString('en-US')}</td>
                                                        <td className="border border-gray-300">{investment.amount}</td>
                                                        {/* <td className="border border-gray-300">{investment.period}</td> */}
                                                        <td className="border border-gray-300">
                                                            <Dropdown>
                                                                <Dropdown.Trigger>
                                                                    <span className="inline-flex rounded-md">
                                                                        <button
                                                                            type="button"
                                                                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                                                                        >
                                                                            <svg className="w-6 h-6 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>

                                                                        </button>
                                                                    </span>
                                                                </Dropdown.Trigger>

                                                                <Dropdown.Content>

                                                                    <Dropdown.Link href={route('liquidize', { "id": investment.id })} method="get" as="button">
                                                                        Liquidize
                                                                    </Dropdown.Link>
                                                                    <Dropdown.Link href={route('delete-investment', { "id": investment.id })} method="get" as="button">
                                                                        Cancel
                                                                    </Dropdown.Link>

                                                                </Dropdown.Content>
                                                            </Dropdown>
                                                        </td>
                                                    </tr>);
                                                }) : ""}
                                        </tbody>
                                    </table>

                                </td>
                            </tr>)
                        }
                        ) : ""}
                </tbody>
            </table>
        </div>

    );
}
