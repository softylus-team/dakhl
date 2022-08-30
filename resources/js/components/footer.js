import React from 'react';
import Container from '@/components/container'
import NavLink from '@/Components/NavLinkFooter';

export default function Footer({ locale, strings }) {
    return (
        <footer className={`w-full bsolute bottom-0 left-0 right-0 ${locale === 'ar' ? "rtl" : "ltr"}`} style={{ backgroundColor: "#F0F6F9", direction: `${locale === 'ar' ? "rtl" : "ltr"}` }}>
            <Container className={`text-center ${locale=="ar"? "sm:text-right":"sm:text-left"}`}>
                <div className='pt-14 sm:flex'>
                    <div className='sm:w-2/3 px-2 sm:flex justify-between'>
                        <div className='flex flex-col'>
                            {/* <img src=""/> */}
                            <p className='font-bold text-base text-black'>LOGO</p>
                            <p className='text-sm text-d-gray'>{strings.footerLogoTitle}</p>
                            <p className='text-sm text-l-gray'>{strings.footerLogoDesc}</p>
                        </div>
                        <div className='flex flex-col'>
                            <p className='font-bold text-base  text-black'>{strings.companyID}</p>
                            <NavLink className={`text-center ${locale=="ar"? "sm:text-right":"sm:text-left"}`} href={route('dashboard')} active={route().current('dashboard')}> {strings.aboutCompany}</NavLink>
                            <NavLink className={`text-center ${locale=="ar"? "sm:text-right":"sm:text-left"}`} href={route('dashboard')} active={route().current('dashboard')}> {strings.ceo}</NavLink>
                            <NavLink className={`text-center ${locale=="ar"? "sm:text-right":"sm:text-left"}`} href={route('dashboard')} active={route().current('dashboard')}> {strings.faq}</NavLink>
                        </div>
                        <div className='flex flex-col'>
                            <p className='font-bold text-base  text-black'>{strings.legal}</p>
                            <NavLink className={`text-center ${locale=="ar"? "sm:text-right":"sm:text-left"}`} href={route('dashboard')} active={route().current('dashboard')}> {strings.terms}</NavLink>
                            <NavLink className={`text-center ${locale=="ar"? "sm:text-right":"sm:text-left"}`} href={route('dashboard')} active={route().current('dashboard')}> {strings.islamic}</NavLink>
                            <NavLink className={`text-center ${locale=="ar"? "sm:text-right":"sm:text-left"}`} href={route('dashboard')} active={route().current('dashboard')}> {strings.conditions}</NavLink>
                            <NavLink className={`text-center ${locale=="ar"? "sm:text-right":"sm:text-left"}`} href={route('dashboard')} active={route().current('dashboard')}> {strings.policy}</NavLink>
                        </div>
                    </div>
                    <div className='sm:w-1/3 sm:flex flex-col gap-2.5'>
                        <div className='sm:flex justify-between'>
                            <div className='sm:flex gap-6 items-center'>
                                <p className='font-bold text-base  text-black'>{strings.contactUs}</p>
                                <img className="w-6 h-6 inline" src="/appIcons/emails.svg" />
                                <img className="w-6 h-6 inline" src="/appIcons/phones.svg" />
                            </div>

                            <div><img className="w-20 mx-auto" src="/appIcons/contactus.png" /></div>
                        </div>
                        <p className='text-sm text-l-gray'>{strings.contactUsdesc}</p>
                        <div className='flex justify-center sm:justify-start gap-2.5 pt-2'>
                        <img className="w-4 h-4" src="/appIcons/facebook.svg" />
                                <img className="w-4 h-4" src="/appIcons/instagram.svg" />
                                <img className="w-5 h-4" src="/appIcons/youtub.svg" />
                        </div>
                    </div>
                </div>
                <p className='text-center text-xs leading-4 font-medium text-gray-500 py-6' >{strings.copyright}</p>
            </Container>

        </footer>

    );
}