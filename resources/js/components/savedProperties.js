import React, { useState } from 'react';
import { Link } from '@inertiajs/inertia-react';

export default function savedProperties(props) {
    const Properties = props.Properties;

    return (
        <div className="max-w-6xl mx-auto mt-6 mb-6 sm:px-6 lg:px-8">
                <table className="w-full table-fixed border-collapse border border-gray-400">
                    <thead >
                        <tr>
                            <th className="border border-gray-300">Name</th>
                            <th className="border border-gray-300">Type</th>
                            <th className="border border-gray-300">Bedrooms</th>
                            <th className="border border-gray-300">Status</th>
                            <th className="border border-gray-300">Nighborhood</th>
                            <th className="border border-gray-300">Building Name</th>
                            <th className="border border-gray-300">Community Name</th>
                            <th className="border border-gray-300"  colSpan="2">Actions </th>
                            {/* <th></th> */}


                        </tr>
                    </thead>
                    <tbody>
                        {(Properties) ?
                            Properties.map((property, index) =>
                                // Only do this if items have no stable IDs
                                <tr key={index}>
                                    <td className="border border-gray-300">{property.name}</td>
                                    <td className="border border-gray-300">{property.type}</td>
                                    <td className="border border-gray-300">{property.bedrooms}</td>
                                    <td className="border border-gray-300">{property.status}</td>
                                    <td className="border border-gray-300">{property.nighborhood}</td>
                                    <td className="border border-gray-300">{property.bulding_name}</td>
                                    <td className="border border-gray-300">{property.community_name}</td>
                                    <td className="border border-gray-300" colSpan="2">
                                        <Link href={route('viewproperty', property.id)} className="inline-flex items-center px-4 py-2 bg-gray-900 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-1px active:bg-gray-900 transition ease-in-out duration-150">
                                            View property
                                        </Link>
                                        <Link href={route('unsaveproperty', property.id)} className="inline-flex items-center px-4 py-2 bg-gray-900 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-1px active:bg-gray-900 transition ease-in-out duration-150">
                                            un Save
                                        </Link>
                                    </td>

                                </tr>
                            ) :
                            <tr><td colSpan="7">No Properies Found</td></tr>
                        }
                    </tbody>

                </table>
                
            </div>

    );
}
