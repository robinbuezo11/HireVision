import React from 'react';
import { FaBriefcase, FaRegFile } from 'react-icons/fa';
import './Menu.css';

const Menu = ({ isOpen }) => {
    return (
        <div className={`menu ${isOpen ? 'show' : ''}`}>
            <div className='profile'>
                <img src='/Profile.svg' alt='User Icon' />
            </div>
            <ul className='menu-options'>
                <li className='menu-item'>
                    <FaBriefcase className='menu-icon' /> Empleos
                </li>
                <li className='menu-item'>
                    <FaRegFile className='menu-icon' /> Postulados
                </li>
            </ul>
        </div>
    );
};

export default Menu;
