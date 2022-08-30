import React from 'react';

export default function StaticsCard({ icon, title, amount, currency ,className,imgClass}) {
    return (
        <div className={`p-4 bg-white rounded flex justify-start gap-2.5 items-center fav-shadow ${className?className:""}`}>
            <img className={` object-contain ${imgClass?imgClass:""}`} src={icon} />
            <div>
                <p className='text-l-gray text-sm font-normal'>{title}</p>
                <p className='text-d-gray text-xl font-semibold'>{amount} {currency ? currency : ""}</p>
            </div>
        </div>
    );
}
