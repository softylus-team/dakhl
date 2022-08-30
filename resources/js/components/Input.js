import React, { useEffect, useRef } from 'react';

export default function Input({
    type = 'text',
    name,
    value,
    className,
    autoComplete,
    required,
    isFocused,
    handleChange,
    placeholder
}) {
    const input = useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        // <div className="flex flex-col items-start">
            <input
                type={type}
                name={name}
                value={value}
                className={
                    `w-full rounded border border-gray-300 text-d-gray shadow-sm focus:border-d-gray` +
                    className
                }
                ref={input}
                autoComplete={autoComplete}
                required={required}
                placeholder={placeholder}
                onChange={(e) => handleChange(e)}
            />
        // </div>
    );
}
