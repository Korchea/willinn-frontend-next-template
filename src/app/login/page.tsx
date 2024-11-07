"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
    // Estados para gestionar los valores de email y contraseña, errores y visibilidad de la contraseña
    const [email, setEmail] = useState(''); // Almacena el email ingresado
    const [password, setPassword] = useState(''); // Almacena la contraseña ingresada
    const [error, setError] = useState<string | null>(null); // Muestra un mensaje de error
    const [showPassword, setShowPassword] = useState(false); // Controla la visibilidad de la contraseña
    const router = useRouter();

    // Maneja el evento de login al enviar el formulario
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch('https://localhost:44369/api/Users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                // Redirige al dashboard si la autenticación es exitosa
                router.push('/dashboard');
            } else if (response.status === 401) {
                // Establece un mensaje de error si las credenciales son incorrectas
                setError('Credenciales incorrectas. Intenta nuevamente.');
            } else {
                // Establece un error genérico para otros códigos de respuesta
                throw new Error('Ocurrió un error inesperado.');
            }
        } catch (err) {
            // Error de conexión o de solicitud
            setError('Error en la conexión. Intenta nuevamente.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 flex-col">
            <img src="/WillinnLogo.svg" alt="Logo" className="mx-auto mb-4" />

            {/* Formulario de inicio de sesión */}
            <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md w-96 flex flex-col space-y-4">
                <h2 className="text-2xl font-semibold mb-4 text-center text-black">Inicia sesión</h2>

                {/* Mensaje de error si existe */}
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                {/* Campo para el email */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">E-mail</label>
                    <input
                        type="text"
                        placeholder="Introduce tu email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2 border rounded text-black"
                        required
                    />
                </div>

                {/* Campo para la contraseña */}
                <div className="mb-4 relative">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Introduce tu contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 border rounded text-black pr-10"
                        required
                    />
                    {/* Botón para mostrar u ocultar la contraseña */}
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-2 top-2/3 transform -translate-y-1/2 text-gray-600"
                    >
                        {showPassword ? (
                            <img src="/eye.svg" alt="ocultar" />
                        ) : (
                            <img src="/eye-slash.svg" alt="mostrar" />
                        )}
                    </button>
                </div>


                {/* Botón de inicio de sesión */}
                <button
                    type="submit"
                    className="w-full py-2 rounded text-white"
                    style={{ backgroundColor: 'rgba(247, 39, 147, 1)' }}
                >
                    Login
                </button>

                {/* Enlace de "Olvidaste la contraseña?" */}
                <p className="mt-4 text-right text-sm text-gray-600 hover:underline cursor-pointer">
                    Olvidaste la contraseña?
                </p>
            </form>
        </div>
    );
};

export default LoginPage;
