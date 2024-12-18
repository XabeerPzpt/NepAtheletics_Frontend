import React from 'react';
import '../../admin.css';

const UserTable = ({tableHeading,children,option_column}) => {
    return ( 
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg adminTable" >
                    <h1 className='heading'>{tableHeading}</h1>
                    
                    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 ">
                            <tr>
                                <th scope="col" class="px-6 py-3 tableFont "> 
                                     User id
                                </th>
                                <th scope="col" class="px-6 py-3 tableFont">
                                    Username
                                </th>
                                <th scope="col" class="px-6 py-3 tableFont" >
                                    email
                                </th>
                                <th scope="col" class="px-6 py-3 tableFont" >
                                    created by
                                </th>
                                <th scope="col" class="px-6 py-3 tableFont" >
                                    created time
                                </th>
                                <th scope="col" class="px-6 py-3 tableFont" >
                                    updated by
                                </th>
                                <th scope="col" class="px-6 py-3 tableFont" >
                                    updated time
                                </th>
                                <th scope="col" class="px-6 py-3 tableFont" >
                                    Is Active
                                </th>
                                <th scope="col" class="px-6 py-3 tableFont" >
                                    Is Block
                                </th>

                                {option_column}
                            </tr>
                        </thead>
                        <tbody>
                           {children}
                        </tbody>
                    </table>
                </div>
    );
}

export default UserTable;
