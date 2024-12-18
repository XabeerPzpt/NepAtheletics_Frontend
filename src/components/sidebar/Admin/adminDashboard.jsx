import React,{useEffect, useState} from 'react';
import './admin.css';
import UserChart from './adminComponents/Charts/userChart';
import { useAuth } from '../../authContext';
import axios from 'axios';
import OrderChart from './adminComponents/Charts/OrderChart';
const AdminDashboard = () => {

    const {authorizationHeader,usingAxios} = useAuth();
    const [totalUsersObject,setTotalUsersObject]=useState([]);
    const [totalOrdersObject,setTotalOrdersObject]=useState([]);
    const currentYear = new Date().getFullYear().toString();
    useEffect(() => {
        const fetchTotalUsers = async() =>{ 
        try {
           var response = await axios.get(`https://localhost:7106/api/Users/getUsersPerMonth/${currentYear}`,
            {
                headers:authorizationHeader
            }
           ); 
           setTotalUsersObject(response.data);
        } catch (error) {
            console.log(error.message)
            }
        }
        fetchTotalUsers();
        fetchTotalOrders();
    }, []);

    const fetchTotalOrders = async() =>{
    var response = await usingAxios(`https://localhost:7106/api/UserOrders/getOrdersPerMonth/${currentYear}`,'get');
    setTotalOrdersObject(response);
    }

    const userdata = totalUsersObject
    .filter((row)=>row.year===currentYear)
    .map((row)=>({
        month: row.month,
        users: row.total_Users
    }
    ))

    return (
    
        <div className='adminContent'>
        <div className='DashboardTitle'> Admin Dashboard </div>

            <div className='chartField'>
                <ul className='charts'>
                    <li className='chartItem' > <UserChart userdata={userdata} />   </li>
                    <li className='chartItem' > <OrderChart orderData={totalOrdersObject} currentYear={currentYear}/>  </li>
                </ul>
                
            </div>
        </div>
    );
}

export default AdminDashboard;
