import React from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Link, Head } from '@inertiajs/inertia-react';
import LocalizedStrings from 'react-localization';
import stringss from "../../strings";
import StaticsCard from "@/components/StaticsCard";
import Button from '@/Components/Button';
import Container from '@/components/container';
import AddBankPopup from '@/components/AddBankPopup'
import BankAccountsPopup from '@/components/BankAccountsPopup'
export default function Wallet(props) {
    // console.log(props.deposites);
    // console.log(props.withdrawals);
    let strings = new LocalizedStrings(stringss);
    strings.setLanguage(props.locale);
    return (
        <Authenticated
            locale={props.locale}
            auth={props.auth}
            errors={props.errors}
            header={strings.wallet}
            menu={props.menu}
            strings={strings}
        >
            <Head title={strings.wallet} />
            <Container>
                <div className="sm:flex justify-between gap-10">
                    <div className="sm:w-2/5 sm:my-0 my-4 h-44 p-6 flex flex-col justify-center gap-6 bg-white rounded fav-shadow">
                        <div className='flex items-center gap-4'>
                            <img className="w-10 h-10 object-contain" src="/appIcons/walletBalance.svg" />
                            <p className='text-d-gray text-2xl font-bold'>{props.balance} {strings.currency}</p>
                            <p className='text-l-gray text-sm font-normal'>{strings.totalBalance}</p>
                        </div>

                        <div className='flex gap-2.5'>
                        <Link className="" href={route("DepositMoney")}>
                            
                                    <Button type="button" className='flex justify-center gap-2.5'>
                                        <img src="/appIcons/depositMoney.svg" />
                                        {strings.depositMoney}
                                    </Button>
                            </Link>

                            <Link className="" href="#">
                                <Button type="button" className='bg-cyan flex justify-center gap-2.5'>
                                    <img src="/appIcons/withdrawMoney.svg" />
                                    {strings.withdrawMoney}
                                </Button>
                            </Link>
                        </div>
                    </div>

                    <div className='sm:w-1/5 sm:my-0 my-4 h-44 flex flex-col justify-between items-start'>
                        <StaticsCard imgClass="w-10 h-10" className="w-full h-20" icon={"/appIcons/totalDeposites.svg"} title={strings.totalDeposites} amount={props.totalDeposites} currency={strings.currency} />
                        <StaticsCard imgClass="w-10 h-10" className="w-full h-20" icon={"/appIcons/totalWithdrawals.svg"} title={strings.totalWithdrawals} amount={props.totalWithdrawals} currency={strings.currency} />
                    </div>
                    <div className="sm:w-1/5 sm:my-0 my-4 h-44 p-6 bg-white rounded fav-shadow relative flex flex-col justify-center gap-10">
                        <img className='absolute top-0 left-0 m-4' src="/appIcons/optionsDotsH.svg" />
                        <div className='flex justify-start gap-2.5 items-center'>
                            <img className="w-10 h-10 object-contain" src={"/appIcons/savedAccounts.svg"} />
                            <div>
                                <p className='text-l-gray text-sm font-normal'>{strings.savedAccounts}</p>
                                <p className='text-d-gray text-xl font-semibold'>{props.savedAccounts}</p>
                            </div>
                        </div>
                        <BankAccountsPopup
                            locale={props.locale}
                            strings={strings}
                            accounts={props.bankAccounts}
                            triggerBtn={
                                <p className='underline text-l-gray text-sm font-normal cursor-pointer'>{strings.viewDetails}</p>
                            } />
                    </div>
                    <div className="sm:w-1/5 sm:my-0 my-4 h-44 p-6 bg-white rounded fav-shadow relative flex flex-col justify-center gap-10">
                        <img className='absolute top-0 left-0 m-4' src="/appIcons/optionsDotsH.svg" />
                        <div className='flex justify-start gap-2.5 items-center'>
                            <img className="w-10 h-10 object-contain" src={"/appIcons/PaymentCards.svg"} />
                            <div>
                                <p className='text-l-gray text-sm font-normal'>{strings.PaymentCards}</p>
                                <p className='text-d-gray text-xl font-semibold'>{props.savedAccounts}</p>
                            </div>
                        </div>
                        <BankAccountsPopup
                            locale={props.locale}
                            strings={strings}
                            accounts={props.bankAccounts}
                            triggerBtn={
                                <p className='underline text-l-gray text-sm font-normal cursor-pointer'>{strings.viewDetails}</p>
                            } />
                    </div>
                    <div className="sm:w-1/5 sm:my-0 my-4 h-44 p-2 bg-white rounded fav-shadow">
                        <AddBankPopup
                            locale={props.locale}
                            strings={strings}
                            triggerBtn={
                                <button className="w-full h-full flex flex-col justify-center items-center border-2 border-dashed border-gray-100 rounded text-center">

                                    <img className="w-10 h-10 object-contain mx-auto" src={"/appIcons/add.svg"} />
                                    <p className='text-l-gray text-sm font-normal'>{strings.addBank}</p>

                                </button>
                            } />
                    </div>
                </div>
            </Container>


            <Container className={"mt-8"}>
                <hr />
                <h2 className='underline text-d-blue text-lg font-semibold'>{strings.walletTransactions}</h2>
                <div className='flex items-center gap-2.5'>
                    <img className="w-6 h-6 object-contain" src={"/appIcons/deposites.svg"} />
                    <h3 className='text-d-gray text-lg font-normal'>{strings.deposites}</h3>
                </div>
                {props.deposites ?
                    <table className="table-auto border-space w-full">
                        <thead>
                            <tr className={`${props.locale == 'ar' ? "text-right" : "text-left"} hidden sm:table-row`}>
                                <th className="text-sm text-l-gray font-normal w-56">{strings.operation}</th>
                                <th className="text-sm text-l-gray font-normal sm:w-36">{strings.bankName}</th>
                                <th className="text-sm text-l-gray font-normal sm:w-36">{strings.amount}</th>
                                <th className="text-sm text-l-gray font-normal sm:w-36">{strings.currency}</th>
                                <th className="text-sm text-l-gray font-normal sm:w-36">{strings.time}</th>
                                <th className="text-sm text-l-gray font-normal sm:w-36">{strings.status}</th>
                            </tr>
                        </thead>
                        <tbody>

                            {props.deposites.map(function (deposit, index) {
                                var time = new Date(deposit.created_at)
                                return (
                                    <tr key={index} className={`fav-shadow rounded bg-white sm:p-6 p-4 sm:table-row flex flex-col my-4 sm:h-16 ${props.locale == 'ar' ? "text-right" : "text-left"}`}>
                                        <td className="rounded sm:w-18em sm:table-cell flex items-center sm:border-none border-b">
                                            <div className="sm:hidden w-1/3 text-sm text-l-gray font-normal">{strings.operation}</div>
                                            <div className='flex sm:w-full w-2/3 justify-start items-center gap-2.5 sm:p-6'>
                                                <img className="hidden sm:block" src="/appIcons/deposit.svg" />
                                                <p className="text-base font-semibold text-d-gray">
                                                    {deposit.meta.type == "cancel_investment" ? strings.cancel_investment + " " + strings.inProp + " " + deposit.meta.property
                                                        : deposit.meta.type == "user_deposit" ? strings.user_deposit
                                                            : ""
                                                    }
                                                </p>
                                            </div>
                                        </td>
                                        <td className="text-base text-l-gray font-semibold sm:w-36 sm:table-cell flex items-center sm:border-none border-b ">
                                            <div className="sm:hidden w-1/3 text-sm text-l-gray font-normal">{strings.bankName}</div>
                                            <div>{strings.bankName}</div>
                                        </td>
                                        <td className="text-base text-d-green font-semibold sm:w-36 sm:table-cell flex items-center sm:border-none border-b">
                                            <div className="sm:hidden w-1/3 text-sm text-l-gray font-normal">{strings.amount}</div>
                                            <div>+{deposit.amount}</div>
                                        </td>
                                        <td className="text-base text-l-gray font-semibold sm:w-36 sm:table-cell flex items-center sm:border-none border-b">
                                            <div className="sm:hidden w-1/3 text-sm text-l-gray font-normal">{strings.currency}</div>
                                            <div>{strings.currency}</div>
                                        </td>
                                        <td className="text-base text-l-gray font-semibold sm:w-36 sm:table-cell flex items-center sm:border-none border-b" >
                                            <div className="sm:hidden w-1/3 text-sm text-l-gray font-normal">{strings.time}</div>
                                            <div style={{ direction: "ltr" }}>{time.toLocaleDateString()}<br />{time.toLocaleTimeString()}</div>
                                        </td>
                                        <td className="rounded text-base text-l-gray font-semibold sm:w-36 sm:table-cell flex items-center">
                                            <div className="sm:hidden w-1/3 text-sm text-l-gray font-normal">{strings.status}</div>
                                            <div></div>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    : ""}
            </Container>
            <Container className={"mt-4"}>
                <hr />
                <div className='flex items-center gap-2.5'>
                    <img className="w-6 h-6 object-contain" src={"/appIcons/withdrawals.svg"} />
                    <h3 className=' py-2 text-d-gray text-lg font-normal'>{strings.withdrawals}</h3>
                </div>
                {props.withdrawals ?
                    <table className="table-auto border-space w-full">
                        <thead>
                            <tr className={`${props.locale == 'ar' ? "text-right" : "text-left"} hidden sm:table-row`}>
                                <th className="text-sm text-l-gray font-normal w-56">{strings.operation}</th>
                                <th className="text-sm text-l-gray font-normal sm:w-36">{strings.bankName}</th>
                                <th className="text-sm text-l-gray font-normal sm:w-36">{strings.amount}</th>
                                <th className="text-sm text-l-gray font-normal sm:w-36">{strings.currency}</th>
                                <th className="text-sm text-l-gray font-normal sm:w-36">{strings.time}</th>
                                <th className="text-sm text-l-gray font-normal sm:w-36">{strings.status}</th>
                            </tr>
                        </thead>
                        <tbody>

                            {props.withdrawals.map(function (withdrawal, index) {
                                var time = new Date(withdrawal.created_at)
                                return (
                                    <tr key={index} className={`fav-shadow rounded bg-white sm:p-6 p-4 sm:table-row flex flex-col my-4 sm:h-16 ${props.locale == 'ar' ? "text-right" : "text-left"}`}>
                                        <td className="rounded w-18em sm:table-cell flex items-center sm:border-none border-b">
                                            <div className="sm:hidden w-1/3 text-sm text-l-gray font-normal">{strings.operation}</div>
                                            <div className='flex sm:w-full w-2/3 justify-start items-center gap-2.5 sm:p-6'>
                                                <img className="hidden sm:block" src="/appIcons/withdraw.svg" />
                                                <p className="text-base font-semibold text-d-gray">
                                                    {withdrawal.meta.type == "invest" ? strings.invest + " " + strings.inProp + " " + withdrawal.meta.property
                                                        : withdrawal.meta.type == "liquidize_investment" ? strings.liquidize_investment + " " + strings.inProp + " " + withdrawal.meta.property
                                                            : withdrawal.meta.type == "user_withdraw" ? strings.user_withdraw
                                                                : ""}
                                                </p>
                                            </div>
                                        </td>
                                        <td className="text-base text-l-gray font-semibold sm:w-36 sm:table-cell flex items-center sm:border-none border-b">
                                            <div className="sm:hidden w-1/3 text-sm text-l-gray font-normal">{strings.bankName}</div>
                                            <div>{strings.bankName}</div>
                                        </td>
                                        <td className="text-base text-d-red font-semibold sm:w-36 sm:table-cell flex items-center sm:border-none border-b">
                                            <div className="sm:hidden w-1/3 text-sm text-l-gray font-normal">{strings.amount}</div>
                                            <div>{withdrawal.amount}</div>
                                        </td>
                                        <td className="text-base text-l-gray font-semibold sm:w-36 sm:table-cell flex items-center sm:border-none border-b">
                                            <div className="sm:hidden w-1/3 text-sm text-l-gray font-normal">{strings.currency}</div>
                                            <div>{strings.currency}</div>
                                        </td>
                                        <td className="text-base text-l-gray font-semibold sm:w-36 sm:table-cell flex items-center sm:border-none border-b" >
                                            <div className="sm:hidden w-1/3 text-sm text-l-gray font-normal">{strings.time}</div>
                                            <div style={{ direction: "ltr" }}>{time.toLocaleDateString()}<br />{time.toLocaleTimeString()}</div>
                                        </td>
                                        <td className="rounded text-base text-l-gray font-semibold sm:w-36 sm:table-cell flex items-center">
                                            <div className="sm:hidden w-1/3 text-sm text-l-gray font-normal">{strings.status}</div>
                                            <div></div>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    : ""}
            </Container>


            {/* <Container className={"h-75vh text-center flex flex-col justify-center align-center"}>
                <img className='w-40 mx-auto' src="/appIcons/noInvestments.svg" />
                <h2 className='py-2 text-l-gray text-lg font-semibold'>{strings.noInvestments}<br />{strings.goToProps}</h2>
                <Link className="my-50 mx-auto w-1/4" href="/">
                    <Button type="button" className='flex justify-center w-full'>{strings.goToProps}
                    </Button>
                </Link>
            </Container> */}


        </Authenticated>
    );
}
