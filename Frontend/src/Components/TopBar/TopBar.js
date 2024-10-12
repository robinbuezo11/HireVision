import React from 'react';
import { FaSearch } from 'react-icons/fa';
import './TopBar.css';

const TopBar = () => {
    return (
        <div className='topBar'>
            <div className='logo'>
                <h1>Hire<span>Vision</span></h1>
            </div>
            <div className='bar'>
                <div className='search-bar'>
                    <FaSearch className='search-icon'/>
                    <input className='search' type='text' id='search' name='search' placeholder='Buscar empleos'/>
                </div>
            </div>
            <div className='user-icon'>
                <img src='/Profile.svg' alt='User Icon'/>
            </div>
        </div>
    );
};

export default TopBar;
