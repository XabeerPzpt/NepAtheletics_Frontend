import React, {useEffect, useState } from 'react';
import './admin.css';
import axios from 'axios';
import { useAuth } from '../../authContext';
import EditBar from './adminComponents/editBar';
import AddCategory from './adminComponents/AddingComponents/addCategory';
const Products = () => { 
    const [addDisplay,setAddDisplay]=useState(false);
    
    const showAdd = () => {
        setAddDisplay(true);
    }
    
    const hideAdd = ()=>{
        setAddDisplay(false);
    }
    

    const {categories,setCategories,toPascalCase} = useAuth();
    useEffect(() => {
        fetchCategories();
    },[]);
 

    const fetchCategories = async() =>{
        try {
            var categoryList = await axios.get("https://localhost:7106/api/Categories/get_Category");
            setCategories(categoryList.data);
            
        } catch (error) {
            console.log('Error occured while fetching data : '+error.message)
        }
    }

    return (   
        <>
        <div className='adminContent'>
        <div className='DashboardTitle'> Products </div>
 
    
                <div class="relative overflow-x-auto shadow-md sm:rounded-lg adminTable" >
                    <h1 className='heading'>Sports Category</h1>
                    <button className='addItem' onClick={showAdd}>+ add category</button>
                    
                    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 ">
                            <tr>
                                <th scope="col" class="px-6 py-3 tableFont">
                                     S.N.
                                </th>
                                <th scope="col" class="px-6 py-3 tableFont" >
                                    Name
                                </th>
                                <th scope="col" class="px-6 py-3 tableFont" >
                                    Action
                                </th> 
                                
                            </tr>
                        </thead>
                        <tbody >
                        {categories?.map((category,index)=>(
                            <tr key={category?.id} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                
                                <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white tableFont">
                                    {index+1}
                                </td>
                                <th class="px-6 py-4 tableFont">
                                    {toPascalCase(category?.name)}
                                </th>
                                <td class="px-6 py-4 editBar">
                                    <EditBar tableName="sports" subMenu="Equipments" id={category?.id} subMenuLink={`/products/equipment/${category?.id}/${category?.name}`} fetchData={fetchCategories} />
                                </td> 
                            </tr> 
                            ))}
                        </tbody>
                    </table>
                </div>

                {addDisplay && < AddCategory fetchData={fetchCategories} onCancel={hideAdd} />}

        </div>
        
        </>
    );
}

export default Products;
