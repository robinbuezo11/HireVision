import React from 'react';
import './Admin.css';
import TopBar from '../../Components/TopBar/TopBar';
import Menu from '../../Components/Menu/Menu';

const Admin = () => {
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
