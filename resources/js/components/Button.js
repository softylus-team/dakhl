import React from 'react';

export default function Button({ type = 'submit', className = '', processing,name='submit', children,onClick }) {
    return (
        <button
        name={name}
            type={type}
            className={
                `inline-flex items-center px-4 py-2 bg-d-blue border border-transparent rounded font-bold text-sm text-white uppercase tracking-1px transition ease-in-out duration-150 ${
                    processing && 'opacity-25'
                } ` + className
            }
            disabled={processing}
            onClick={onClick?onClick:null}
        >
            {children}
        </button>
    );
}
