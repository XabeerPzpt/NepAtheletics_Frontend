import React from 'react';
import './card.css';
import { useAuth } from '../authContext';
import { Link } from 'react-router-dom';

const UserProfileCard = () => {
const {user,logout} = useAuth();


    return (
        
        <div class="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                    <div class="flex items-center justify-between mb-4">
                        <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white"> {user?.first_Name??''} {user?.middle_Name??''} {user?.last_Name??''}</h5>
                        
                </div>
                <div class="flow-root">
                        <ul class="divide-y divide-gray-200 dark:divide-gray-700">
                            <li class="py-3 sm:py-4">
                                <div class="flex items-center">
                                    
                                    <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                        Email Address : 
                                    </div>
                                    <div class="flex-1 min-w-0 ms-4">
                                        
                                        <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                                            {user?.email??''}
                                        </p>
                                    </div>
                                    
                                </div>
                            </li>
                            <li class="py-3 sm:py-4">
                                <div class="flex items-center">
                                    
                                    <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                        Home Address : 
                                    </div>
                                    <div class="flex-1 min-w-0 ms-4">
                                        
                                        <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                                            {user?.address??''}
                                        </p>
                                    </div>
                                    
                                </div>
                            </li>
                            <li class="py-3 sm:py-4">
                                <div class="flex items-center">
                                    
                                    <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                        Phone Number : 
                                    </div>
                                    <div class="flex-1 min-w-0 ms-4">
                                        
                                        <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                                            {user?.phone??''}
                                        </p>
                                    </div>
                                    
                                </div>
                            </li>
                
                            <li class="py-3 sm:py-4">
                                <div class="flex items-center" className='change_password'>
                                    
                                    <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white" className='changePasswordText'>
                                        <Link to='/changePassword' >
                                        Change Password 
                                        </Link>
                                    </div>
                                    
                                </div>
                            </li>

                            <li class="py-3 sm:py-4">
                                <div class="flex items-center logoutContainer">
                                    <div onClick={logout} class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white logout">
                                        Logout 
                                    </div>    
                                </div>
                            </li>
                        </ul>
                </div>
    </div>
    );
}

export default UserProfileCard;


