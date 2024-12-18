import React, { useEffect, useState } from 'react';
import '../../admin.css';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import EditAndUpdateForm from '../EditAndUpdateForm';

const AddProduct = ({fetchData,onCancel,equipment_id}) => {
    const [name,setName] = useState();
    const [price,setPrice]=useState();
    const [description,setDescription]=useState();
    const [token,setToken] = useState(null);

    useEffect(() => {
    setToken(localStorage.getItem('token'));      
    }, []);
 
    
    

    const handleSubmit = async(e) =>{

        e.preventDefault();
        const data = {
            name : name,
            equipment_id : equipment_id,
            price : price,
            description : description 
        }
        try {
            const response = await axios.post('https://localhost:7106/api/Categories/add_product',
                data,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json', 
                    },
                });
                
            if (response.data.code==="000"){
                fetchData();
                onCancel();
            }
            else{
                toast.error('Adding Category Failed !');
            }
        } catch (error) {
            toast.error(error.message);
            console.log(error);
           
        }
        onCancel();
        
        
        
    }
    return (
        
        <EditAndUpdateForm heading="Add Product"  onSubmit={handleSubmit} buttonName="Add" onCancel={onCancel} additionalChildren={<ToastContainer />}>
            <label for="product-name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white texts">Product Name </label>
            <input type="text" id="product-name"
                value={name}
                onChange={(e)=>setName(e.currentTarget.value)}
                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light dataInput" />
            <label for="product-price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white texts">
                Product Price
            </label>
            <input
                type="number"
                id="product-price"
                value={price}
                onChange={(e) => setPrice(e.currentTarget.value)}
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light dataInput"
            />

            <label for="product-description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white texts">
                Product Description
            </label>
            <textarea
                id="product-description"
                value={description}
                onChange={(e) => setDescription(e.currentTarget.value)}
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light dataInput"
            />  
        </EditAndUpdateForm>
                        
            

    );
}

export default AddProduct;
