import React,{ useState} from 'react';
import logo from '../../Assets/CompanyLogo.png';
import UserIcon from '../../Assets/UserIcon.png';
import { Link } from 'react-router-dom';
import './navbar.css';
import '../../App.css';
import { useAuth } from '../authContext';
import UserSettings from '../Cards/userSettings';
import { Popover } from 'flowbite-react';
import AdminNavbar from './adminNavbar';
import DeleteConfirmation from '../sidebar/Admin/adminComponents/DeleteComponent/DeleteConfirmation';

const Navbar = () => { 
    const {isLoggedIn,logout,user,userRole} = useAuth();
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const [popupLogoutConfirmation,setPopupLogoutConfirmation]=useState(false);

    const LogUserOut =()=>{
        logout();
        setPopupLogoutConfirmation(false);
        setIsPopoverOpen(false);
    } 
    
    const cancel =()=>{
        setPopupLogoutConfirmation(false); 
    }
    const handleClickUserIcon = () => {
        if (isLoggedIn) {
            setIsPopoverOpen(true);
        }
    };

 
    return (
        <>
        <div className='navbar'>
            {userRole!=="admin" && (
                <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src={logo} className="h-32 border border-gray-300 rounded-md p-1 companyLogo" alt="Company Logo" />
                    <span className="self-center text-3xl font-semibold whitespace-nowrap dark:text-white">Nepa Atheletics</span>
                </div>  
    
    
               
               { !isLoggedIn ?(
                    <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    <div className='LoginButton notLoggedIn'>
                    <Link to='/login'><button type="button" class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Log In</button></Link>
                    <Link to='/register' className='register_button'><button type="button" class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Sign up</button></Link>
                    </div>  
                        <button data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
                            <span className="sr-only">Open main menu</span> 
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
                            </svg>
                        </button>
                    </div> ):(
                    <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    <div className='LoginButton'>
                    <div className="isLoggedIn" style={{position:'fixed'}}>
                        <button onClick={setPopupLogoutConfirmation} className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Logout</button>
                    </div>
                    </div>
                    </div>)
                    }
               
                
{/* 
                   <form class="max-w-md mx-auto searchBar">   
                        <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                        <div class="relative">
                            <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                </svg>
                            </div>
                            <input type="search" id="default-search" class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search products here..." required />
                            <button type="submit" class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                        </div>
                    </form> */}

                </div>
    
                </nav>
            )}
              
        <div className='userField' >
        
            <Popover
            isOpen={isPopoverOpen}
            position={'top'} // preferred position
            padding={10} // space between popover and target
            onClickOutside={()=>setIsPopoverOpen(false)}
            content = {isPopoverOpen && < UserSettings close={() => setIsPopoverOpen(false)} popupLogoutConfirmation={()=>{setPopupLogoutConfirmation(true)}} />}
             >
                <img  src={UserIcon} className="userIcon" alt="User Icon" onClick={handleClickUserIcon} style={{cursor:'pointer'}}/>
            </Popover>
         
        {user && (<p className='userName'>{user.username}</p>)}
        
        
        </div>
        </div>

        {userRole==="admin" && ( 
            <AdminNavbar />
        )}
        {popupLogoutConfirmation && (
            < DeleteConfirmation text='Are you sure to logout?' handleDelete={LogUserOut} handleClose={cancel} />
        )}
        </>
    );
}

export default Navbar;
