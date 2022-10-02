import React, { useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLinkSide';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/inertia-react';
import LocalizedStrings from 'react-localization';
import NotificationDropdown from '@/components/NotificationDropdown'
import ProfileDropdown from '@/components/ProfileDropdown'

export default function Authenticated({ auth, header, children, locale, menu, strings }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    let notify = auth.notifications;
    let unRead = false;
    Object.keys(notify).map(function (index) {
        if (notify[index].read_at == null) unRead = true;
    });
    // console.log(notify);
    // console.log(auth.user.role);
    return (<>
        <div className={`min-h-screen flex ${locale == 'ar' ? "rtl" : "ltr"}`} style={{ backgroundColor: "#F8FCFC", direction: `${locale == 'ar' ? "rtl" : "ltr"}` }}>
            <div className="bg-white hidden sm:block w-1/6" >
                <div className="h-24">
                    {/* <Link href="/">
                                    <ApplicationLogo className="block h-9 w-auto text-gray-500" />
                                </Link> */}
                </div>

                <div className="hidden space-x-8 sm:-my-px sm:flex flex-col">
                    {auth.user.role=="admin" ?  ( <div className="hidden space-x-8 sm:-my-px sm:flex flex-col">
                            {menu.sideAdmin.map(function (item, index) {
                            let url = item.url.replace("/", "");
                            url === "" ? url = "/" : url = item.url.replace("/", "");
                            return (
                                <NavLink key={index} href={`${item.url}/${locale}`} icon={item.icon} text={locale == 'ar' ? item.text_ar : item.text_en} active={route().current(url)} />
                                
                                )
                            })}
                              <hr />
                                <ResponsiveNavLink href={route('logout')} method="post" as="button">

                                <div className='flex gap-2.5'>
                                    <img className="object-contain w-4 h-6" src={"/appIcons/logout.svg"} />
                                    <p className='text-l-gray text-sm font-semibold'>{strings.logout}</p>
                                </div>
                                </ResponsiveNavLink>
                            </div> )
                            :
                            (<div className="hidden space-x-8 sm:-my-px sm:flex flex-col">
                            {menu.side.map(function (item, index) {
                            let url = item.url.replace("/", "");
                            url === "" ? url = "/" : url = item.url.replace("/", "");
                            return (
                                <NavLink key={index} href={`${item.url}/${locale}`} icon={item.icon} text={locale == 'ar' ? item.text_ar : item.text_en} active={route().current(url)} />
                                
                                )
                            })}
                      
                      <hr />
                      <NavLink href={`/settings/${locale}`} active={route().current('settings')} icon="/appIcons/setting.svg" text={strings.settings} />
                      <NavLink href={"#"} active={route().current('help')} icon="/appIcons/help.svg" text={strings.help} /> 
                      </div> 
                      
                      )
                    
                    }
                    

                    {/* {auth.user ? (
                        auth.user.role === "admin" ? (
                            <NavLink href={route('users')} active={route().current('users')}>
                                Users
                            </NavLink>
                        ) : ""
                    ) : ""} */}
                </div>
            </div>
            {/* <nav className="bg-white border-b border-gray-100"> */}
            <div className="sm:w-5/6 w-full" style={{ boxShadow: "0px 1px 11px rgba(117, 117, 117, 0.25) inset", backgroundColor: "#F8FCFC", direction: `${locale == 'ar' ? "rtl" : "ltr"}` }}>
                <nav className="">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between  items-center h-24">
                            <h2 className="font-bold text-xl text-d-blue leading-tight">{header}</h2>
                            <div className="hidden sm:flex sm:items-center ">
                                <div className="relative items-center flex gap-2.5">
                                    <NotificationDropdown strings={strings} locale={locale} auth={auth} />
                                    <ProfileDropdown strings={strings} locale={locale} auth={auth} menu={menu} />
                                </div>
                            </div>
                            <div className="-mr-2 flex items-center gap-2.5 sm:hidden">
                                <NotificationDropdown strings={strings} locale={locale} auth={auth} />

                                <button
                                    onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                                    className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                                >
                                    <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                        <path
                                            className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                        <path
                                            className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden'}>
                        <div className="pb-1 border-b border-gray-200">
                            <div className="mt-3 space-y-1">
                                <ResponsiveNavLink href={route('myaccount', auth.user.id)} method="get" as="button">
                                    <div className='py-2 flex border-b border-gray-100'>
                                        <img className="w-10 h-10 object-cover" src={auth.user.photo_path ? auth.user.photo_path : "/profiles/defaultProfile.png"} />
                                        <div className={`px-2 ${locale == "ar" ? "text-right" : "text-left"}`}>
                                            <p className='text-d-blue text-base font-semibold'>{auth.user.first_name}</p>
                                            <p className='text-l-gray text-sm font-normal'>{auth.user.email}</p>
                                        </div>
                                    </div>
                                </ResponsiveNavLink>
                                {menu.profile.map(function (item, index) {
                                    return (
                                        <ResponsiveNavLink key={index} href={item.url} method="get" as="button">
                                            <div className='flex gap-2.5'>
                                                <img className="object-contain w-4 h-6" src={item.icon} />
                                                <p className='text-d-gray text-sm font-semibold'>{locale == 'ar' ? item.text_ar : item.text_en}</p>
                                            </div>
                                        </ResponsiveNavLink>
                                    )
                                })}
                                <ResponsiveNavLink href={route('logout')} method="post" as="button">

                                    <div className='flex gap-2.5'>
                                        <img className="object-contain w-4 h-6" src={"/appIcons/logout.svg"} />
                                        <p className='text-l-gray text-sm font-semibold'>{strings.logout}</p>
                                    </div>
                                </ResponsiveNavLink>
                                {/* <ResponsiveNavLink method="get" href={route('ResetPassword')} as="button">
                                Reset Password
                            </ResponsiveNavLink> */}
                            </div>
                        </div>


                    </div>
                </nav>

                {/* {header && (
                <header className="bg-white shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">{header}</div>
                </header>
            )} */}

                <main>{children}</main>


            </div>
        </div></>
    );
}
