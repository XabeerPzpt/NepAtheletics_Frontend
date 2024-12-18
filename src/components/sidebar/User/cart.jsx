import React from 'react';
import './user.css';
import { FaCartShopping } from "react-icons/fa6";
import { useState } from 'react';
import { useEffect } from 'react';
import { useAuth } from '../../authContext';
import CartAddedItems from './cartAddedItems';
import { IoBagCheckOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';



const Cart = () => { 
    const[showCartPage,setShowCartPage]=useState(false);
    const {isLoggedIn,addedToCart} = useAuth();

  
    // Syncing with session storage to get total number of items inserted into cart:
    useEffect(() => {
       
    }, []);

    return (
    <>
    {isLoggedIn && (
        <div className='cartField'> 
        <div className='notification'>{addedToCart.length}</div>
        <FaCartShopping className='cartIcon' onClick={() => setShowCartPage(true)} />
        </div>
    )}
    

    {showCartPage && (
        <div className='cartBackground'>
        <div className='cartPage'>
            <div className='headerForCartPage'>
                <div className='cartHeadingText'>
                    My Cart
                </div>
            <button type="button"  onClick={() => setShowCartPage(false)} class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 closeButton">
                    X
            </button>
            </div>

            {addedToCart.length===0? 
            (<div className='addedProductsList'>
                No Products are added to cart!
                </div>):
            (<>
            {/* Table of added items in the cart */}
            <div className='addedProductsList'>
                <CartAddedItems />
            </div>

            {/* Checkout Button */}
            
            <div className='checkoutButton'>
            <Link to='/checkout'>
            <button type="button">
            <IoBagCheckOutline />
            Check out 
            </button>
            </Link>
            </div>
           
            </>
                )
            }
            
            

        </div>
        </div>
        )}
    </>    
    );
}

export default Cart;
