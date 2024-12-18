import React, { useEffect, useState } from 'react';
import '../../admin.css';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import EditAndUpdateForm from '../EditAndUpdateForm';

const AddEquipment = ({fetchData,onCancel,sport_id}) => {
    const [name,setName] = useState();
    const [token,setToken] = useState(null);

    useEffect(() => {
    setToken(localStorage.getItem('token'));      
    }, []);

    
    

    const handleSubmit = async(e) =>{

        e.preventDefault();
        const data = {
            name : name,
            sport_id : sport_id 
        }

        try {
            const response = await axios.post('https://localhost:7106/api/Categories/add_subCategory',
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
        
        
    }
    return (
        
        <EditAndUpdateForm heading="Add Equipment"  onSubmit={handleSubmit} buttonName="Add" onCancel={onCancel} additionalChildren={<ToastContainer />}>
            <label for="category-name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white texts">Equipment Name </label>
            <input type="text" id="category-name"
                value={name}
                onChange={(e)=>setName(e.currentTarget.value)}
                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light dataInput" />
        </EditAndUpdateForm>
                        
            

    );
}

export default AddEquipment;
