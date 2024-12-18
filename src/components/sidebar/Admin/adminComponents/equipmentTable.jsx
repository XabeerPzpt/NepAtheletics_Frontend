import React, { useEffect, useState } from 'react';
import '../admin.css';
import { useAuth } from '../../../authContext';
import EditBar from './editBar';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import AddEquipment from './AddingComponents/addEquipment';


const EquipmentTable = () => {

    const [displayAdd,setDisplayAdd]=useState(false);
    const {categoryId,categoryName} = useParams();       //use categoryId from App.js --> <Route path='/products/equipment:categoryId' element={<EquipmentTable />} />
    const {subCategories,setSubCategories,toPascalCase} = useAuth();


    const showAdd = () =>{
        setDisplayAdd(true);
    }

    const hideAdd = ()=>{
        setDisplayAdd(false);
    }
 

    useEffect(() => {
        fetchSubCategory();
    },[]); 
 

    const fetchSubCategory = async() => {

        var token = localStorage.getItem('token');
        try {
            const subCategoryList = await axios.get(`https://localhost:7106/api/Categories/get_subCategory/${categoryId}`,
                {
                    headers:{
                        'Authorization': `Bearer ${token}`,  
                        'Content-Type': 'application/json'
                    }
                }
            );
            setSubCategories(subCategoryList.data);

        } catch (error) {
            console.log("Error occured : "+error.message);
        }
    }


    return (
        
        <div className='adminContent'>
                       <div className='DashboardTitle'> Products </div>

                
                <div class="relative overflow-x-auto shadow-md sm:rounded-lg adminTable" >
                    <h1 className='heading'>{toPascalCase(categoryName)} Equipments</h1>
                    <button className='addItem' onClick={showAdd}>+ add equipment</button>
                    {(subCategories && subCategories.length>0) ? (
                    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" class="px-6 py-3 tableFont">
                                     S.N.
                                </th>
                                <th scope="col" class="px-6 py-3 tableFont">
                                    Name
                                </th>
                                
                                <th scope="col" class="px-6 py-3 tableFont" >
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                        {subCategories?.map((category,index)=>(
                            <tr key={category?.id} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                
                                <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white tableFont">
                                    {index+1}
                                </td>
                                <th class="px-6 py-4 tableFont">
                                    {toPascalCase(category?.name)}
                                </th>
                                
                                <td class="px-6 py-4 editBar">
                                    <EditBar subMenu="Products" fetchData={fetchSubCategory} id={category?.id} tableName="equipment" subMenuLink={`/products/equipment/item/${category?.id}/${category?.name}`}  />
                                </td>
                            </tr>
                            ))}
                            <td colSpan='2'>

                            </td>
                        </tbody>
                    </table>
                     ):
                     (<p className='noRecords'>No records Found !</p>)}
                    {displayAdd && < AddEquipment onCancel={hideAdd} fetchData={fetchSubCategory} sport_id={categoryId} />}
                </div>
        </div>
    );
}

export default EquipmentTable;

