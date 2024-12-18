import React, { useEffect, useState } from 'react';
import './admin.css';
import { useAuth } from '../../authContext';
import { Button } from 'flowbite-react';


const Orders = () => {
    const {usingAxios} = useAuth();
    const [confirmedOrders,setConfirmedOrders]=useState([]);

    useEffect(() => {
        fetchConfirmedOrdersFromDB();
    }, []);

    const fetchConfirmedOrdersFromDB = async() => {
        const response = await usingAxios('https://localhost:7106/api/AdminOrderController/confirmedOrders','get');
        setConfirmedOrders(response);
    }

    const confirm = async(orderId) => {
        await usingAxios(`https://localhost:7106/api/AdminOrderController/makeDelivery?orderId=${orderId}`,'put');
        fetchConfirmedOrdersFromDB();

    }
    return (
        <div className='adminContent'>
                <div className='DashboardTitle'>Orders </div>

                <div class="relative overflow-x-auto shadow-md sm:rounded-lg adminTable" >
                    <h1 className='heading'>Orders Confirmed</h1>
                    
                    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 ">
                            <tr>
                                <th scope="col" class="px-6 py-3 tableFont">
                                    S.N
                                </th>
                                <th scope="col" class="px-6 py-3 tableFont">
                                    Date
                                </th>
                                <th scope="col" class="px-6 py-3 tableFont" >
                                    User
                                </th>
                                <th scope="col" class="px-6 py-3 tableFont" >
                                    Product
                                </th> 
                                <th scope="col" class="px-6 py-3 tableFont" >
                                    Quantity
                                </th> 
                                <th scope="col" class="px-6 py-3 tableFont" >
                                    Price
                                </th> 
                                <th scope="col" class="px-6 py-3 tableFont" >
                                    Total Price
                                </th> 
                                <th scope="col" class="px-6 py-3 tableFont" >
                                    Status
                                </th> 
                                
                            </tr>
                        </thead>
                        <tbody >
                        {confirmedOrders?.map((row,index)=>(
                            <tr key={index} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                
                                <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white tableFont">
                                    {index+1}
                                </td>
                                <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white tableFont">
                                {new Date(row.orderDate).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                })}                                
                                </td>
                                <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white tableFont">
                                {row.username}
                                </td>
                                <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white tableFont">
                                {row.product}
                                </td>
                                <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white tableFont">
                                {row.quantity}
                                </td>
                                <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white tableFont">
                                {row.price}
                                </td>
                                <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white tableFont">
                                {row.totalPrice}
                                </td>
                                <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white tableFont">
                                
                               {row.status==="confirm"?(
                                <Button
                                 onClick={() => confirm(row.orderId)}
                                 className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded w-[80%]"
                                    > 
                                {row.status}
                                </Button>
                               ):(
                                <div
                                className=" px-2 py-1 rounded w-[80%] text-green-500"
                                >
                                {row.status}
                                </div>
                               )}
                               

                                </td>
                                
                            </tr> 
                            ))}
                        </tbody>
                    </table>
                </div>

        </div> 
    );
} 

export default Orders;


