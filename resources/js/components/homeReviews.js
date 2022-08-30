import React from 'react';

export default function Label({ imgPath, rating, className, message,authorName }) {
    return (
        <div className={`gap-2.5 flex flex-col justify-between rounded ${className?className:''}`} style={{boxShadow: "0px 1px 11px 0px rgba(117, 117, 117, 0.25)",width: "270px",height: "290px",padding: "20px"}}>
            <div className='border rounded-full p-2 border-gray-400'>
                <img className="object-cover rounded-full w-16 h-16"src={imgPath?imgPath:"/profiles/defaultProfile.png"} />
            </div>
            <h3 className='font-bold text-l-gray'>{rating}</h3>
            <p className='text-l-gray text-center'>{message}</p>
            <div className='w-full'>
                <h3 className='font-bold text-l-gray'>{authorName}</h3>
            </div>
            
        </div>
    );
}
