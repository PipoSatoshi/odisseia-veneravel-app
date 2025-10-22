import React, { useState } from 'react';
import TripCard from '../../components/employee/TripCard';
import TripDetailModal from '../../components/employee/TripDetailModal';

const mockTrips = [
  { id: 1, time: '09:00', clientName: 'João Silva', destination: 'Aeroporto de Lisboa', status: 'PENDING', paymentStatus: 'UNPAID', amount: 50.00, passengers: 2, bags: 2, children: 0, pickupLocation: 'Av. da Liberdade, 123', clientContact: '912345678' },
  { id: 2, time: '11:30', clientName: 'Ana Pereira', destination: 'Hotel Central', status: 'COMPLETED', paymentStatus: 'PAID', amount: 35.00, passengers: 1, bags: 1, children: 0, pickupLocation: 'Rua Augusta, 45', clientContact: '923456789' },
  { id: 3, time: '14:00', clientName: 'Carlos Mendes', destination: 'Parque das Nações', status: 'CANCELED', paymentStatus: 'UNPAID', amount: 0, passengers: 1, bags: 0, children: 0, pickupLocation: 'Praça do Comércio, 1', clientContact: '934567890' },
];

const EmployeeSchedule = () => {
    const [trips, setTrips] = useState(mockTrips);
    const [selectedTrip, setSelectedTrip] = useState(null);

    const handleCardClick = (trip) => {
        setSelectedTrip(trip);
    };

    const handleCloseModal = () => {
        setSelectedTrip(null);
    };

    const handleUpdateTrip = (updatedTrip) => {
        console.log("A atualizar viagem:", updatedTrip);
        setTrips(trips.map(t => t.id === updatedTrip.id ? updatedTrip : t));
        handleCloseModal();
    }

    return (
        <div className="p-4 md:p-0">
            <h2 className="text-3xl font-bold mb-6 text-eerie-black dark:text-white">Agenda de Hoje</h2>
            <div className="space-y-4">
                {trips.length > 0 ? (
                    trips.map(trip => (
                        <TripCard key={trip.id} trip={trip} onClick={() => handleCardClick(trip)} />
                    ))
                ) : (
                    <p className="text-neutral-gray">Nenhuma viagem agendada para hoje.</p>
                )}
            </div>

            <TripDetailModal
                isOpen={!!selectedTrip}
                onClose={handleCloseModal}
                trip={selectedTrip}
                onUpdate={handleUpdateTrip}
            />
        </div>
    );
};

export default EmployeeSchedule;