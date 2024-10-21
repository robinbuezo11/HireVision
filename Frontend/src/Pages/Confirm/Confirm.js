import React, { useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Confirm.css';

const Confirm = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const email = location.state?.email;
    const [values, setValues] = useState(['', '', '', '', '', '']);
    const inputs = useRef([]);

    const handleChange = (e, index) => {
        const value = e.target.value;
        if (/^\d$/.test(value)) {
            const newValues = [...values];
            newValues[index] = value;
            setValues(newValues);

            if (index < 5 && value) {
                inputs.current[index + 1].focus();
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

    const handleSubmit = (e) => {
        e.preventDefault();
        const code = values.join('');
    
        if (code.length < 6) {
            alert("Por favor, ingresa un código completo.");
            return;
        }

        const payload = {
            email: email,
            code: code,
        };
        console.log(JSON.stringify(payload));
    
        fetch(process.env.REACT_APP_API_URL + '/users/confirm', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        })
        .then((res) => res.json())
        .then((data) => {
            if (data.err) {
                alert(`Error: ${data.err}`);
            } else {
                alert("Cuenta confirmada exitosamente.");
                navigate('/');
            }
        })
        .catch((err) => {
            alert(`Error: ${err.message}`);
        });
    };
    

    return (
        <div className='container'>
            <h1 className='title-confirm'>Confirmar Cuenta</h1>
            <p>Ingrese el código de verificación enviado al correo <span className='span-email'>{email}</span></p>
            <form onSubmit={handleSubmit} className='form-confirm'>
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
                <button type='submit'>Confirmar</button>
            </form>
            <p className='login-signup'>¿No tienes una cuenta? <span className='navigate' onClick={() => navigate('/signup')}>Regístrate aquí</span> o ¿Ya tienes una cuenta? <span className='navigate' onClick={() => navigate('/')}>Inicia Sesión aquí</span></p>
        </div>
    );
};

export default Confirm;
