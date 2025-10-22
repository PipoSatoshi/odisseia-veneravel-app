import React from 'react';
import { motion } from 'framer-motion';

const statusColors = {
    PENDING: 'border-l-blue-500',
    IN_PROGRESS: 'border-l-yellow-500',
    COMPLETED: 'border-l-green-500',
    CANCELED: 'border-l-red-500',
};

const TripCard = ({ trip, onClick }) => {
    const borderColorClass = statusColors[trip.status] || 'border-l-gray-400';

    return (
        <motion.div
            onClick={onClick}
            className={`bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-soft cursor-pointer border-l-4 ${borderColorClass} flex flex-col md:flex-row md:items-center justify-between space-y-3 md:space-y-0`}
            whileHover={{ scale: 1.01, boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)' }}
        >
            <div className="flex items-center space-x-4">
                <div className="text-xl font-bold text-eerie-black dark:text-white">{trip.time}</div>
                <div className="flex-1">
                    <p className="font-semibold text-lg">{trip.clientName}</p>
                    <p className="text-sm text-neutral-gray">{trip.destination}</p>
                </div>
            </div>
            <div className="flex items-center justify-between md:justify-start md:space-x-6 text-sm">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold
                    ${trip.status === 'PENDING' && 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'}
                    ${trip.status === 'IN_PROGRESS' && 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'}
                    ${trip.status === 'COMPLETED' && 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'}
                    ${trip.status === 'CANCELED' && 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'}`}>
                    {trip.status.replace('_', ' ')}
                </span>
                <span className={`font-semibold ${trip.paymentStatus === 'PAID' ? 'text-green-600' : 'text-orange-500'}`}>
                    {trip.paymentStatus === 'PAID' ? 'Pago' : 'Não Pago'}
                </span>
            </div>
        </motion.div>
    );
};

export default TripCard;