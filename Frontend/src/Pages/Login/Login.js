import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleAdminRedirect = (e) => {
        e.preventDefault();

        // Verifica si es el admin
        if (email === 'admin@hirevision.com' && password === 'admin') {
            // Almacena la información del usuario en localStorage
            localStorage.setItem('user', JSON.stringify({ email, role: 'admin' }));
            navigate('/admin');
        } else {
            // Almacena la información del usuario común
            localStorage.setItem('user', JSON.stringify({ email, role: 'user' }));
            navigate('/user');
        }
    };

    return (
        <div className='container'>
            <h1>Inicia Sesión</h1>
            <form onSubmit={handleAdminRedirect}>
                <div className="form-group1">
                    <input 
                        type='email' 
                        id='email' 
                        name='email' 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                        placeholder=" " 
                    />
                    <label htmlFor='email'>Correo Electrónico</label>
                </div>
                <div className="form-group1">
                    <input 
                        type='password' 
                        id='password' 
                        name='password' 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                        placeholder=" " 
                    />
                    <label htmlFor='password'>Contraseña</label>
                </div>
                <button type='submit'>Iniciar Sesión</button>
            </form>
            <p className='login-signup'>¿No tienes una cuenta? <span className='navigate' onClick={() => navigate('/signup')}>Regístrate aquí</span></p>
        </div>
    );
};

export default Login;
