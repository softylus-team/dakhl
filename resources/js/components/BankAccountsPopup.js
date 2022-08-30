import React, { useRef } from 'react';
import Popup from 'reactjs-popup';
import Button from '@/Components/Button';
import Input from '@/Components/Input';
import CountrySelect from '@/Components/country-state-city-select';
import Label from '@/Components/Label';
import SwitchButton from '@/Components/SwitchButton';
import { Head, Link, useForm } from '@inertiajs/inertia-react';
import Countries from "../../countries";
import LocalizedStrings from 'react-localization';

export default function BankAccountsPopup({ locale, strings, triggerBtn, accounts }) {
    let countriesStrings = new LocalizedStrings(Countries);
    countriesStrings.setLanguage(locale);

    // console.log(countriesStrings.countries);

    const { data, setData, post, processing, errors, reset } = useForm({
        active: '',
    });
    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.type === 'file' ? event.target.files : event.target.value);
        console.log(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.type === 'file' ? event.target.files : event.target.value);

    };
    // const ref = useRef();
    const submit = (e) => {
        e.preventDefault();
        post(route('addBankAccount'));
        // ref.current.close();
        // Object.keys(data).forEach(element => {
        //     data[element]='';
        // })

    };
    return (
        <Popup
            // ref={ref}
            trigger={triggerBtn}
            modal
            nested
        >
            {close => (
                <div className={`modal max-w-5xl mx-auto p-6 sm:px-6 lg:px-8 rounded fav-shadow ${locale == "ar" ? "rtl dir-rtl" : "ltr dir-ltr"}`} style={{ backgroundColor: "rgb(248, 252, 252)" }}>
                    <button className="close" onClick={close}>
                        <img src="/appIcons/close.svg" />
                    </button>
                    <div className="content">

                        {accounts ?
                            <table className="table-auto border-space w-full">
                                <thead>
                                    <tr className={`${locale == 'ar' ? "text-right" : "text-left"} hidden sm:table-row`}>
                                        <th className="text-sm text-l-gray font-normal w-56">{strings.full_name}</th>
                                        <th className="text-sm text-l-gray font-normal w-36">{strings.bank_name}</th>
                                        <th className="text-sm text-l-gray font-normal w-36">{strings.branch_name}</th>
                                        <th className="text-sm text-l-gray font-normal w-36">{strings.country}</th>
                                        <th className="text-sm text-l-gray font-normal w-36">{strings.inter_code}</th>
                                        <th className="text-sm text-l-gray font-normal w-36">{strings.acc_number}</th>
                                        <th className="text-sm text-l-gray font-normal w-36">{strings.iban}</th>
                                        <th className="text-sm text-l-gray font-normal w-36">{strings.status}</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {accounts.map(function (account, index) {
                                        var time = new Date(account.created_at)
                                        console.log(account.active);
                                        return (
                                            <tr key={index} className={`fav-shadow rounded bg-white sm:p-6 p-4 sm:table-row flex flex-col my-4 sm:h-16 ${locale == 'ar' ? "text-right" : "text-left"}`}>
                                                <td className="rounded sm:w-18em sm:table-cell flex items-center sm:border-none border-b">
                                                    <div className="sm:hidden w-1/3 text-sm text-l-gray font-normal">{strings.full_name}</div>
                                                    <div className='flex justify-start items-center gap-2.5 sm:p-6'>
                                                        <img className="hidden sm:block" src="/appIcons/account.svg" />
                                                        <p className="text-base font-semibold text-d-gray">
                                                            {account.holder_name}
                                                        </p>
                                                    </div>
                                                </td>
                                                <td className="text-base text-l-gray font-semibold sm:w-36 sm:table-cell flex items-center sm:border-none border-b">
                                                    <div className="sm:hidden w-1/3 text-sm text-l-gray font-normal">{strings.bank_name}</div>
                                                    <div>{account.bank_name}</div>
                                                </td>
                                                <td className="text-base text-l-gray font-semibold sm:w-36 sm:table-cell flex items-center sm:border-none border-b">
                                                    <div className="sm:hidden w-1/3 text-sm text-l-gray font-normal">{strings.branch_name}</div>
                                                    <div>{account.branch_name}</div>
                                                </td>
                                                <td className="text-base text-l-gray font-semibold sm:w-36 sm:table-cell flex items-center sm:border-none border-b">
                                                    <div className="sm:hidden w-1/3 text-sm text-l-gray font-normal">{strings.country}</div>
                                                    <div>{account.country}</div>
                                                </td>
                                                <td className="text-base text-l-gray font-semibold sm:w-36 sm:table-cell flex items-center sm:border-none border-b">
                                                    <div className="sm:hidden w-1/3 text-sm text-l-gray font-normal">{strings.inter_code}</div>
                                                    <div style={{ direction: "ltr" }}>{account.swift_bic_code}</div>
                                                </td>
                                                <td className="text-base text-d-green font-semibold sm:w-36 sm:table-cell flex items-center sm:border-none border-b">
                                                    <div className="sm:hidden w-1/3 text-sm text-l-gray font-normal">{strings.acc_number}</div>
                                                    <div style={{ direction: "ltr" }}>{account.account_number}</div>
                                                </td>
                                                <td className="text-base text-l-gray font-semibold sm:w-36 sm:table-cell flex items-center sm:border-none border-b">
                                                    <div className="sm:hidden w-1/3 text-sm text-l-gray font-normal">{strings.iban}</div>
                                                    <div style={{ direction: "ltr" }}>{account.iban}</div>
                                                </td>
                                                <td className="rounded text-base text-l-gray font-semibold sm:w-36 sm:table-cell flex items-center">
                                                    <div className="sm:hidden w-1/3 text-sm text-l-gray font-normal">{strings.status}</div>
                                                    <div className='flex items-center gap-2.5'>
                                                        {account.active == 1 ?
                                                            <Link className="" href={route("bankAccountDeactivate", account.id)} method={"get"} as="button">
                                                                <SwitchButton name="active" value="1" checked={true} onHandleChange={onHandleChange} />
                                                            </Link>

                                                            :
                                                            <Link className="" href={route("bankAccountActivate", account.id)} method={"get"} as="button">
                                                                <SwitchButton name="active" value="1" checked={false} onHandleChange={onHandleChange} />
                                                            </Link>}
                                                        <Link className="" href={route("bankAccountDelete", account.id)} method={"delete"} as="button">
                                                            {/* <img className="object-contain w-6 h-6" src="/appIcons/delete.svg" /> */}
                                                            <svg className="w-6 h-6" viewBox="0 0 13 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M8.70869 5.79688C8.50172 5.79688 8.33398 5.96461 8.33398 6.17158V13.2535C8.33398 13.4603 8.50172 13.6282 8.70869 13.6282C8.91566 13.6282 9.0834 13.4603 9.0834 13.2535V6.17158C9.0834 5.96461 8.91566 5.79688 8.70869 5.79688Z" fill="#F88C68" />
                                                                <path d="M4.28682 5.79688C4.07985 5.79688 3.91211 5.96461 3.91211 6.17158V13.2535C3.91211 13.4603 4.07985 13.6282 4.28682 13.6282C4.49378 13.6282 4.66152 13.4603 4.66152 13.2535V6.17158C4.66152 5.96461 4.49378 5.79688 4.28682 5.79688Z" fill="#F88C68" />
                                                                <path d="M1.06423 4.76335V13.9953C1.06423 14.541 1.26431 15.0534 1.61384 15.4211C1.96176 15.7898 2.44596 15.9991 2.95269 16H10.0422C10.5491 15.9991 11.0333 15.7898 11.3811 15.4211C11.7306 15.0534 11.9307 14.541 11.9307 13.9953V4.76335C12.6255 4.57893 13.0758 3.90768 12.9828 3.19471C12.8897 2.48189 12.2824 1.94867 11.5635 1.94852H9.645V1.48014C9.64719 1.08626 9.49145 0.708039 9.21262 0.42979C8.93379 0.151688 8.55498 -0.0031709 8.1611 4.92333e-05H4.83383C4.43995 -0.0031709 4.06114 0.151688 3.78231 0.42979C3.50348 0.708039 3.34774 1.08626 3.34993 1.48014V1.94852H1.43147C0.7125 1.94867 0.105213 2.48189 0.0121219 3.19471C-0.0808227 3.90768 0.36941 4.57893 1.06423 4.76335V4.76335ZM10.0422 15.2506H2.95269C2.31203 15.2506 1.81364 14.7002 1.81364 13.9953V4.79629H11.1813V13.9953C11.1813 14.7002 10.6829 15.2506 10.0422 15.2506ZM4.09935 1.48014C4.09686 1.28503 4.17356 1.09724 4.31202 0.959502C4.45034 0.821768 4.63857 0.746095 4.83383 0.749461H8.1611C8.35636 0.746095 8.54459 0.821768 8.68291 0.959502C8.82138 1.09709 8.89807 1.28503 8.89558 1.48014V1.94852H4.09935V1.48014ZM1.43147 2.69793H11.5635C11.936 2.69793 12.2379 2.99989 12.2379 3.3724C12.2379 3.74491 11.936 4.04688 11.5635 4.04688H1.43147C1.05896 4.04688 0.756997 3.74491 0.756997 3.3724C0.756997 2.99989 1.05896 2.69793 1.43147 2.69793V2.69793Z" fill="#F88C68" />
                                                                <path d="M6.49775 5.79688C6.29079 5.79688 6.12305 5.96461 6.12305 6.17158V13.2535C6.12305 13.4603 6.29079 13.6282 6.49775 13.6282C6.70472 13.6282 6.87246 13.4603 6.87246 13.2535V6.17158C6.87246 5.96461 6.70472 5.79688 6.49775 5.79688Z" fill="#F88C68" />
                                                            </svg>
                                                        </Link>
                                                    </div>

                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                            : ""}
                    </div>
                </div>
            )}
        </Popup>
    )
};