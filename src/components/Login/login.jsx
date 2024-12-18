import { Link, useNavigate } from 'react-router-dom';
import React,{useState} from 'react';
import axios from 'axios';
import './login.css';
import { ToastContainer, toast } from 'react-toastify';    
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../authContext';

const Login = () => {
    const {login, isLoggedIn} = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
 
    const onCancel = ()=>{
        navigate('/');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

            try {
                var response = await axios.post('https://localhost:7106/api/Users/login',
                    {
                        username, password
                    });
                    if (response.data.code===200) {
                        const role = response.data.role;
                        const token = response.data.token;
                        login(token,role);
                    } else {
                        toast.error('Something went wrong');
                        console.log(isLoggedIn);
                        
                    }
            } catch (error) {
                
                if (error.code==="ERR_NETWORK") {
                   toast.error('Server Error! Please check your server') 
                }              
                else if (error.code==="ERR_BAD_REQUEST"){
                    console.log();
                    toast.error('Invalid Username or password');
                   }
                else{
                    toast.error(error.message);
                }
                
            }
        };


    return ( 
        <>
        {!isLoggedIn && (
        <div className='contents'>
           <div className='popup-background-login'>
            <div className='popup-content-login ' >
            <form class="max-w-sm mx-auto" onSubmit={handleSubmit}>
                <div class="mb-5">
                    <label for="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your username</label>
                    <input type="text" id="username" 
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                    placeholder="Username" 
                    value={username}
                    onChange={(e)=>setUsername(e.target.value)}
                    required />
                </div>
                <div class="mb-5">
                    <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                    <input type="password" id="password"
                     class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                     value={password}
                     onChange={(e)=>setPassword(e.target.value)}
                     required />
                </div> 
                <div className='register'>
                    Don't have an account? <Link to='/register' className='register_button'>Register</Link>
                </div>
                <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 popup-button-login ">Submit</button>
                <button onClick={onCancel} class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 popup-button-login ">Cancel</button>
                </form>
                </div> 
                </div>
                
                <ToastContainer /> 
        </div>)}
        </>
    );

}

export default Login;



