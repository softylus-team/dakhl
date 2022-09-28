import React, { useState } from 'react';
import Dropdown from '@/Components/Dropdown';
import Notify from '@/components/Notify';
import NotificationIcon from '@/components/notificationIcon'

export default function ProfileDropdown({ strings, locale, auth,menu }) {
    // const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    // console.log(menu);
    return (
        <Dropdown>
            <Dropdown.Trigger>
                <div className="inline-flex rounded-md  items-center text-sm leading-4 font-medium">
                        <img className="w-10 h-10 object-cover" src={auth.user.photo_path ? auth.user.photo_path : "/profiles/defaultProfile.png"} alt={auth.user.first_name} />
                        <svg className="mr-2" width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.4211 0.711914H0.578825C0.0657524 0.711914 -0.195624 1.33147 0.172239 1.69934L5.59339 7.12048C5.81604 7.34314 6.1839 7.34314 6.40666 7.12048L11.8278 1.69934C12.1956 1.33147 11.9342 0.711914 11.4211 0.711914Z" fill="#1F1F1F" />
                        </svg>
                </div>
            </Dropdown.Trigger>

            <Dropdown.Content width={'56'} align={locale == "ar" ? "left" : "right"}>
                <Dropdown.Link href={route('myaccount', auth.user.id)} method="get" as="button">
                    <div className='py-2 flex border-b border-gray-100'>
                        <img className="w-10 h-10 object-cover" src={auth.user.photo_path ? auth.user.photo_path : "/profiles/defaultProfile.png"} />
                        <div className={`px-2 ${locale == "ar" ? "text-right" : "text-left"}`}>
                            <p className='text-d-blue text-base font-semibold'>{auth.user.first_name}</p>
                            <p className='text-l-gray text-sm font-normal'>{auth.user.email}</p>
                        </div>
                    </div>
                </Dropdown.Link>
                {menu.profile.map(function (item, index) {
                    return (
                        <Dropdown.Link key={index} href={`${item.url}/${locale}`} method="get" as="button">
                            <div className='flex gap-2.5'>
                                <img className="object-contain w-4 h-6" src={item.icon} />
                                <p className='text-d-gray text-sm font-semibold'>{locale == 'ar' ? item.text_ar : item.text_en}</p>
                            </div>
                        </Dropdown.Link>
                    )
                })}
                <Dropdown.Link href={route('logout')} method="post" as="button">

                    <div className='flex gap-2.5'>
                        <img className="object-contain w-4 h-6" src={"/appIcons/logout.svg"} />
                        <p className='text-l-gray text-sm font-semibold'>{strings.logout}</p>
                    </div>
                </Dropdown.Link>
                {/* <Dropdown.Link href={route('ResetPassword')} method="get" as="button">
                    Reset Password
                </Dropdown.Link > */}
            </Dropdown.Content>
        </Dropdown>
    );
}