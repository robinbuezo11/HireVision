import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSignupRedirect = () => {
        navigate('/signup');
    };

    const handleAdminRedirect = (e) => {
        e.preventDefault(); // Prevenir el comportamiento por defecto del formulario
        if (email === 'admin@hirevision.com' && password === 'admin') {
            navigate('/admin');
        } else {
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
            <p>¿No tienes una cuenta? <span onClick={handleSignupRedirect}>Regístrate aquí</span></p>
        </div>
    );
};

export default Login;
