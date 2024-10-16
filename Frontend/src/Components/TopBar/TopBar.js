import React, { useState, useRef } from 'react';
import { FaSearch, FaUser } from 'react-icons/fa';
import { IoMenu, IoClose } from 'react-icons/io5';
import { IoIosLogOut } from "react-icons/io";
import './TopBar.css';
import logo from './UD.png';

const TopBar = ({ toggleMenu, menuOpen }) => {
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isEditProfile, setIsEditProfile] = useState(false);
    const [profilePicture, setProfilePicture] = useState('/Profile.svg');
    
    const fileInputRef = useRef(null);

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    const handleViewProfile = () => {
        setIsProfileOpen(true);
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        console.log('logout');
    };

    const closeProfileModal = () => {
        setIsProfileOpen(false);
        setIsEditProfile(false);
    };

    const handleEditClick = () => {
        setIsEditProfile(true);
    };

    const handleProfilePictureChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setProfilePicture(reader.result);  // Actualiza la imagen
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handlePictureClick = () => {
        fileInputRef.current.click(); // Al hacer clic en la imagen, abre el input file
    };

    const handleSaveChanges = () => {
        console.log('Cambios guardados');
        closeProfileModal();
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
                    <img src={profilePicture} alt='User Profile' className='profile-picture-circle'/>
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

            {isProfileOpen && (
                <div className='edit-profile-modal'>
                    <div className='edit-profile-content'>
                        <h2>{isEditProfile ? 'Editar Perfil' : 'Mi Perfil'}</h2>
                        <button className='close-btn' onClick={closeProfileModal}>X</button>

                        {!isEditProfile ? (
                            <>
                                {/* Sección de visualización del perfil */}
                                <div className='profile-picture'>
                                    <img
                                        src={profilePicture}
                                        alt='Imagen de perfil'
                                        onClick={handlePictureClick}
                                        className='profile-picture-circle'
                                    />
                                    <input
                                        type='file'
                                        ref={fileInputRef}
                                        style={{ display: 'none' }}
                                        onChange={handleProfilePictureChange}
                                    />
                                </div>
                                <div>
                                    <p>Administrador</p>
                                </div>
                                <div>
                                    <p>admin@hirevision.com</p>
                                </div>
                                <div>
                                    <p>01/01/1990</p>
                                </div>
                                <button className='save-btn' onClick={handleEditClick}>Editar</button>
                            </>
                        ) : (
                            <>
                                {/* Sección de edición del perfil */}
                                <div className='profile-picture'>
                                    <img
                                        src={profilePicture} // Mostrar la imagen actualizada
                                        alt='Imagen de perfil'
                                        onClick={handlePictureClick}
                                        className='profile-picture-circle'
                                    />
                                    <input
                                        type='file'
                                        ref={fileInputRef}
                                        style={{ display: 'none' }}
                                        onChange={handleProfilePictureChange}
                                    />
                                </div>
                                <form className='columns'>
                                    <div className="form-group">
                                        <input type='text' id='name' name='name' required placeholder=" " />
                                        <label htmlFor='name'>Nombre</label>
                                    </div>
                                    <div className="form-group">
                                        <input type='text' id='last-name' name='last-name' required placeholder=" " />
                                        <label htmlFor='last-name'>Apellido</label>
                                    </div>
                                    <div className="form-group">
                                        <input type='email' id='email' name='email' required placeholder=" " />
                                        <label htmlFor='email'>Correo Electrónico</label>
                                    </div>
                                    <div className="form-group">
                                        <input type='date' id='birthdate' name='birthdate' required placeholder=" " />
                                        <label htmlFor='birthdate'>Fecha de Nacimiento</label>
                                    </div>
                                    <div className="form-group">
                                        <input type='password' id='password' name='password' required placeholder=" " />
                                        <label htmlFor='password'>Nueva Contraseña</label>
                                    </div>
                                    <div className="form-group">
                                        <input type='password' id='confirm-password' name='confirm-password' required placeholder=" " />
                                        <label htmlFor='confirm-password'>Confirmar Contraseña</label>
                                    </div>
                                    <button type='button' className='full-width' onClick={handleSaveChanges}>Guardar Cambios</button>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default TopBar;
