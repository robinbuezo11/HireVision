import React, { useState } from 'react';
import './EditProfilePanel.css'; // Estilos del panel

const EditProfilePanel = ({ isOpen, onClose, user }) => {
    const [name, setName] = useState(user.name || '');
    const [email, setEmail] = useState(user.email || '');

    const handleSave = () => {
        console.log('Perfil actualizado:', { name, email });
        onClose(); // Cierra el panel al guardar
    };

    return (
        <div className={`edit-profile-panel ${isOpen ? 'open' : ''}`}>
            <div className="panel-header">
                <h2>Editar Perfil</h2>
                <button onClick={onClose}>X</button>
            </div>
            <div className="panel-body">
                <div>
                    <label>Nombre:</label>
                    <input 
                        type="text" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                    />
                </div>
                <button onClick={handleSave}>Guardar</button>
            </div>
        </div>
    );
};

export default EditProfilePanel;
