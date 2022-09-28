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
export default function DashboardAdmin(props) {
    console.log(props);
    let strings = new LocalizedStrings(stringss);
    strings.setLanguage(props.locale);
    return (
        <Authenticated
            locale={props.locale}
            auth={props.auth}
            errors={props.errors}
            header={strings.investments}
            menu={props.menu}
            strings={strings}
        >
            <Head title="Dashboard" />
            <Container>
            <div className="my-4 h-20 bg-m2-blue rounded flex sm:hidden justify-center items-center gap-4">
                        <img className="w-6 h-6 object-contain" src="/appIcons/balance.svg" />
                        <div>
                            <p className='text-white text-2xl font-bold'>{props.balance} K</p>
                            <p className='text-white text-sm font-normal'>{strings.sizelBalance} </p>
                        </div>
                    </div>
                <div className="sm:flex sm:justify-between grid grid-cols-2 gap-2.5">
                    <StaticsCard imgClass="w-10 h-10" className="sm:w-18 h-20" icon={"/appIcons/sizelBalance.svg"} title={strings.sizelBalance} amount={props.balance} currency={strings.currency} />
                    <StaticsCard imgClass="w-10 h-10" className="sm:w-18 h-20" icon={"/appIcons/numberInvestors.svg"} title={strings.numberInvestors} amount={props.TotalUsers}  />
                    <StaticsCard imgClass="w-10 h-10" className="sm:w-18 h-20" icon={"/appIcons/openInvestment.svg"} title={strings.openInvestment} amount={props.openProperty} />
                    <StaticsCard imgClass="w-10 h-10" className="sm:w-18 h-20" icon={"/appIcons/closedInvestment.svg"} title={strings.closedInvestment} amount={props.closedProperty} />
                    <StaticsCard imgClass="w-10 h-10" className="sm:w-18 h-20" icon={"/appIcons/numberInvoices.svg"} title={strings.numberInvoices} amount={props.numberOpenInvestment}  />
                </div>
            </Container>
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
                                <h2 className='text-center pt-2 pb-7 text-d-gray text-lg font-semibold'>{strings.InvestmentReturnForEachFund}</h2>
                                <ProfitChart totalProfit={strings.totalProfit} totalLoss={strings.totalLoss} totalPays={strings.totalPays} />
                                <div className="chartInner">
                                    <h2 className="text-lg text-l-gray font-bold text-center">50%</h2>
                                    <p className="text-sm text-l-gray font-normal text-center">{strings.totalProfit}</p>
                                </div>
                            </div>
                        </div>

                    </Container>

        </Authenticated>
    );
}
