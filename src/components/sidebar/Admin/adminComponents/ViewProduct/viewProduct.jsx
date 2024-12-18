import React, { useState,useEffect } from 'react';
import axios from 'axios';
import '../popup.css';
import './viewProduct.css';
import { useAuth } from '../../../../authContext';

const ViewProduct = ({id,onCancel}) => {
    const {toPascalCase} = useAuth();
    const [productName,setProductName]=useState('');
    const [price,setPrice]=useState();
    const [description,setDescription]=useState();
     

    useEffect(() => {
        const fetchCategoryName = async() => {
            const token = localStorage.getItem('token');
            try {
                var response = await axios.get(`https://localhost:7106/api/Categories/get_item/product/${id}`,
                    {
                        headers:{
                            'Authorization': `Bearer ${token}`,  
                            'Content-Type': 'application/json'
                        }
                    }
                );
                setProductName(toPascalCase(response.data.name));
                setPrice(response.data.price);
                setDescription(response.data.description);
            } catch (error) {
                console.log(error.message);
            }
        }
        fetchCategoryName();  
    }, []);


    
    return (
        <div className='popup-background'>
        <div className='popup-content card' >
         <h1 className='AddItemHeading productName'>{productName}</h1>
         <div class="max-w-sm mx-auto cardField">
            <div class="mb-5">
                <div className='row'><span className='key'>Product Price</span> Rs {price}</div>
                <div className='row'><span className='key'>Product Description</span> {description}</div>
            </div>
           <div className="popup-buttons popup-button-add">
            <button className="popup-button" onClick={onCancel} >Ok</button>
          
            </div>
            </div>
             
            </div>
        </div>

    );
}

export default ViewProduct;
