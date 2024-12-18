import React from 'react';
import { useAuth } from '../authContext';
import AdminSidebar from './adminSidebar';
import './sidebar.css';
import ProductsDisplayPage from './User/productsDisplayPage';

const Sidebar = () => {
    const {userRole,isLoggedIn} = useAuth();
    if (isLoggedIn && userRole === "admin") {
        return (
            <div className='sidebar'>
                <AdminSidebar />
            </div>
        );
    } else if(isLoggedIn && userRole === "user") {
        return (
                <ProductsDisplayPage />
        );
    } else {
        return (
                <ProductsDisplayPage />
        );
    }
    
}

export default Sidebar;
