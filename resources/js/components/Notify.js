import React, { useState, useEffect } from 'react';
import Dropdown from '@/Components/Dropdown';
import axios from "axios";
import Popup from 'reactjs-popup';

export default function Notify({ notify, inProp, className = '', message, icon, strings, locale }) {
    // console.log("data",notify.data)
    let [pin, setPin] = useState(notify.pinned);
    let [deleted, setDeleted] = useState(false);
    const unpin_notification = (e) => {
        e.preventDefault();
        axios.put(route("unpin_notification", notify.id)).then(response => setPin(false));
    };
    const pin_notification = (e) => {
        e.preventDefault();
        axios.put(route("pin_notification", notify.id)).then(response => setPin(true));
    };
    const delete_notification = (e) => {
        e.preventDefault();
        axios.delete(route("delete_notification", notify.id)).then(response => setDeleted(true));
    };
    let date1 = new Date(notify.created_at);
    let today = new Date();
    return (
        <div className={`relative py-4 border-b border-gray-100 ${deleted ? "hidden" : "block"} ${notify.read_at == null ? "bg-unread" : "bg-white"} ${locale == 'ar' ? "text-right" : "text-left"}`}>

            {pin ?
                <img className="object-contain w-4 h-6 absolute top-0 right-0" src={"/appIcons/pin.svg"} />
                : ""}
            <div className='flex justify-between items-center gap-2.5'>
                <img className="object-contain w-10 h-10" src={icon} />
                <div className='w-full'>
                    <p className='text-d-gray text-sm font-semibold'>
                        {message} {notify.data.amount} {inProp ? inProp : ""} {notify.data.property ? notify.data.property : ""}
                    </p>
                    <p className='text-l-gray text-sm font-normal' style={{ direction: "ltr" }}>{today.toLocaleDateString() === date1.toLocaleDateString() ? "" : date1.toLocaleDateString()} {date1.toLocaleTimeString()}</p>

                </div>
                <div className='relativ'>

                    <Popup
                        trigger={
                            <img className='cursor-pointer m-4' src="/appIcons/optionsDotsH.svg" />
                        }
                        position="right top"
                        on="hover"
                        closeOnDocumentClick
                        mouseLeaveDelay={300}
                        mouseEnterDelay={0}
                        contentStyle={{ padding: '0px', border: 'none' }}
                        arrow={false}
                        className='notify'

                    >
                        <div className={`modal w-32 bg-white rounded fav-shadow ${locale == "ar" ? "rtl dir-rtl" : "ltr dir-ltr"}`}>
                            {pin ?

                                <form onSubmit={unpin_notification} className={"border-b border-gray-100"}>
                                    <button type="submit" className="w-full p-2 ">
                                        {strings.unpin}
                                    </button>
                                </form>
                                :

                                <form onSubmit={pin_notification} className={"border-b border-gray-100"}>
                                    <button type="submit" className="w-full p-2 ">
                                        {strings.pin}
                                    </button>
                                </form>
                            }
                            <form onSubmit={delete_notification} className={"border-b border-gray-100"}>
                                <button type="submit" className="w-full p-2 ">
                                    {strings.delete}
                                </button>
                            </form>

                        </div>
                    </Popup>
                </div>


            </div>
        </div>
    );
}