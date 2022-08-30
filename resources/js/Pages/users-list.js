import React from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Link, Head } from '@inertiajs/inertia-react';
// import PropertiesCollection from "../components/Properties";
export default function Users(props) {
    // console.log(props.Users);
    // // console.log(props.auth.user);
    const Users = props.Users;
    return (
        <Authenticated
        auth={props.auth}
        errors={props.errors}
        header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Users</h2>}
    >
            <Head title="Users List" />
                <div className="max-w-6xl mx-auto mt-6 mb-6 sm:px-6 lg:px-8">
                    <table className="w-full table-auto border-collapse border border-gray-400">
                        <thead className="text-left">
                            <tr>
                                <th className="border border-gray-300">First Name</th>
                                <th className="border border-gray-300">Last Name</th>
                                <th className="border border-gray-300">Birth Date</th>
                                <th className="border border-gray-300">Gender</th>
                                <th className="border border-gray-300">Phone</th>
                                <th className="border border-gray-300">Email</th>
                                <th className="border border-gray-300">Role</th>
                                {/* <th className="border border-gray-300"></th>
                                <th className="border border-gray-300"></th>
                                <th className="border border-gray-300"></th> */}
                                
                            </tr>
                        </thead>
                        <tbody>
                            {(Users)?
                            Users.map((User, index) =>
                                // Only do this if items have no stable IDs
                                <tr key={index}>
                                    <td className="border border-gray-300">{User.first_name}</td>
                                    <td className="border border-gray-300">{User.last_name}</td>
                                    <td className="border border-gray-300">{User.birth_date}</td>
                                    <td className="border border-gray-300">{User.gender}</td>
                                    <td className="border border-gray-300">{User.phone}</td>
                                    <td className="border border-gray-300">{User.email}</td>
                                    <td className="border border-gray-300">{User.role}</td>
                                    <td className="border border-gray-300">
                                        <Link href={route('Update-user', User.id)} className="inline-flex items-center px-4 py-2 bg-gray-900 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-1px active:bg-gray-900 transition ease-in-out duration-150">
                                            Update User
                                        </Link>
                                    </td>
                                    {/* <td className="border border-gray-300">
                                        <Link href={route('viewUser', User.id)} className="inline-flex items-center px-4 py-2 bg-gray-900 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-1px active:bg-gray-900 transition ease-in-out duration-150">
                                            View User
                                        </Link>
                                    </td>
                                    
                                    <td className="border border-gray-300">
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
            
            </Authenticated>
    );
}
