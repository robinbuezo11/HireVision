import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
    const navigate = useNavigate();

    const handleSignupRedirect = () => {
        navigate('/signup');
    };

    const handleAdminRedirect = () => {
        navigate('/admin');
    }

    return (
        <div className='container'>
            <h1>Inicia Sesión</h1>
            <form>
                <div className="form-group1">
                    <input type='email' id='email' name='email' required placeholder=" " />
                    <label htmlFor='email'>Correo Electrónico</label>
                </div>
                <div className="form-group1">
                    <input type='password' id='password' name='password' required placeholder=" " />
                    <label htmlFor='password'>Contraseña</label>
                </div>
                <button type='submit' onClick={handleAdminRedirect}>Iniciar Sesión</button>
            </form>
            <p>¿No tienes una cuenta? <span onClick={handleSignupRedirect}>Regístrate aquí</span></p>
        </div>
    );
};

export default Login;
