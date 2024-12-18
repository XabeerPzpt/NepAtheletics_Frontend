import React from 'react';
import './sidebar.css';
import { Link, NavLink } from 'react-router-dom'; 
import { motion } from 'framer-motion';
import { FaUser, FaUsers, FaBox, FaFileInvoice } from 'react-icons/fa';
import { MdOutlineAdminPanelSettings } from "react-icons/md";


const AdminSidebar = () => {
     return (
        <div className='adminSidebarContainer'>
            <motion.div initial={{ opacity: 0, x: -100 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
                <Link to='/adminDashboard'>
                <div className='mainLink adminTitle'>
                <div className='iconWrapper'><MdOutlineAdminPanelSettings className='adminIcon' /></div>
                    Admin Dashboard
                </div>
                </Link>
                <NavLink to='/adminProfile' className='mainLink' activeClassName="active" >
                    <div className='iconWrapper'><FaUser /></div>Admin Profile
                </NavLink>
                
                <NavLink to='/users' className='mainLink' activeClassName="active"  >
                    <div className='iconWrapper'><FaUsers /></div>Users
                </NavLink>

                <NavLink to='/products' className='mainLink' activeClassName="active">
                    <div className='iconWrapper'><FaBox /></div>Products
                </NavLink>
                
                <NavLink to='/orders' className='mainLink' activeClassName="active">
                    <div className='iconWrapper'> <FaFileInvoice /> </div>Orders
                    {/* <div className='orderNotification'>1</div> */}

                </NavLink>


                
            </motion.div>
        </div>
    );
}

export default AdminSidebar;
