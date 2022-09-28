import React from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Link, Head } from '@inertiajs/inertia-react';
import LocalizedStrings from 'react-localization';
import stringss from "../../strings";
import Container from '@/components/container';
import Dropdown from '@/Components/Dropdown';

// import PropertiesCollection from "../components/Properties";
export default function Users(props) {
    // // console.log(props.auth.user);
    const Users = props.Users;
    console.log(Users);
    console.log(props);
    // console.log(Users[0].created_at.toLocaleDateString());
    let strings = new LocalizedStrings(stringss);
    strings.setLanguage(props.locale);
    return (
        <Authenticated
            locale={props.locale}
            auth={props.auth}
            errors={props.errors}
            header={strings.users}
            menu={props.menu}
            strings={strings}
        >
            <Head title="Users List" />
            <Container>
                <div className="max-w-6xl mx-auto mt-6 mb-6 sm:px-6 lg:px-8">
                    <table className="table-auto w-full">
                        <thead>
                            <tr  className={ ` ${props.locale == 'ar' ? "text-center" : "text-left"} hidden sm:table-row`}>
                                <th className="text-sm text-l-gray font-normal w-56">#</th>
                                <th className="text-sm text-l-gray font-normal w-56">{strings.full_name}</th>
                                <th className="text-sm text-l-gray font-normal w-56">{strings.email}</th>
                                <th className="text-sm text-l-gray font-normal w-56">{strings.phone}</th>
                                <th className="text-sm text-l-gray font-normal w-56">{strings.Identification}</th>
                                <th className="text-sm text-l-gray font-normal w-56">{strings.joining_date}</th>
                                <th className="text-sm text-l-gray font-normal w-56">{strings.status}</th>
                                <th className="text-sm text-l-gray font-normal w-56">{strings.more}</th>
                                
                            </tr>
                        </thead>
                        <tbody className='MuiSlider-thumb px-8'>
                            {(Users)?
                            
                            Users.map((User, index) =>
                                // Only do this if items have no stable IDs
                                <tr key={index} className="text-center px-8 border-b">
                                    <td className=" text-d-black font-normal w-56">{++index}</td>
                                    <td className="text-sm text-d-black font-normal w-56 ">{User.first_name} {User.last_name}</td>
                                    <td className="text-sm text-d-black font-normal w-56 ">{User.email}</td>
                                    <td className="text-sm text-d-black font-normal w-56 ">{User.phone}</td>
                                    <td className="text-sm text-d-black font-normal w-56 ">{User.national_id}</td>
                                    <td className="text-sm text-d-black font-normal w-56 ">{User.created_at}</td>
                                    <td className="text-sm text-d-black font-normal w-56 ">{User.role}</td>
                                    <td className="">
                                        <Dropdown>
                                            <Dropdown.Trigger>
                                                <div className="inline-flex rounded-md  items-center text-sm leading-4 font-medium">
                                                        <img className="mr-2 mt-4" width="7" height="3" viewBox="0 0 10 6" fill="none" src="/appIcons/dotsThree.svg" />
                                                </div>
                                            </Dropdown.Trigger>
                                            <Dropdown.Content width={'56'} align= "ar" >
                                                <Dropdown.Link href={route('disableUser', User.id)} method="get" as="button">
                                                    <div className='py-2 flex border-b border-gray-100'>
                                                        <div className=''>
                                                            <p className='text-blue'>{strings.disable} </p>
                                                        </div>
                                                    </div>
                                                </Dropdown.Link>
                                                <Dropdown.Link href={route('deleteUser', User.id)} method="get" as="button">
                                                    <div className='py-2 flex border-b border-gray-100'>
                                                        <div className=''>
                                                            <p className='text-red-600'>{strings.deletes} </p>
                                                        </div>
                                                    </div>
                                                </Dropdown.Link>
                                            </Dropdown.Content>
                                        </Dropdown>             
                                    </td>

                                    {/* <td className="text-sm text-l-gray font-normal w-56 border-b-2">
                                        <Link href={route('Update-user', User.id)} className="inline-flex items-center px-4 py-2 bg-gray-900 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-1px active:bg-gray-900 transition ease-in-out duration-150">
                                            Update User
                                        </Link>
                                    </td> */}

                                    {/* <td className="text-sm text-l-gray font-normal w-56">
                                        <Link href={route('viewUser', User.id)} className="inline-flex items-center px-4 py-2 bg-gray-900 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-1px active:bg-gray-900 transition ease-in-out duration-150">
                                            View User
                                        </Link>
                                    </td>
                                    
                                    <td className="text-sm text-l-gray font-normal w-56">
                                        <Link href={route('Delete-User', User.id)} className="inline-flex items-center px-4 py-2 bg-gray-900 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-1px active:bg-gray-900 transition ease-in-out duration-150">
                                            Delete User
                                        </Link>
                                    </td> */}
                                </tr>
                            ):
                            <tr><td colSpan="7">No Users Found</td></tr>
                            }
                        </tbody>

                    </table>
                    {/* {props.auth.user? (
                    props.auth.user.role==="admin"? (
                    <Link href={route('Add-User')} className="inline-flex items-center mt-4 px-4 py-2 bg-gray-900 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-1px active:bg-gray-900 transition ease-in-out duration-150">
                        Add a new User
                    </Link>
                    ): ""
                    ):""} */}
                </div>
                </Container>
            
            </Authenticated>
    );
}
