import React,{useState} from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';    
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../authContext';
import './register.css';
import { useNavigate } from 'react-router-dom';

const Register = () => {
   const {login} = useAuth();
    const [username, setUsername] =useState('');
    const [password, setPassword] =useState('');
    const [confirmPassword, setconfirmPassword] =useState('');
    const [email, setEmail] =useState('');
    const [firstName, setfirstName] =useState('');
    const [middleName, setmiddleName] =useState(null);
    const [lastName, setlastName] =useState('');
    const [address, setaddress] =useState('');
    const [phone, setphone] =useState();
   
    const navigate = useNavigate();
    const onCancel =()=>{
        navigate('/');
    }
 
    const handleSubmit = async(e) => {
        e.preventDefault();

        if(middleName===''){                        //set null for middlename
            setmiddleName('');
        }

        if (password!==confirmPassword) {           // Check password and confirm password
            console.log('passwords donot match');
            toast.error('Passwords donot match');
            return;
        }
        try {
        const response = await axios.post('https://localhost:7106/api/Users/register',
        {username,password,email,first_Name:firstName,middle_Name:middleName,last_Name:lastName,address,phone,role:'user'}
        );  
        console.log(response.data); 
        if(response.data.code==="000"){
            toast.success('Registered Successfully');
            setTimeout(() => {

                console.log(response.data);
                login(response.data.token); 
            }, 1000);
            
        } 
        } catch (error) {
            console.log('Other error : '+error);
            if (error.code==="ERR_BAD_REQUEST") {
                toast.error('User already exist');
                }
        }
        console.log('Username : '+username);
        console.log('Password : '+password);
        console.log('Confirm Password : '+confirmPassword);
        console.log('email : '+email);
        console.log('First Name : '+firstName);
        console.log('Middle Name : '+middleName);
        console.log('Last Name : '+lastName);
        console.log('Address : '+address);
        console.log('Phone : '+phone);
        
    }
    return (
        <div className='contents'>
            <div className='popup-background-register'>
                <div className='popup-content-register' >
                <form class="max-w-md mx-auto" onSubmit={handleSubmit}>

                    <div class="relative z-0 w-full mb-5 group">
                        <input type="text" name="floating_username" id="floating_username"
                        value={username} 
                        onChange={(e)=>setUsername(e.target.value)} class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <label for="floating_username" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Username</label>
                    </div>

                    <div class="relative z-0 w-full mb-5 group">
                        <input type="email" name="floating_email" id="floating_email" 
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)} class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <label for="floating_email" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
                    </div>

                    <div class="relative z-0 w-full mb-5 group">
                        <input type="password" name="floating_password" id="floating_password"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)} class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <label for="floating_password" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                    </div>

                    <div class="relative z-0 w-full mb-5 group">
                        <input type="password" name="repeat_password" id="floating_repeat_password"
                         value={confirmPassword}
                         onChange={(e)=>setconfirmPassword(e.target.value)} class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <label for="floating_repeat_password" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm password</label>
                    </div>

                    <div class="grid md:grid-cols-2 md:gap-6">
                       
                        <div class="relative z-0 w-full mb-5 group">
                            <input type="text" name="floating_first_name" id="floating_first_name"
                            value={firstName}
                            onChange={(e)=>setfirstName(e.target.value)} class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                            <label for="floating_first_name" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First name</label>
                        </div>

                        <div class="relative z-0 w-full mb-5 group">
                            <input type="text" name="floating_middle_name" id="floating_middle_name"
                            value={middleName}
                            onChange={(e)=>setmiddleName(e.target.value)} class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                            <label for="floating_middle_name" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Middle name</label>
                        </div>

                    </div>

                    <div class="grid md:grid-cols-2 md:gap-6">

                        <div class="relative z-0 w-full mb-5 group">
                            <input type="text" name="floating_last_name" id="floating_last_name"
                            value={lastName}
                            onChange={(e)=>setlastName(e.target.value)} class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                            <label for="floating_last_name" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Last Name</label>
                        </div>

                    

                        <div class="relative z-0 w-full mb-5 group">
                            <input type="text" name="address" id="address"
                            value={address}
                            onChange={(e)=>setaddress(e.target.value)} class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                            <label for="floating_address" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Address</label>
                        </div>

                    </div>

                    <div class="grid md:grid-cols-2 md:gap-6">

                        <div class="relative z-0 w-full mb-5 group">
                            <input type="number" name="phone" id="phone"
                            value={phone}
                            onChange={(e)=>setphone(e.target.value)} class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                            <label for="floating_phone" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone</label>
                        </div>

                    </div>
                    
                    <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 popup-button-register">Submit</button>
                    <button onClick={onCancel} class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 popup-button-register">Cancel</button>

                    </form>
                    </div>
                    </div>
                    <ToastContainer /> 
        </div>
    );
}

export default Register;
