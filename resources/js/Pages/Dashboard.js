import React from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Link,Head } from '@inertiajs/inertia-react';
import LocalizedStrings from 'react-localization';
import stringss from "../../strings";
import StaticsCard from "@/components/StaticsCard";
import Button from '@/Components/Button';
import Container from '@/components/container';
import ReturnChart from '@/components/ReturnChart'
import ProfitChart from '@/components/profitChart'
import InvestmentRow from '@/components/InvestmentRow'
export default function Dashboard(props) {
    console.log(props.stakes);
    let strings = new LocalizedStrings(stringss);
    strings.setLanguage(props.locale);
    return (
        <Authenticated
            locale={props.locale}
            auth={props.auth}
            errors={props.errors}
            header={strings.myInvest}
            menu={props.menu}
            strings={strings}
        >
            <Head title="Dashboard" />
            <Container>
            <div className="my-4 h-20 bg-m2-blue rounded flex sm:hidden justify-center items-center gap-4">
                        <img className="w-6 h-6 object-contain" src="/appIcons/balance.svg" />
                        <div>
                            <p className='text-white text-2xl font-bold'>{props.balance} {strings.currency}</p>
                            <p className='text-white text-sm font-normal'>{strings.totalBalance}</p>
                        </div>
                    </div>
                <div className="sm:flex sm:justify-between grid grid-cols-2 gap-2.5">
                    <div className="w-18 h-20 bg-m2-blue rounded hidden sm:flex justify-center items-center gap-4">
                        <img className="w-6 h-6 object-contain" src="/appIcons/balance.svg" />
                        <div>
                            <p className='text-white text-2xl font-bold'>{props.balance} {strings.currency}</p>
                            <p className='text-white text-sm font-normal'>{strings.totalBalance}</p>
                        </div>
                    </div>
                    <StaticsCard imgClass="w-10 h-10" className="sm:w-18 h-20" icon={"/appIcons/totalPays.svg"} title={strings.totalPays} amount={props.totalPays} currency={strings.currency} />
                    <StaticsCard imgClass="w-10 h-10" className="sm:w-18 h-20" icon={"/appIcons/monthlyReturn.svg"} title={strings.monthlyReturn} amount={props.monthlyReturn} currency={strings.currency} />
                    <StaticsCard imgClass="w-10 h-10" className="sm:w-18 h-20" icon={"/appIcons/openInvestment.svg"} title={strings.openInvestment} amount={props.openInvestment} />
                    <StaticsCard imgClass="w-10 h-10" className="sm:w-18 h-20" icon={"/appIcons/closedInvestment.svg"} title={strings.closedInvestment} amount={props.closedInvestment} />
                </div>
            </Container>
            {props.stakes.length ?
                <>
                    <Container className={"mb-8 mt-10"}>
                        <div className="sm:flex justify-between items-stretch">
                            <div className='rounded sm:my-0 my-4 bg-white p-6 fav-shadow sm:w-72%'>
                                <div className='relative'>
                                    <img className='absolute top-0 right-0' src="/appIcons/optionsDotsH.svg" />
                                    <h2 className='text-center py-2 text-d-gray text-xl font-semibold'>{strings.returnChartHeader}</h2>
                                </div>
                                <ReturnChart months={strings.months} yLabel={strings.yLabel} xLabel={strings.xLabel} openInvestment={strings.openInvestment} closedInvestment={strings.closedInvestment} />
                            </div>
                            <div className='rounded bg-white fav-shadow sm:w-1/4 relative py-6'>
                                <h2 className='text-center pt-2 pb-7 text-d-gray text-lg font-semibold'>{strings.profitChartHeader}</h2>
                                <ProfitChart totalProfit={strings.totalProfit} totalLoss={strings.totalLoss} totalPays={strings.totalPays} />
                                <div className="chartInner">
                                    <h2 className="text-lg text-l-gray font-bold text-center">50%</h2>
                                    <p className="text-sm text-l-gray font-normal text-center">{strings.totalProfit}</p>
                                </div>
                            </div>
                        </div>

                    </Container>

                    <Container className={""}>
                        <hr />
                        <h2 className='underline py-2 text-d-blue text-lg font-semibold'>{strings.investments}</h2>

                        <table className="table-auto border-space w-full">
                            <thead>
                                <tr className={`${props.locale == 'ar' ? "text-right" : "text-left"} hidden sm:table-row`}>
                                    <th className="text-sm text-l-gray font-normal w-56">{strings.investmentName}</th>
                                    <th className="text-sm text-l-gray font-normal w-36">{strings.price}</th>
                                    <th className="text-sm text-l-gray font-normal w-36">{strings.totalPays}</th>
                                    <th className="text-sm text-l-gray font-normal w-36">{strings.expected_return}</th>
                                    <th className="text-sm text-l-gray font-normal w-36">{strings.status}</th>
                                    {/* <th className="text-sm text-l-gray font-normal w-36">{strings.profitLoss}</th> */}
                                    <th className="text-sm text-l-gray font-normal">{strings.period}</th>
                                </tr>
                            </thead>
                            <tbody>

                                {props.stakes.reverse().map(function (stake, index) {
                                    return (
                                        stake.investments.reverse().map(function (investment, index) {
                                            return (
                                                <InvestmentRow investment={investment} strings={strings} locale={props.locale} key={index} />
                                            )
                                        })

                                    )
                                })}
                            </tbody>
                        </table>

                    </Container>
                </> 
                :
                <Container className={"h-75vh text-center flex flex-col justify-center align-center"}>
                    <img className='w-40 mx-auto' src="/appIcons/noInvestments.svg"/>
                    <h2 className='py-2 text-l-gray text-lg font-semibold'>{strings.noInvestments}<br/>{strings.goToProps}</h2>
                    <Link className="my-50 mx-auto w-1/4" href="/">
                        <Button type="button" className='flex justify-center w-full'>{strings.goToProps}
                        </Button>
                    </Link>
                </Container>
                }

        </Authenticated>
    );
}
