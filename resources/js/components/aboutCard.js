import React from 'react';

export default function aboutCard({ image ,className = '',title,desciption }) {
    return (
        <div className={ `rounded text-center flex flex-col gap-6 ${className}`} 
        style={{boxShadow:"-1px -1px 6px #DEDEDE, 1px 1px 6px #DEDEDE",padding:" 50px"}} 
        >
               <img className='mx-auto' src={image} alt={image} /> 
            <h6 className='font-semibold text-d-blue text-xl'>{title}</h6>
            <p className='font-normal text-d-gray text-base'>{desciption}</p>
        </div>
    );
}
