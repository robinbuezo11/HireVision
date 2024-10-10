import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

const Signup = () => {
    const navigate = useNavigate();
    const [imagePreview, setImagePreview] = useState('/Profile.svg');

    // imagen previsualizada
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const triggerFileInput = () => {
        document.getElementById('profile-pic').click();
    };

    const handleLoginRedirect = () => {
        navigate('/');
    };

    return (
        <div className='container'>
            <h1>¡Regístrate en HireVision!</h1>
            <div className="file-upload" onClick={triggerFileInput}>
                <div className="image-preview-container">
                    <img src={imagePreview || 'https://via.placeholder.com/150'} alt="Foto de perfil" className="image-preview" />
                </div>
                <input 
                    type='file' 
                    id='profile-pic' 
                    name='profile-pic' 
                    accept="image/*" 
                    style={{ display: 'none' }}
                    onChange={handleImageChange}
                />
            </div>
            <form className='columns'>
                <div className="form-group">
                    <input type='text' id='name' name='name' required placeholder=" " />
                    <label htmlFor='name'>Nombre</label>
                </div>
                <div className="form-group">
                    <input type='text' id='last-name' name='last-name' required placeholder=" " />
                    <label htmlFor='last-name'>Apellido</label>
                </div>
                <div className="form-group">
                    <input type='email' id='email' name='email' required placeholder=" " />
                    <label htmlFor='email'>Correo Electrónico</label>
                </div>
                <div className="form-group">
                    <input type='date' id='birthdate' name='birthdate' required placeholder=" " />
                    <label htmlFor='birthdate'>Fecha de Nacimiento</label>
                </div>
                <div className="form-group">
                    <input type='password' id='password' name='password' required placeholder=" " />
                    <label htmlFor='password'>Contraseña</label>
                </div>
                <div className="form-group">
                    <input type='password' id='confirm-password' name='confirm-password' required placeholder=" " />
                    <label htmlFor='confirm-password'>Confirmar Contraseña</label>
                </div>
                <button type='submit' className='full-width'>Crear Cuenta</button>
            </form>
            <p>¿Ya tienes una cuenta? <span onClick={handleLoginRedirect}>Inicia Sesión aquí</span></p>
        </div>
    );
};

export default Signup;
