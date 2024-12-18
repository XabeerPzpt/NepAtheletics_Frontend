import React from 'react';
import '../App.css';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';    
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ChangePassword = () => { 
    const [oldPassword,setOldPassword] = useState();
    const [newPassword,setNewPassword] = useState();
    const [confirmPassword,setConfirmPassword] = useState();
    
    const navigate = useNavigate();

    const handleSubmit = async (e) =>{
        e.preventDefault();
        if(newPassword!==confirmPassword){ 
            toast.error('New Passwords do not match !');
            return;
        }
        try {
            var token= localStorage.getItem('token'); 
            const response = await axios.put('https://localhost:7106/api/Users/reset_password',
                {oldPassword,newPassword},
                {
                    headers:{
                        'Authorization': `Bearer ${token}`,  
                        'Content-Type': 'application/json'
                    }
                }
            );
            if (response.data.code==="401") {
                toast.error(response.data.message);
                
            }
            else if (response.data.code==="409"){
                toast.error(response.data.message);
            }
            else if (response.data.code==="400"){
                toast.error(response.data.message);
            }
            else if (response.data.code==="000"){
                toast.success(response.data.message);
                setTimeout(()=>{
                    navigate('/');
                },1000);
            }
            else{
                toast.error(response.data.message);
            }
        } catch (error) {
            
                console.log('Exception message : '+error.message);
            
        }
    }

    return ( 
        
        <div className='contents'>
            
            <form class="max-w-md mx-auto" onSubmit={handleSubmit} style={{width:'300px'}}>

                <div class="relative z-0 w-full mb-5 group">
                    <input type="password" name="old_password" id="old_password"
                     value={oldPassword}
                     onChange={(e)=>setOldPassword(e.target.value)}
                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label for="old_password" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Old Password</label>
                </div>

                <div class="relative z-0 w-full mb-5 group">
                    <input type="password" name="new_password" id="new_password" 
                    value={newPassword}
                    onChange={(e)=>setNewPassword(e.target.value)}
                     class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label for="new_password" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">New Password</label>
                </div>

                <div class="relative z-0 w-full mb-5 group">
                    <input type="password" name="confirm_password" id="confirm_password" 
                    value={confirmPassword}
                    onChange={(e)=>setConfirmPassword(e.target.value)}
                     class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label for="confirm_password" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm Password</label>
                </div>

                <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                </form>
                <ToastContainer />
        
        </div>
    );
}

export default ChangePassword;
