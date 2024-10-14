import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Admin.css';
import TopBar from '../../Components/TopBar/TopBar';
import Menu from '../../Components/Menu/Menu';

const Admin = () => {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        
        // Verifica si el usuario está logueado y es admin
        if (!user || user.role !== 'admin') {
            navigate('/');
        }
    }, [navigate]);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <div className='container-panel'>
            <TopBar toggleMenu={toggleMenu} menuOpen={menuOpen} />
            <div className='main'>
                <Menu isOpen={menuOpen} />
            </div>
        </div>
    );
};

export default Admin;
