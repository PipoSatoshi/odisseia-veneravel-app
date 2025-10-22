import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ children, onClick, type = 'button', fullWidth = false, variant = 'primary', disabled = false }) => {
    const baseClasses = `px-6 py-3 font-semibold rounded-2xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-eerie-black`;
    const widthClass = fullWidth ? 'w-full' : '';
    const disabledClasses = 'opacity-50 cursor-not-allowed';

    const variants = {
        primary: 'bg-eerie-black text-white hover:bg-gray-800 dark:bg-gray-100 dark:text-eerie-black dark:hover:bg-gray-300 focus:ring-eerie-black',
        secondary: 'bg-transparent border border-neutral-gray text-eerie-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 focus:ring-neutral-gray'
    };

    return (
        <motion.button
            whileHover={!disabled ? { scale: 1.02 } : {}}
            whileTap={!disabled ? { scale: 0.98 } : {}}
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${baseClasses} ${widthClass} ${variants[variant]} ${disabled ? disabledClasses : ''}`}
        >
            {children}
        </motion.button>
    );
};

export default Button;