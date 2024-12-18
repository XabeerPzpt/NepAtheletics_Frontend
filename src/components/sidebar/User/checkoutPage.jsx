import React, { useEffect, useState }  from 'react';
import Navbar from '../../Navbar/navbar';
import './user.css';
import CartAddedItems from './cartAddedItems';
import CheckoutForm from './checkoutForm';
import { useAuth } from '../../authContext';

const CheckoutPage = () => { 
const {addedToCart,orders,user,usingAxios} = useAuth();
const [totalPrice,setTotalPrice] = useState(0);
const [isConfirmed,setIsConfirmed] = useState(false);

useEffect(() => {
    const totalPriceCalculated = orders.reduce((temp,row)=>temp+row.total_price,0); // Calculating total price, 0 is the initial value of temp
    setTotalPrice(totalPriceCalculated);

}, [orders]);


const confirmOrders = async() => {
await usingAxios(`https://localhost:7106/api/UserOrders/confirmOrder/${user.username}`,'put',null)
setIsConfirmed(true);
}

    return ( 
        <>
        <div className='checkoutPage'>
            <div className='navHeading'>
                <Navbar />
            </div>
     
            <div className='checkoutBody'>
               

                {!isConfirmed && addedToCart.length>0 ?(
                <>
                {/* Form Field */}
                <div className='checkoutFormField'>
                    <CheckoutForm confirm={confirmOrders} />
                </div>

                {/* Added products display field */}
                {addedToCart.length>0?
                (<div className='checkoutSelectedProducts'>
                    <div className='productListForScrolling'>
                        <CartAddedItems quantityOnly={true} />
                    </div>
                    
                    <div className='calCulationField'>
                        <div className='totalQty'>Total Items Selected : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {addedToCart.length} </div>
                        <div className='totalAmt'>Total Amount: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Rs {totalPrice}</div>
                    </div>
                </div>):
                (<p style={{ marginTop: '30px', color: 'red', marginLeft: '250px' }}>No products added to cart !</p>)}
                
                </>
                ):(
                    <div>"Thank you for your order! Your order has been successfully placed and is being processed. You will receive a confirmation email shortly with the details of your order." </div>
                )}

            </div>
        </div>
        </>
    );
}

export default CheckoutPage;
