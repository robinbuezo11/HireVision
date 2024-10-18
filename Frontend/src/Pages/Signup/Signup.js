import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

const Signup = () => {
    const navigate = useNavigate();
    const [imagePreview, setImagePreview] = useState('/Profile.svg');
    const [first_name, setFirst_name] = useState('');
    const [last_name, setLast_name] = useState('');
    const [email, setEmail] = useState('');
    const [birth_date, setBirth_date] = useState('');
    const [password, setPassword] = useState('');
    const [picture, setPicture] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

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

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch(process.env.REACT_APP_API_URL + '/users/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                first_namme: first_name,
                last_name: last_name,
                email: email,
                birth_date: birth_date,
                password: password,
                picture: picture
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                console.error(data.error);
            }
        })
        .catch(error => console.error('Error:', error))
    }

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
                    <input type='text' id='name' name='name' required placeholder=" " value={first_name} onChange={(e) => setFirst_name(e.target.value)} />
                    <label htmlFor='name'>Nombre</label>
                </div>
                <div className="form-group">
                    <input type='text' id='last-name' name='last-name' required placeholder=" " value={last_name} onChange={(e) => setLast_name(e.target.value)} />
                    <label htmlFor='last-name'>Apellido</label>
                </div>
                <div className="form-group">
                    <input type='email' id='email' name='email' required placeholder=" " value={email} onChange={(e) => setEmail(e.target.value)} />
                    <label htmlFor='email'>Correo Electrónico</label>
                </div>
                <div className="form-group">
                    <input type='date' id='birthdate' name='birthdate' required placeholder=" " value={birth_date} onChange={(e) => setBirth_date(e.target.value)}/>
                    <label htmlFor='birthdate'>Fecha de Nacimiento</label>
                </div>
                <div className="form-group">
                    <input type='password' id='password' name='password' required placeholder=" " value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <label htmlFor='password'>Contraseña</label>
                </div>
                <div className="form-group">
                    <input type='password' id='confirm-password' name='confirm-password' required placeholder=" " />
                    <label htmlFor='confirm-password'>Confirmar Contraseña</label>
                </div>
                <button type='submit' className='full-width' onClick={handleSubmit}>Crear Cuenta</button>
            </form>
            <p className='login-signup'>¿Ya tienes una cuenta? <span className='navigate' onClick={() => navigate('/')}>Inicia Sesión aquí</span></p>
        </div>
    );
};

export default Signup;
