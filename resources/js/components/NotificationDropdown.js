import React, { useState, useEffect } from 'react';
import Dropdown from '@/Components/Dropdown';
import Notify from '@/components/Notify';
import NotificationIcon from '@/components/notificationIcon'
import axios from "axios";

export default function NotificationDropdown({ strings, locale, auth }) {
    let [unRead, setUnRead] = useState(false);
    const submit = (e) => {
        e.preventDefault();
        axios.get(route("markAllAsRead", auth.user.id)).then(response => setUnRead(false));
    };
    let notify = auth ? auth.notifications : null;

    // const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    useEffect(() => {
        if (notify) {

            for (var i = 0; i < Object.keys(notify).length; i++) {
                if (notify[i].read_at === null) {
                    setUnRead(true);
                    console.log(true)
                    break;
                }
            }
        }
    }, [notify]);

    return (
        <Dropdown>
            <Dropdown.Trigger>
                <form onSubmit={submit}>
                    <button type="submit" className="">
                        <NotificationIcon unRead={unRead} />
                    </button>
                </form>
            </Dropdown.Trigger>
            <Dropdown.Content width={'480'} align={locale == "ar" ? "left" : "right"}>
                <div className='py-2 mx-8'>
                    <h6 className='text-d-gray text-lg font-semibold'>{strings.notifications}</h6>
                    <hr className='py-2' style={{ borderTopColor: "rgba(172, 172, 172, 1)" }} />
                    {Object.keys(notify).length ?
                        Object.keys(notify).map(function (index) {

                            // console.log();
                            return (
                                <div key={index}>

                                        {notify[index].data.type === 'invest' ?

                                            <Notify
                                                notify={notify[index]}
                                                inProp={strings.inProp}
                                                message={strings.investNotify}
                                                icon="/appIcons/notifyApproved.svg"
                                                strings={strings}
                                                locale={locale}
                                            />

                                            : notify[index].data.type === 'user_deposit' ?
                                                <Notify
                                                    notify={notify[index]}
                                                    message={strings.depositNotify}
                                                    icon="/appIcons/notifyDeposit.svg"
                                                    strings={strings}
                                                    locale={locale}
                                                />
                                                : notify[index].data.type === 'user_withdrawal' ?
                                                    <Notify
                                                        notify={notify[index]}
                                                        message={strings.withdrawalNotify}
                                                        icon="/appIcons/notifyWithdraw.svg"
                                                        strings={strings}
                                                        locale={locale}
                                                    />
                                                    : notify[index].data.type === 'cancel_investment' ?
                                                        <Notify
                                                            notify={notify[index]}
                                                            inProp={strings.inProp}
                                                            message={strings.cancelInvestmentNotify}
                                                            icon="/appIcons/notifyDeposit.svg"
                                                            strings={strings}
                                                            locale={locale}
                                                        />

                                                        : ""}

                                    </div>
                            )
                        }) :
                        <Dropdown.Link href={"#"} method="get" as="button">
                            <div className='text-center flex flex-col justify-center items-center'>
                                <NotificationIcon fill={"#6A6A6A"} />
                                <p className='text-base text-l-gray'>{strings.noNoti}</p>
                            </div>

                        </Dropdown.Link>
                    }
                </div>

            </Dropdown.Content>
        </Dropdown>
    );
}