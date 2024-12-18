import React, { useState } from 'react';
import '../admin.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import DeleteConfirmation from './DeleteComponent/DeleteConfirmation';
import UpdateCategory from './UpdateComponents/UpdateCategory';
import UpdateEquipment from './UpdateComponents/UpdateEquipment';
import UpdateProduct from './UpdateComponents/UpdateProduct';
import ViewProduct from './ViewProduct/viewProduct';

const EditBar = ({id,subMenuLink,subMenu,fetchData,tableName}) => {
    const [updateDisplay,setUpdateDisplay]=useState(false);
    const [detailsDisplay,setDetailsDisplay] = useState(false);

    const hideDetails =()=>{
        setDetailsDisplay(false);
    }
    const showDetails =()=>{
        setDetailsDisplay(true);
    }

    const showUpdate = () =>{
        setUpdateDisplay(true);
    }

    const hideUpdate = () =>{
        setUpdateDisplay(false);
    }

const [display,setDisplay]=useState(false);
 
const deleteConfirmation = () =>{
    setDisplay(true);
}

const cancelDelete = () =>{
 setDisplay(false);
}

const deleteItem = async () =>{
    const token = localStorage.getItem('token');
        switch(tableName){
        
            //For sports table
            case "sports":
                try {
                    const response = await axios.delete(`https://localhost:7106/api/Categories/delete_category/${id}`,
                    
                        {
                            headers:{
                                'Authorization': `Bearer ${token}`,  
                                'Content-Type': 'application/json'
                            }
                        }
                    );
                    if(response.data.code==="000"){
                        fetchData();
                        
                    }
                    else{
                        toast.error('Delete operation failed !');
                    }
                } catch (error) {
                    toast.error(error.message);
                    console.log('error deleting : '+error.message);
                }
                setDisplay(false);
                break;

            //For Equipment table 
            case "equipment":

                try {
                    const response = await axios.delete(`https://localhost:7106/api/Categories/delete_subCategory/${id}`,
                        {
                            headers:{
                                'Authorization': `Bearer ${token}`,  
                                'Content-Type': 'application/json'
                            }
                        } );
                    if(response.data.code==="000"){
                        fetchData();  
                    }
                    else{
                        toast.error('Delete operation failed !');
                    }
                } catch (error) {
                    toast.error(error.message);
                    console.log('error deleting : '+error.message);
                }
                setDisplay(false);
                break;

            //For product table
            case "product":
                try {
                    const response = await axios.delete(`https://localhost:7106/api/Categories/delete_product/${id}`,
                        {
                            headers:{
                                'Authorization': `Bearer ${token}`,  
                                'Content-Type': 'application/json'
                            }
                        }
                    );
                    if(response.data.code==="000"){
                        fetchData();  
                    }
                    else{
                        toast.error('Delete operation failed !');
                    }
                } catch (error) {
                    toast.error(error.message);
                    console.log('error deleting : '+error.message);
                }
                setDisplay(false);
                break;

            //For Default
            default:
                console.log('Invalid table!');
                break;
        }       
    }
    
    return (
        <div>

             
            <button type="button" onClick={showUpdate} class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 editBtns">Edit</button>
           

            
            <button type="button" onClick={deleteConfirmation}
            class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 editBtns">Delete</button>
        
            {tableName==="product"?(
            <button type="button" onClick={showDetails} class="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 editBtns">{subMenu}</button>

            ):(
            <Link to={subMenuLink}>
            <button type="button"  class="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 editBtns">{subMenu}</button>
            </Link>
            )}
            
            {display && < DeleteConfirmation handleDelete={deleteItem} handleClose={cancelDelete} text='Are you sure you want to delete this item?' />}
            <ToastContainer />
            
            {(updateDisplay && tableName==="sports") && (< UpdateCategory id={id} fetchData={fetchData} onCancel={hideUpdate} />)} 
            {(updateDisplay && tableName==="equipment") && (< UpdateEquipment id={id} fetchData={fetchData} onCancel={hideUpdate} />)} 
            {(updateDisplay && tableName==="product") && (< UpdateProduct id={id} fetchData={fetchData} onCancel={hideUpdate} />)} 
            {detailsDisplay && < ViewProduct onCancel={hideDetails} id={id} />}

        </div>
    );
}

export default EditBar;
