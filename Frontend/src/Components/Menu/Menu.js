import React from 'react';
import { FaBriefcase, FaRegFile, FaUser } from 'react-icons/fa';
import { IoIosLogOut } from 'react-icons/io';
import './Menu.css';

const Menu = ({ isOpen }) => {
    const isMobile = window.innerWidth <= 768;

    return (
        <div className={`menu ${isOpen ? 'show' : ''}`}>
            <div className='profile'>
                <img src='/Profile.svg' alt='User Icon' />
                <span className='user-name'>Administrador</span>
            </div>
            <ul className='menu-options'>
                <li className='menu-item'>
                    <FaBriefcase className='menu-icon' /> Empleos
                </li>
                <li className='menu-item'>
                    <FaRegFile className='menu-icon' /> Postulados
                </li>
                {isMobile && (
                    <>
                        <li className='menu-item'>
                            <FaUser className='menu-icon' /> Editar mi perfil
                        </li>
                        <li className='menu-item logout'>
                            <IoIosLogOut className='menu-icon logout' /> Salir
                        </li>
                    </>
                )}
            </ul>
        </div>
    );
};

export default Menu;
