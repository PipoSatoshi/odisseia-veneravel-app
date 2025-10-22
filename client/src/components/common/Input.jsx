import React, { forwardRef } from 'react';

const Input = forwardRef(({ label, type = 'text', id, error, ...props }, ref) => {
    return (
        <div>
            <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {label}
            </label>
            <div className="mt-1">
                <input
                    id={id}
                    type={type}
                    ref={ref}
                    {...props}
                    className={`block w-full px-3 py-2 border ${error ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-2xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-eerie-black focus:border-eerie-black dark:bg-gray-700 dark:text-white sm:text-sm`}
                />
        {error && <p className="mt-2 text-sm text-red-600">{error.message}</p>}
            </div>
        </div>
    );
});

export default Input;