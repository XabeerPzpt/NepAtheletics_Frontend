import React, { useEffect, useState } from 'react';
import '../admin.css';
import { useAuth } from '../../../authContext';
import EditBar from './editBar';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import AddProduct from './AddingComponents/addProduct';
  

const Items = () => {
    const [displayAdd,setDisplayAdd]=useState(false);
    const {subCategoryId,subCategoryName} = useParams();     
    const {product,setProduct,toPascalCase} = useAuth();
    
    const showAdd = () =>{
        setDisplayAdd(true);
    }

    const hideAdd = () =>{
        setDisplayAdd(false);
    }

    useEffect(() => {
        fetchProduct(subCategoryId);
    }, [subCategoryId]);


 

    const fetchProduct = async() => {
        var token = localStorage.getItem('token');
        try {
            const productList = await axios.get(`https://localhost:7106/api/Categories/get_product/${subCategoryId}`,
                {
                    headers:{
                        'Authorization': `Bearer ${token}`,  
                        'Content-Type': 'application/json'
                    }
                }
            );
            setProduct(productList.data);

        } catch (error) {
            console.log("Error occured : "+error.message);
        }
    }




    return (
        
        <div className='adminContent'>
               
               <div className='DashboardTitle'> Products </div>

                <div class="relative overflow-x-auto shadow-md sm:rounded-lg adminTable" >
                    <h1 className='heading'> {toPascalCase(subCategoryName)} Products</h1>
                    <button className='addItem' onClick={showAdd}>+ add product</button>

                    {(product && product.length>0)?(
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
                        
                        {product?.map((row,index)=>(
                            <tr key={row?.id} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                
                                <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white tableFont">
                                    {index+1}
                                </td> 
                                <th class="px-6 py-4 tableFont">
                                    {toPascalCase(row?.name)}
                                </th>
                                
                                <td class="px-6 py-4 editBar">
                                    <EditBar subMenu="View" fetchData={fetchProduct} tableName="product" id={row?.id} />
                                </td>
                            </tr>
                            ))}
                           
                        </tbody>
                    </table>):(<p className='noRecords'>No records Found!</p>)}
                    {displayAdd && < AddProduct onCancel={hideAdd} fetchData={fetchProduct} equipment_id={subCategoryId} />}
                </div>

           
        </div>
    );
}

export default Items;