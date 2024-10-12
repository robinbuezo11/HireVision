import React, { useState } from 'react';
import './Admin.css';
import TopBar from '../../Components/TopBar/TopBar';
import Menu from '../../Components/Menu/Menu';

const Admin = () => {
    const [menuOpen, setMenuOpen] = useState(false);

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
