
import React from 'react';
import ProfitLossChart from '@/components/profitLossChart'
import Dropdown from '@/Components/Dropdown';

export default function InvestmentRow({ locale, investment, strings }) {
    var d = new Date(investment.created);
    d.setMonth(d.getMonth() + investment.period);
    // console.log(investment.created);
    return (
        <tr className='fav-shadow rounded bg-white sm:p-6 p-4 sm:table-row flex flex-col my-4' >
            <td className="sm:hidden">
                <Dropdown>
                    <Dropdown.Trigger>
                        <img className={`cursor-pointer absolute top-0 ${locale == 'ar' ? "left-0" : "right-0"}`} src="/appIcons/optionsDotsV.svg" />
                    </Dropdown.Trigger>

                    <Dropdown.Content width={'56'} align={locale == "ar" ? "left" : "right"}>

                        {strings.investmentOptions.map(function (item, index) {
                            return (
                                <Dropdown.Link key={index} href={`${item.url}/${locale}`} method="get" as="button" className={"border-b border-gray-100"}>
                                    <div className='flex gap-2.5'>
                                        <img className="object-contain w-4 h-4" src={item.icon} />
                                        <p className='text-d-gray text-sm font-semibold'>{item.title}</p>
                                    </div>
                                </Dropdown.Link>
                            )
                        })}
                    </Dropdown.Content>
                </Dropdown>
            </td>
            <td className='rounded sm:table-cell flex items-center sm:border-none border-b'>
                <div className="sm:hidden w-40 text-sm text-l-gray font-normal">{strings.investmentName}</div>
                <div className='flex justify-start items-center gap-2.5 sm:p-6'>
                    <img className="hidden sm:block" src="/appIcons/investment.svg" />
                    <p className="sm:text-lg text-base font-semibold text-d-gray">{investment.property}</p>
                </div>
            </td>
            <td className="text-lg font-normal text-l-gray sm:table-cell flex items-center sm:border-none border-b">
                <div className="sm:hidden w-40 text-sm text-l-gray font-normal w-36">{strings.price}</div>
                <div>{investment.price} {strings.currency}</div>
            </td>
            <td className="text-lg font-normal text-d-gray sm:table-cell flex items-center sm:border-none border-b">
                <div className="sm:hidden w-40 text-sm text-l-gray font-normal w-36">{strings.totalPays}</div>
                <div>{investment.amount} {strings.currency}</div>
            </td>
            <td className="text-lg font-semibold text-d-blue sm:table-cell flex items-center sm:border-none border-b">
                <div className="sm:hidden w-40 text-sm text-l-gray font-normal w-36">{strings.expected_return}</div>
                <div>30% ({investment.monthlyProfit} {strings.currency})</div>
            </td>
            <td className="sm:w-20 sm:table-cell flex items-center sm:border-none border-b">
                <div className="sm:hidden w-40 text-sm text-l-gray font-normal w-36">{strings.status}</div>
                <div>
                    {investment.state == "pending" ? <p className="w-16 text-center text-lg text-d-green bg-l-green">{strings.opened}</p> : <p className="w-16 text-center text-lg text-d-red bg-l-red">{strings.closed}</p>}
                </div>
            </td>
            {/* <td className="relative sm:table-cell flex items-center sm:border-none border-b">
                <div className="sm:hidden w-40 text-sm text-l-gray font-normal w-36">{strings.profitLoss}</div>
                <div className="relative w-16">
                    <ProfitLossChart profitLoss={investment.profitLoss} />
                    <h4 className='chartInner text-center'>{investment.profitLoss}%</h4>
                </div>
            </td> */}
            <td className="sm:table-cell flex items-center">
                <div className="sm:hidden w-40 text-sm text-l-gray font-normal w-36">{strings.period}</div>
                <div><p className="text-lg font-semibold text-d-gray">{investment.period} {strings.month}</p>
                    <p className="text-base font-normal text-l-gray">{strings.endin} {d.toLocaleDateString()}</p>
                </div>
            </td>
            <td className="hidden sm:flex flex-col w-4 rounded ">
                <Dropdown>
                    <Dropdown.Trigger>
                        <img className={`cursor-pointer m-4 absolute top-0 ${locale == 'ar' ? "left-0" : "right-0"}`} src="/appIcons/optionsDotsV.svg" />
                    </Dropdown.Trigger>

                    <Dropdown.Content width={'56'} align={locale == "ar" ? "left" : "right"}>

                        {strings.investmentOptions.map(function (item, index) {
                            return (
                                <Dropdown.Link key={index} href={`${item.url}/${locale}`} method="get" as="button" className={"border-b border-gray-100"}>
                                    <div className='flex gap-2.5'>
                                        <img className="object-contain w-4 h-4" src={item.icon} />
                                        <p className='text-d-gray text-sm font-semibold'>{item.title}</p>
                                    </div>
                                </Dropdown.Link>
                            )
                        })}
                    </Dropdown.Content>
                </Dropdown>
            </td>
        </tr>
    );
}