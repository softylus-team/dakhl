import React from 'react';

export default function HowWorkCard({ bg,image ,className = '',title,desciption }) {
    return (
        <div className={ `workCard rounded text-center flex items-center justify-center flex-col ${className}`} 
        style={{backgroundImage:`url(${bg})`}} >
               <img className='mx-auto sm:h-6 h-5' src={image} alt={title} /> 
            <h6 className='font-semibold text-d-blue sm:text-xl text-base'>{title}</h6>
            <p className='font-normal text-d-gray sm:text-base text-sm'>{desciption}</p>
        </div>
    );
}