import React, { useState,useEffect } from 'react';
import EditAndUpdateForm from '../EditAndUpdateForm';
import axios from 'axios';
import { useAuth } from '../../../../authContext';
import { toast,ToastContainer } from 'react-toastify';

const UpdateEquipment = ({id,onCancel,fetchData}) => {
    const {toPascalCase} = useAuth();
    const [equipmentName,setEquipmentName]=useState('');
    const [browserToken,setBrowserToken]=useState(null);
     

    useEffect(() => {
        const fetchCategoryName = async() => {
            const token = localStorage.getItem('token');
            setBrowserToken(token)
            try {
                var response = await axios.get(`https://localhost:7106/api/Categories/get_item/equipment_and_clothing/${id}`,
                    {
                        headers:{
                            'Authorization': `Bearer ${token}`,  
                            'Content-Type': 'application/json'
                        }
                    }
                );
                setEquipmentName(toPascalCase(response.data.name));
            } catch (error) {
                console.log(error.message);
            }
        }
        fetchCategoryName();  
    }, []);


    const update = async(e) =>{
        e.preventDefault();
        const data = {
            id: id,
            name: equipmentName
        };
        try {
            var response = await axios.put("https://localhost:7106/api/Categories/update_subCategory",data,
                {
                    headers:{
                        'Authorization': `Bearer ${browserToken}`,  
                        'Content-Type': 'application/json'
                    }
                }
            );
            if(response.data.code==="000"){
                fetchData();
                onCancel();
            }
            else{
                toast.error("Something went wrong!");
            }
        } catch (error) {
            toast.error(error.message);
        }
    } 

    return (
        <EditAndUpdateForm  heading="Edit Form" buttonName="Save" onSubmit={update} onCancel={onCancel} additionalChildren={<ToastContainer/>}>
         <label for="category-name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white texts">Equipment Name</label>
            <input type="text" id="equipment-name" placeholder='Enter Equipment'
            value={equipmentName} onChange={(e)=>setEquipmentName(e.target.value)}
                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-300 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
        </EditAndUpdateForm>

    );
}

export default UpdateEquipment;
