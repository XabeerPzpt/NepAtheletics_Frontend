import React, { useState, useEffect } from 'react';
import './admin.css';
import UserTable from './adminComponents/Tables/userTable';
import { useAuth } from '../../authContext';
import axios from 'axios';
import DeleteConfirmation from './adminComponents/DeleteComponent/DeleteConfirmation';

const Users = () => {
const [showDeleteOption,setShowDeleteoption] = useState(false);
const [userList,setUserList]=useState(null);
const {authorizationHeader,user} = useAuth();
const [currentUser,setCurrentUser] = useState(null);

useEffect(() => {
    fetchCategories();
},[]);


const fetchCategories = async() =>{
    try {
        var users = await axios.get("https://localhost:7106/api/Users/getUsersForAdmin",
            {
                headers:authorizationHeader
            }
        );
        setUserList(users.data);
        
    } catch (error) {
        console.log('Error occured while fetching data : '+error.message)
    }

}

const deleteOption = (currentUser) => {
    setCurrentUser(currentUser);
    setShowDeleteoption(true);
}

const closeDeleteOption = () => {setShowDeleteoption(false);}

   
    return (
        <div className='adminContent'>
        <div className='DashboardTitle'>  Users </div>
        <div className='userTables' >
            <div   className="userTable">
                <UserTable tableHeading="Admin List">
                    
                    {userList?.map((currentUser)=>(
                    currentUser.role==='admin'&&(
                    <tr>
                    
                    <td className='tableFont'>{currentUser.id}</td>
                    <td className='tableFont'>{currentUser.username}</td>
                    <td className='tableFont'>{currentUser.email}</td>
                    <td className='tableFont'>{currentUser.created_By}</td>
                    <td className='tableFont'>{new Date(currentUser.created_Time).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                })}  </td>
                    <td className='tableFont'>{currentUser.updated_By}</td>
                    <td className='tableFont'>{new Date(currentUser.updated_Time).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                })}</td>
                    <td className='tableFont'><div className={currentUser.is_Active? 'activeStatus active': 'activeStatus inactive'}></div> &nbsp;{currentUser.is_Active? 'Active': 'Inactive'}</td>
                    <td className='tableFont'>{currentUser.is_Block?'Block': 'Not Block'}</td>
                    </tr>
                )

                    ))}    
                     
                </UserTable>
            </div>
            <div   className="userTable">
                <UserTable  tableHeading="User List"
                //  option_column={<th scope="col" class="px-6 py-3 tableFont">
                //                    Action
                //                 </th>}
                 >
                                {userList?.map((currentUser)=>(
                    currentUser.role==='user'&&(
                    <tr>
                    
                    <td className='tableFont'>{currentUser.id}</td>
                    <td className='tableFont'>{currentUser.username}</td>
                    <td className='tableFont'>{currentUser.email}</td>
                    <td className='tableFont'>{currentUser.created_By}</td>
                    <td className='tableFont'>{new Date(currentUser.created_Time).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                })}  
                    </td>
                    <td className='tableFont'>{currentUser.updated_By}</td>
                    <td className='tableFont'>{new Date(currentUser.updated_Time).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                })}</td>
                    <td className='tableFont'><div className={currentUser.is_Active? 'activeStatus active': 'activeStatus inactive'}></div> &nbsp;{currentUser.is_Active? 'Active': 'Inactive'}</td>
                    <td className='tableFont'>{currentUser.is_Block?'Block': 'Not Block'}</td>
                    {/* <td className='actionField' ><button className='userTableButton editBtn' >Edit</button>
                                                 <button className='userTableButton deleteBtn' onClick={() => deleteOption(currentUser.username)} >Delete</button></td> */}
                    </tr>
                )

                    ))}  
                             
                </UserTable>
            </div>
           
        </div>
                    
        {showDeleteOption && <DeleteConfirmation text={`Delete ${currentUser}?`} handleClose={closeDeleteOption} /> }
        </div>
    );
} 

export default Users;
