import React from 'react';
import './navbar.css';
import '../sidebar/Admin/admin.css';
import { Link } from 'react-router-dom';
 
const AdminNavbar = () => {
    return (
        <div className='adminNavbar'>
        <Link to='/adminDashboard' className='dashboardLink'>
        / Dashboard /
        </Link>
        </div>
    );
}

export default AdminNavbar;
