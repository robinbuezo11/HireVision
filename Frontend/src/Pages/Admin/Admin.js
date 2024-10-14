// ADMIN.JS
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Admin.css';
import TopBar from '../../Components/TopBar/TopBar';
import Menu from '../../Components/Menu/Menu';

const Admin = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        
        // Verifica si el usuario está logueado y es admin
        if (!user || user.role !== 'admin') {
            navigate('/');
        }
    }, [navigate]);

    return (
        <div className='container-panel'>
            <TopBar />
            <div className='main'>
                <Menu />
            </div>
        </div>
    );
};

export default Admin;
