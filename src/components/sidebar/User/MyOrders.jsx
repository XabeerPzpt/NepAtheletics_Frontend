import React, { useEffect, useState } from 'react';
import './myOrder.css';
import { useAuth } from '../../authContext';


const MyOrders = () => {
    const {user,usingAxios} = useAuth();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchData();
    }, [user]);

    const fetchData = async() =>{
        const response = await usingAxios(`https://localhost:7106/api/UserOrders/getAllOrdersByUsername/${user.username}`,'get');
        setOrders(response);
    }

    return (
        <div className='myOrdersPage'>
        <div className="table-container">
            <table className="min-w-full table-auto border-collapse">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="px-4 py-2 text-left">SN</th>
                        <th className="px-4 py-2 text-left">Date</th>
                        <th className="px-4 py-2 text-left">Product Name</th>
                        <th className="px-4 py-2 text-left">Quantity</th>
                        <th className="px-4 py-2 text-left">Price</th>
                        <th className="px-4 py-2 text-left">Total Price</th>
                        <th className="px-4 py-2 text-left">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order, index) => (
                        <tr key={index} className="border-t">
                            <td className="px-4 py-2">{index + 1}</td>
                            <td className="px-4 py-2"> {new Date(order.orderDate).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                })}   </td>
                            <td className="px-4 py-2">{order.product}</td>
                            <td className="px-4 py-2">{order.quantity}</td>
                            <td className="px-4 py-2">{order.price}</td>
                            <td className="px-4 py-2">{order.totalPrice}</td>
                            <td className={`px-4 py-2 ${
                                order.status === 'delivered'
                                    ? 'text-green-500'
                                    : order.status === 'pending'
                                    ? 'text-red-500'
                                    : order.status === 'confirm'
                                    ? 'text-blue-500'
                                    : ''
                            }`}>{order.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </div>
    );
}

export default MyOrders;
