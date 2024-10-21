import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Confirm.css';

const Confirm = () => {
    const [values, setValues] = useState(['', '', '', '', '', '']);
    const inputs = useRef([]);
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email || 'tu_correo@example.com';

    // Función para manejar el cambio de los inputs
    const handleChange = (e, index) => {
        const value = e.target.value;
        if (/^\d$/.test(value)) {
            const newValues = [...values];
            newValues[index] = value;
            setValues(newValues);

            if (index < 5 && value) {
                inputs.current[index + 1].focus();
            }

            // Verificar si todos los campos están completos
            if (newValues.every(val => val !== '')) {
                confirmCode(newValues.join(''));
            }
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace') {
            const newValues = [...values];
            if (values[index]) {
                newValues[index] = '';
                setValues(newValues);
            } else if (index > 0) {
                inputs.current[index - 1].focus();
                newValues[index - 1] = '';
                setValues(newValues);
            }
        }
    };

    // Función para enviar el código de confirmación a la API
    const confirmCode = (code) => {
        fetch(`${process.env.REACT_APP_API_URL}/confirm`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                code: code,
            }),
        })
        .then((res) => res.json())
        .then((data) => {
            if (data.err) {

                alert(`Email: ${email}\n Code: ${code}\n Error: ${data.err}`); // Puedes usar Swal o cualquier otro modal
            } else {
                alert('¡Código confirmado con éxito!');
                navigate('/'); // Redirige a otra página si es necesario
            }
        })
        .catch((err) => {
            alert(`Error: ${err.message}`); // Puedes usar Swal o cualquier otro modal
        });
    };

    return (
        <div className='container'>
            <h1 className='title-confirm'>Confirmar Cuenta</h1>
            <p>Ingrese el código de verificación enviado al correo <span className='span-email'>{email}</span></p>
            <div className='form-confirm'>
                {values.map((value, index) => (
                    <input
                        key={index}
                        type='text'
                        className='code-confirm'
                        value={value}
                        onChange={(e) => handleChange(e, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        ref={el => inputs.current[index] = el}
                        maxLength={1}
                    />
                ))}
            </div>
            <p className='login-signup'>¿No tienes una cuenta? <span className='navigate' onClick={() => navigate('/signup')}>Regístrate aquí</span> o ¿Ya tienes una cuenta? <span className='navigate' onClick={() => navigate('/')}>Inicia Sesión aquí</span></p>
        </div>
    );
};

export default Confirm;
