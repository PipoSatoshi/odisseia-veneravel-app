 import React from 'react';
 import { motion, AnimatePresence } from 'framer-motion';
 import Button from '../common/Button';
 import { FiX, FiClock, FiUser, FiMapPin, FiBriefcase, FiPhone, FiDollarSign, FiUsers } from 'react-icons/fi';
 
 const TripDetailModal = ({ isOpen, onClose, trip, onUpdate }) => {
     if (!trip) return null;
 
     return (
         <AnimatePresence>
             {isOpen && (
                 <motion.div
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     exit={{ opacity: 0 }}
                     className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
                     onClick={onClose}
                 >
                     <motion.div
                         initial={{ scale: 0.9, y: 50 }}
                         animate={{ scale: 1, y: 0 }}
                         exit={{ scale: 0.9, y: 50 }}
                         className="bg-white dark:bg-gray-800 rounded-2xl shadow-soft w-full max-w-lg relative"
                         onClick={(e) => e.stopPropagation()}
                     >
                         <div className="p-6">
                             <div className="flex justify-between items-center mb-4">
                                 <h3 className="text-2xl font-bold">{trip.clientName}</h3>
                                 <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                                     <FiX />
                                 </button>
                             </div>
 
                             <div className="space-y-4 text-gray-700 dark:text-gray-300">
                                 <p className="flex items-center"><FiClock className="mr-2 text-neutral-gray" />Horário: <strong>{trip.time}</strong></p>
                                 <p className="flex items-center"><FiMapPin className="mr-2 text-neutral-gray" />Recolha: <strong>{trip.pickupLocation}</strong></p>
                                 <p className="flex items-center"><FiMapPin className="mr-2 text-neutral-gray" />Destino: <strong>{trip.destination}</strong></p>
                                 <hr className="dark:border-gray-600" />
                                 <div className="grid grid-cols-2 gap-4">
                                     <p className="flex items-center"><FiUsers className="mr-2 text-neutral-gray" />Passageiros: <strong>{trip.passengers}</strong></p>
                                     <p className="flex items-center"><FiBriefcase className="mr-2 text-neutral-gray" />Malas: <strong>{trip.bags}</strong></p>
                                 </div>
                                 <p className="flex items-center"><FiPhone className="mr-2 text-neutral-gray" />Contacto: <strong>{trip.clientContact || 'N/A'}</strong></p>
                                 <p className="flex items-center"><FiDollarSign className="mr-2 text-neutral-gray" />Pagamento: <strong>{trip.paymentStatus === 'PAID' ? `Pago (€${trip.amount})` : `Não Pago (€${trip.amount})`}</strong></p>
                             </div>
                         </div>
 
                         <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-b-2xl flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                             <Button variant="primary" onClick={() => console.log('Iniciar')}>Iniciar Viagem</Button>
                             <Button variant="secondary" onClick={() => console.log('Cancelar')}>Cancelar Viagem</Button>
                             {trip.paymentStatus === 'UNPAID' && <Button variant="primary" onClick={() => console.log('Pagamento recebido')}>Pagamento Recebido</Button>}
                         </div>
                     </motion.div>
                 </motion.div>
             )}
         </AnimatePresence>
     );
 };
 
 export default TripDetailModal;