import React, { useState } from 'react';
import { useEffect } from 'react';
import { useAuth } from '../../authContext';
 
const CartAddedItems = ({quantityOnly=false}) => {
    const {user, orders, usingAxios, fetchOrderFromDB,allProducts } = useAuth();
    const [imageUrls,setImageUrls]=useState([]);

    useEffect(() => { 
        fetchOrderFromDB(); 
        fetchImageUrls();
    },[]);


    const fetchImageUrls = () => {
        const imageMap = orders
            .map((order) => {
                const product = allProducts.find((p) => p.id === order.productId);
                return product ? { [order.productId]: product.image_url } : null;
            })
            .filter(Boolean) // Removes null values from the array
            .reduce((acc, item) => ({ ...acc, ...item }), {}); // Merge all objects into one
        
        setImageUrls(imageMap);
    };
    //remove the product from session storage after clicking remove
    const removeCartProduct = async (id)=> {

        
        const data = {
            username: user.username,
            productId: id
          }
        await usingAxios("https://localhost:7106/api/UserOrders/deleteFromCart","delete",data);
        fetchOrderFromDB();
    }

    const inc = async(id) =>{
         const data = {
            username: user.username,
            productId: id
          }
    await usingAxios("https://localhost:7106/api/UserOrders/increaseQty","put",data);
    fetchOrderFromDB();
    }


    const dec = async(id) =>{const data = {
                username: user.username,
                productId: id
            }
        await usingAxios("https://localhost:7106/api/UserOrders/decreaseQty","put",data);
        fetchOrderFromDB();
    }
 
    return (
        

                <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" class="px-16 py-3">
                                    <span class="sr-only">Image</span>
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Product
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Qty
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Price
                                </th>
                                
                                
                                
                                {quantityOnly?(
                                  <th scope="col" class="px-6 py-3">  Total </th>):(
                                    <th scope="col" class="px-6 py-3">  Action </th>)}
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((row)=>
                                <tr key={row.productId} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td class="p-4">
                                    <img src={imageUrls[row.productId]} class="w-16 md:w-32 max-w-full max-h-full" alt={row.product_name}  />
                                </td>
                                <td class="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                {row.product_name}
                                </td>
                                <td class="px-6 py-4">
                                {quantityOnly?(
                                    <p>{row.quantity}</p>
                                    
                                ):(
                                    <div class="flex items-center">
                                    {/* Decrease Button  */}
                                    <button class="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" onClick={()=>dec(row.productId)} type="button">
                                        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16"/>
                                        </svg>
                                    </button>
                                    <div className="flex justify-center items-center">
                                        <input
                                            id="first_product"
                                            className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-center"
                                            placeholder={row.quantity}
                                            required
                                        />
                                    </div>
                                    {/* increase button */}
                                    <button class="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" onClick={()=>inc(row.productId)} type="button">
                                       
                                        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>
                                        </svg>
                                    </button>
                                </div>  
                                )}
                                    
                                </td>
                                <td class="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                {row.price}
                                </td>


                                {/* Make Changes here */}
                                {quantityOnly?(
                                    <td class="px-6 py-4 font-semibold text-gray-900 dark:text-white">{row.price*row.quantity}</td>
                                ):(
                                    <td class="px-6 py-4">
                                    <button class="font-medium text-red-600 dark:text-red-500 hover:scale-105 transition-transform duration-150" onClick={() => removeCartProduct(row.productId)}>Remove</button>
                                </td>
                                )}
                                
                            </tr>
                          
                            )}
                             
                        </tbody>
                    </table>
                </div>

    );
}

export default CartAddedItems;
