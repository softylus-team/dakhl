import React from 'react';

export default function PaymentSteps({ step, className = '', strings }) {

    return (<>
        <div className='hidden sm:flex items-center gap-2.5 w-2/3 mx-auto my-8'>
            <div className='w-1/3 flex items-center justify-center gap-2.5'>
                <p className='text-white bg-d-blue rounded-full w-10 h-10 flex justify-center items-center text-xl font-semibold'>1
                </p>
                <p className='text-d-blue text-base font-semibold' >{strings.investment_details}</p>
            </div>
            <hr className='w-1/4' style={{borderTopColor:"#1F1F1F",borderTopWidth: "2px"}}/>
            <div className='w-1/3 flex items-center justify-center gap-2.5'>
                <p className={`${step==1?"text-l-gray border border-gray":"text-white bg-d-blue"} rounded-full w-10 h-10 flex justify-center items-center text-xl font-semibold`}>2
                </p>
                <p className={`${step==1?"text-l-gray":"text-d-blue"} text-base font-semibold`} >{strings.payment}</p>
            </div>
            <hr className='w-1/4' style={{borderTopColor:"#1F1F1F",borderTopWidth: "2px"}}/>
            <div className='w-1/3 flex items-center justify-center gap-2.5'>
                <p className={`${step==2 || step==1?"text-l-gray border border-gray":"text-white bg-d-blue"} rounded-full w-10 h-10 flex justify-center items-center text-xl font-semibold`}>3
                </p>
                <p className={`${step==2 || step==1?"text-l-gray":"text-d-blue"} text-base font-semibold`} >{strings.confirm_payment}</p>
            </div>
        </div>
        <div className='sm:hidden flex items-center gap-2.5 mx-auto my-8'>
            <div className='w-1/4 rounded-full h-1 bg-d-blue'>
            </div>
            <div className={`w-1/4 rounded-full h-1 ${step==1?"bg-l-blue":" bg-d-blue"}`}>
            </div>
            <div className={`w-1/4 rounded-full h-1 ${step==2 || step==1?"bg-l-blue":" bg-d-blue"}`}>
            </div>
            <p className='w-1/4 text-xs text-d-blue'>(3/<span className="font-bold">{step}</span> {strings.completed})</p>
        </div>
</>
    );
}