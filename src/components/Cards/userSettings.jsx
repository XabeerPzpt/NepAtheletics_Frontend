import React, { useState } from 'react';
import './card.css';
import '../sidebar/Admin/adminComponents/popup.css';
import { FaUser, FaLock, FaSignOutAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useAuth } from '../authContext';

const UserSettings = ({close,popupLogoutConfirmation}) => {
    const {isLoggedIn}=useAuth();
   
    return (
        <>
        {isLoggedIn && (
            <div className="settings-card"> 
            <ul className="settings-list">
            <Link to='/adminProfile'  >
                <li className="settings-item" onClick={close} >
                <FaUser className="settings-icon" />
                <span className="settings-text">Profile</span>
                </li>
            </Link>
            <Link to='/changePassword'>
                <li className="settings-item" onClick={close}>
                <FaLock className="settings-icon" /> 
                <span className="settings-text">Change Password</span>
                </li>
            </Link>
                <li className="settings-item" onClick={popupLogoutConfirmation} >
                <FaSignOutAlt className="settings-icon" />
                <span className="settings-text">Logout</span>
                </li>
            </ul>
            
            
            </div>

        )}
       
       
       

        
        </>
    );
} 

export default UserSettings;
