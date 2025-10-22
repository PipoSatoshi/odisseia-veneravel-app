import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';
import Input from '../components/common/Input';

const LoginPage = () => {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
    const { login } = useAuth();
    const navigate = useNavigate();
    const [loginError, setLoginError] = useState(null);

    const onSubmit = async (data) => {
        setLoginError(null);
        try {
            await login(data.email, data.password);
            // O AuthContext vai tratar do re-direccionamento automaticamente
            // quando o estado do utilizador mudar.
        } catch (error) {
            setLoginError(error.message || "Email ou senha inválidos.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-eerie-black p-4">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md p-8 space-y-8 bg-white dark:bg-gray-800 rounded-2xl shadow-soft"
            >
                <div className="text-center">
                    <h1 className="text-5xl md:text-6xl text-eerie-black dark:text-white">Odisseia Venerável</h1>
                    <p className="mt-2 text-neutral-gray">Uma jornada que conecta destinos.</p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <Input
                        label="Email"
                        type="email"
                        id="email"
                        {...register("email", { required: "O email é obrigatório" })}
                        error={errors.email}
                    />
                    <Input
                        label="Senha"
                        type="password"
                        id="password"
                        {...register("password", { required: "A senha é obrigatória" })}
                        error={errors.password}
                    />
                    
                    {loginError && <p className="text-center text-red-500 text-sm">{loginError}</p>}

                    <div>
                        <Button type="submit" fullWidth disabled={isSubmitting}>
                            {isSubmitting ? 'A entrar...' : 'Entrar'}
                        </Button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

export default LoginPage;