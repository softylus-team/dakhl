import React from 'react';

export default function singleReviews({ imgPath, rating, className, message, authorName }) {
    return (
        <div className={`gap-6 flex ${className ? className : ''}`}>
            <div className='w-1/6 h-fit border rounded-full p-1 border-gray-400'>
                <img className="object-cover rounded-full w-full h-full" src={imgPath ? imgPath : "/profiles/defaultProfile.png"} />
            </div>
            <div className='w-5/6'>
                <h3 className='font-bold text-sm text-d-gray'>{rating}</h3>

                <p className='text-l-gray text-xs'>{message}</p>
                <h3 className='font-bold text-d-gray text-sm text-left'>{authorName}</h3>
            </div>
        </div>
    );
}
