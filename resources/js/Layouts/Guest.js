import React, { useState } from 'react';
import Button from '@/Components/Button';
// import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import Footer from '@/Components/footer';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/inertia-react';
// import LocalizedStrings from 'react-localization';
import Container from '@/components/container'

import NotificationDropdown from '@/components/NotificationDropdown'
import ProfileDropdown from '@/components/ProfileDropdown'

export default function Guest({ strings, locale, auth, header, children, menu }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (<>
        <div className={`min-h-screen bg-white ${locale == "ar" ? "rtl dir-rtl" : "ltr dir-ltr"}`}>
            <nav className="bg-white" style={{ boxShadow: " 0px 4px 9px rgba(206, 206, 206, 0.6)" }}>
                <Container>
                    <div className="flex sm:justify-between sm:h-24">
                        <div className="flex">
                            <div className="hidden sm:-my-px sm:ml-10 sm:flex gap-6">
                                <NavLink href={route('/')} active={route().current('/')} className="m-0">
                                    {strings.home}
                                </NavLink>
                                <NavLink href={route('dashboard')} active={route().current('dashboard')} className="m-0">
                                    {strings.myInvest}
                                </NavLink>
                                <NavLink href={route('properties')} active={route().current('properties')} className="m-0">
                                    {strings.properties}
                                </NavLink>
                                <NavLink href="/#aboutUSDesc" active={route().current('/')} className="m-0">
                                    {strings.aboutUS}
                                </NavLink>

                                <NavLink href="/#howWorkdesc" active={route().current('/')} className="m-0">
                                    {strings.howWork}
                                </NavLink>
                                <NavLink href={route('/')} active={route().current('/')} className="m-0">
                                    {strings.terms}
                                </NavLink>

                            </div>
                        </div>

                        <nav className="">
                            <div className="flex justify-between  items-center sm:h-24">
                                {auth && auth.user != null ? (
                                    <div className="hidden sm:flex sm:items-center ">
                                        <div className="relative items-center flex gap-2.5">
                                            <NotificationDropdown strings={strings} locale={locale} auth={auth} />

                                            <ProfileDropdown strings={strings} locale={locale} auth={auth} menu={menu} />
                                        </div>
                                    </div>
                                ) :
                                    <div className="shrink-0 hidden sm:flex sm:items-center">
                                        <Link className="mr-2 font-bold" href={route('login1')}>
                                            {strings.login}
                                        </Link>
                                        <Link className="mr-2 font-bold" href={route('register')}>
                                            {strings.register}
                                        </Link>
                                        <Link className="mr-2" href="/">
                                            <Button type="button" >{strings.startInvest}
                                            </Button>
                                        </Link>
                                        {/* <NotificationIcon /> */}
                                    </div>}
                                <div className="-mr-2 flex items-center gap-2.5 sm:hidden">
                                    {auth && auth.user != null ? <NotificationDropdown strings={strings} locale={locale} auth={auth} />
                                        : ""}
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
                        </nav>

                    </div>
                </Container>

                <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden'}>
                    <div className="pb-3 space-y-1">
                        {auth && auth.user != null ?
                            <div className="pb-1 border-b border-gray-200">
                                <div className=" space-y-1">
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
                            :
                            ""}
                        <ResponsiveNavLink href={route('/')} active={route().current('/')}>
                            {strings.home}
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
                            {strings.myInvest}
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href={route('properties')} active={route().current('properties')}>
                            {strings.properties}
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
                            {strings.aboutUS}
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
                            {strings.howWork}
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
                            {strings.terms}
                        </ResponsiveNavLink>
                        {auth && auth.user != null ? ""
                            : <div className="pt-4 pb-1 border-t border-gray-200 flex flex-col">
                                <ResponsiveNavLink href={route('login1')} className={"font-bold"}>
                                    {strings.login}
                                </ResponsiveNavLink>
                                <ResponsiveNavLink href={route('properties')} >
                                    <Button type="button" >{strings.startInvest}
                                    </Button>
                                </ResponsiveNavLink>



                                {/* <NotificationIcon /> */}
                            </div>}
                    </div>


                </div>
            </nav>


            <main>{children}</main>



        </div><Footer strings={strings} locale={locale} /> </>
    );
}
