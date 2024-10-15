import React, { useState } from 'react';
import { FaSearch, FaUser } from 'react-icons/fa';
import { IoMenu, IoClose } from 'react-icons/io5';
import { IoIosLogOut } from "react-icons/io";
import './TopBar.css';
import logo from './UD.png';

const TopBar = ({ toggleMenu, menuOpen }) => {
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false); // Estado para controlar la ventana emergente

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    const handleViewProfile = () => {
        setIsProfileOpen(true); // Mostrar la ventana emergente
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        console.log('logout');
    };

    const closeProfileModal = () => {
        setIsProfileOpen(false); // Cerrar la ventana emergente
    };

    return (
        <div className='topBar'>
            <div className='topBar-header'>
                <div className='logo'>
                    <img src={logo} alt="Logo" className='logo-img' />
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
                            <p className='option' onClick={handleViewProfile}> <FaUser /> Mi perfil</p>
                            <p className='option logout' onClick={handleLogout}> <IoIosLogOut /> Salir</p>
                        </div>
                    )
                }
            </div>

            {/* Ventana emergente para ver el perfil */}
            {isProfileOpen && (
                <div className='edit-profile-modal'>
                    <div className='edit-profile-content'>
                        <h2>Mi Perfil</h2>
                        {/* Botón "X" para cerrar */}
                        <button className='close-btn' onClick={closeProfileModal}>X</button>
                        <div className='profile-picture'>
                            <img src='/Profile.svg' alt='Imagen de perfil' />
                        </div>
                        <div>
                            <p>Administrador</p> {/* Usuario quemado */}
                        </div>
                        <div>
                            <p>admin@hirevision.com</p> {/* Correo quemado */}
                        </div>
                        <div>
                            <p>01/01/1990</p> {/* fecha quemada */}
                        </div>
                        <button className='save-btn'>Editar</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TopBar;
