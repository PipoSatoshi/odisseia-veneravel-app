import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';

const DailyLog = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const onSubmit = (data) => {
        console.log("Registo diário:", data);
        // TODO: Chamar API para guardar o registo diário
        navigate('/employee/schedule');
    };

    return (
        <div className="p-4 md:p-8">
            <div className="max-w-xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-soft">
                <h2 className="text-3xl font-bold mb-6 text-eerie-black dark:text-white">Registo Diário</h2>
                <p className="text-neutral-gray mb-8">Insira os dados do veículo para iniciar o seu turno.</p>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <Input
                        label="Matrícula do Veículo"
                        id="licensePlate"
                        {...register('licensePlate', { required: 'A matrícula é obrigatória' })}
                        error={errors.licensePlate}
                        placeholder="AA-00-BB"
                    />
                    <Input
                        label="Quilómetros Iniciais"
                        id="kmStart"
                        type="number"
                        {...register('kmStart', { 
                            required: 'Os quilómetros são obrigatórios',
                            valueAsNumber: true,
                        })}
                        error={errors.kmStart}
                        placeholder="123456"
                    />
                    <div className="pt-4">
                        <Button type="submit" fullWidth>Confirmar e Ir para Agenda</Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default DailyLog;