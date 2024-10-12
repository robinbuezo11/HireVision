import React from 'react';
import { FaBriefcase, FaRegFile } from 'react-icons/fa';
import './Menu.css';

const Menu = () => {
    return (
        <div className='menu'>
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
