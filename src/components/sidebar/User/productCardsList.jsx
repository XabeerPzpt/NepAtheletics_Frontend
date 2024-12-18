import React, { useState } from 'react';
import './user.css';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../authContext';
 
const ProductCardsList = ({ productId }) => {
    const { isLoggedIn } = useAuth(); 
    const [products, setProducts] = useState([]);
    const { fetchOrderFromDB, addedToCart, setAddedToCart, user, orders, setOrders, usingAxios } = useAuth();


     
    useEffect(() => {
        if (user?.username) {
            fetchOrderFromDB();
        }
    }, [user]);
        
    


    //Functions to increase/decrease quantity
    const increaseQty = async (id) => {
    const data = {
            username: user.username,
            productId: id
          }
    await usingAxios("https://localhost:7106/api/UserOrders/increaseQty","put",data);
    fetchOrderFromDB();
    };


    const decreaseQty = async (id) => {
        const data = {
            username: user.username,
            productId: id
          }
    await usingAxios("https://localhost:7106/api/UserOrders/decreaseQty","put",data);
    fetchOrderFromDB();
    }; 

//Display Qty in inc/dec field
    const showQty = (id) => {
        const productOrder = orders.find(order => order.productId === id);
        return productOrder ? productOrder.quantity : 0;
    };
 

    const addToCart = async(id) => {
        const orderData ={
            username : user.username,
            productId : id,
            orderDate : new Date().toISOString(),
            quantity : 1,
           
        }
        
        await usingAxios("https://localhost:7106/api/UserOrders/insertOrderRecord","post",orderData);
        fetchOrderFromDB();
     
    };

    const fetchProducts = async (id) => {
        const data = await usingAxios(`https://localhost:7106/api/Categories/get_products/${id}`,"get");
        setProducts(data);
    };
  
 
    useEffect(() => {
        fetchProducts(productId); 
    }, [productId]);


    return (
        <div className="product-container">
            {products?.map((product) => (
                <div key={product?.id} className="product-card">
                    <div className="card-link">
                        <img src={product?.image_url} alt={product?.name} className="product-image" />
                        <h3 className="product-name">{product?.name}</h3>
                        <div className="priceField">
                            <p className="product-price">Rs {product?.price}</p>
                            <p></p>
 
                            {/* Display increment/decrement button if addedToCart includes current product's id */}
                             {isLoggedIn ?
                             (addedToCart.includes(product?.id)? 
                             (<div className='IncDecBtn'>
                                    <form className="max-w-xs mx-auto">
                                        <div className="relative flex items-center max-w-[8rem]">
                                            {/* Decrement Button */}
                                            <button type="button" id="decrement-button" onClick={() => decreaseQty(product?.id)} data-input-counter-decrement="quantity-input" className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                                                <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16" />
                                                </svg>
                                            </button>
                                            <input type="text" id="quantity-input" data-input-counter data-input-counter-min="1" data-input-counter-max="50" aria-describedby="helper-text-explanation" className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" readOnly value={showQty(product?.id)} required />
                                            
                                            {/* Increment Button */}
                                            <button type="button" id="increment-button" onClick={() => increaseQty(product?.id)} data-input-counter-increment="quantity-input" className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                                                <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
                                                </svg>
                                            </button>
                                        </div>
                                    </form>
                                </div>
                             ): (<button className="add-to-cart" onClick={() => addToCart(product?.id)}>Add to Cart</button>)
                             ):(
                                <Link to='/login'>
                                    <button className="add-to-cart">Add to Cart</button>
                                </Link>)
                             }
            
                        </div>
                    </div> 
                </div>
            ))}
        </div>
    );
};

export default ProductCardsList;

