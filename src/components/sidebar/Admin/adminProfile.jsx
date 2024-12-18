import React from 'react';
import './admin.css';
import UserProfileCard from '../../Cards/UserProfileCard';

const AdminProfile = () => {

    return (
        <div className='adminContent'>
                <div className='DashboardTitle'> Admin Profile </div>

            <UserProfileCard />
        </div> 
    );
}

export default AdminProfile;
