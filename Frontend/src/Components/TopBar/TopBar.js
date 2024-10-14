import React, { useState } from 'react';
import { FaSearch, FaUser } from 'react-icons/fa';
import { IoMenu, IoClose } from 'react-icons/io5';
import { IoIosLogOut } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import './TopBar.css';

const TopBar = ({ toggleMenu, menuOpen }) => {
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const navigate = useNavigate();

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/');
    };

    return (
        <div className='topBar'>
            <div className='topBar-header'>
                <div className='logo'>
                    <h1>Hire<span>Vision</span></h1>
                </div>
                <div className='menu-icon' onClick={toggleMenu}>
                    {menuOpen ? <IoClose className='io-menu' /> : <IoMenu className='io-menu' />}
                </div>
            </div>
            <div className='bar'>
                <div className='search-bar'>
                    <FaSearch className='search-icon'/>
                    <input className='search' type='text' id='search' name='search' placeholder='Buscar empleos'/>
                </div>
            </div>
            <div className={`user-profile ${dropdownVisible ? 'active' : ''}`} onClick={toggleDropdown}>
                <div className='user-icon'>
                    <img src='/Profile.svg' alt='User Profile'/>
                </div>
                <span className='user-name'>Administrador</span>

                {
                    dropdownVisible && (
                        <div className='panel-profile'>
                            <p className='option'> <FaUser /> Editar mi perfil</p>
                            <p className='option logout' onClick={handleLogout}> <IoIosLogOut /> Salir</p>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default TopBar;
