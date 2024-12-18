import React from 'react';
import './user.css';  
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react'; 
import { Link } from 'react-router-dom';
import { useAuth } from '../../authContext';
import ProductCardsList from './productCardsList';
import Cart from './cart';
import { FaHome } from "react-icons/fa";


import {FaFileInvoice } from 'react-icons/fa';
const ProductsDisplayPage = () => { 
    const [clickedProduct,setClickedProduct] = useState(1);
    const [product,setproduct] = useState(null);    //For listing products based on category clicked
    const {toPascalCase,isLoggedIn} = useAuth();
    const fetchproducts = async() =>{
        try {
            var response = await axios.get("https://localhost:7106/api/Categories/get_Category");
            setproduct(response.data);
             
        } catch (error) {
            console.log('Error occured while fetching data : '+error.message)
        }
    } 

    useEffect(() => {
        fetchproducts();
    },[]);


    return (
        <div>

            {/* Product Tab/ Menu Bar */}
            <div className='menuBar'>      
            <ul class="hidden text-sm font-medium text-center text-white rounded-lg shadow sm:flex dark:divide-gray-700 dark:text-gray-400 ">
                {product?.map((currentProduct)=>(
                    <li key={currentProduct?.id} class="w-full focus-within:z-10">
                        <a href="#" class="inline-block w-full p-4 bg-[#414141] border-r border-transparent hover:bg-[#00b308] p-5 text-base" onClick={()=>setClickedProduct(currentProduct?.id)} >{toPascalCase(currentProduct?.name)}</a>
                    </li>
                ))}
            </ul>
            </div> 

            
            {/* Product Lists field */}
            <div className='ProductListLayout'>

                <div className='product'>

                   {/* Displaying products of selected category  */}
                   <ProductCardsList productId={clickedProduct} />
                </div>

            </div>
            
 
            {/* Order history icon */}
            {isLoggedIn &&
            <Link to='/myOrders' className='orderHistoryField' >
            <FaFileInvoice  className='orderHistory'/>
            </Link> }
            
            {/* Cart icon on the top */}
            <div>
                
                <Cart />

            </div>

    </div>
    
    );
} 

export default ProductsDisplayPage;
