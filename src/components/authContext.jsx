import React, {useState, useContext, createContext, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [isLoggedIn,setIsLoggedIn]=useState(false);
    const [isCardVisible,setIsCardVisible] = useState(false);
    const [token,setToken] = useState(null);
    const [userRole,setUserRole] = useState(null);
    const [categories, setCategories] = useState(null);
    const [subCategories,setSubCategories] = useState(null);
    const [product,setProduct] = useState(null);
    const [subCategoryName,setSubCategoryName] =useState();
    const [responseData,setResponseData]=useState();
    const [adminTitle, setAdminTitle] = useState('Admin Dashboard');
    const [addedToCart,setAddedToCart]=useState([]);
    const [orders,setOrders] = useState([]);
    const [selectedProducts,setSelectedProducts] = useState([]);
    const [allProducts,setAllProducts] = useState([]);
    
 
    
    const tkn = localStorage.getItem('token');
    const authorizationHeader={
        'Authorization': `Bearer ${tkn}`,  
        'Content-Type': 'application/json'
    }
   
      
    const usingAxios = async(URL, method, data=null) => {
        try{ 
            const config = {
                headers: authorizationHeader,
            };

             // Only add `data` for non-GET requests
            const response = method === "get" 
                            ? await axios[method](URL, config)
                            : ((method==="post" || method==="put" || method==="patch") ? await axios[method](URL,data,config):
                                                 (await axios[method](URL,{...config,data,})));  // For delete

            return response.data;
        }catch(error){
                console.log('Error using API : '+error.message);
                if (error.response) {
                    console.error('API Response Error:', error.response.data); // Logs response error details
                }
                return null;
            } 
    } 

    const fetchAllProductsFromDb = async() => {
        const allPdcts = await usingAxios('https://localhost:7106/api/Categories/get_all_products',"get");
        setAllProducts(allPdcts); 
    }

    const fetchOrderFromDB = async() =>{
        if(user?.username){
            const idsAddedToDB = await usingAxios(`https://localhost:7106/api/UserOrders/itemsAddedToCart/${user.username}`,"get");
            const ordersFromDB = await usingAxios(`https://localhost:7106/api/UserOrders/getOrderByUsername/${user.username}`,"get");
            const ids = idsAddedToDB.map(row=>row.productId);
            setAddedToCart(ids);
            setOrders(ordersFromDB);    
        }
    }  

    const navigate = useNavigate();

     useEffect(() => {
        fetchAllProductsFromDb();
        const browserToken = localStorage.getItem('token');
        const role = localStorage.getItem('role');

        
        if(browserToken){
            setToken(browserToken);
            setIsLoggedIn(true);
            setUserRole(role);
        } else{
            setToken(null);
            setIsLoggedIn(false);
        }
        try{
           fetchUserProfile(browserToken);
            } catch(error){
                console.log('Error fetching user data from token : '+error.message);
            }
         }, []);

    //converting names into pascal case:
    const toPascalCase = (str) => {
        if (!str) return ''; // Return an empty string if str is undefined or null
        return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
    };
    
    //Method to get information about category/products record row by based on tablename and id
    const fetchCategoryName = async(id,tableName) => {
        const token = localStorage.getItem('token');
        try {
            var response = await axios.get(`https://localhost:7106/api/Categories/${tableName}/${id}`,
                {
                    headers:{
                        'Authorization': `Bearer ${token}`,  
                        'Content-Type': 'application/json'
                    }
                }
            ); 
            setResponseData(response.data);
        } catch (error) {
            console.log(error.message);
        }
    }
 
 //This method data to sets user state by fetching details from token
    const fetchUserProfile = async (token) => {                
        try {
         const response = await axios.get('https://localhost:7106/api/Users/userprofile',{
             headers:{
                 'Authorization': `Bearer ${token}`,  
                 'Content-Type': 'application/json'
             }
         }
        );
         const userData = response.data.user[0];
         setUser(userData);

     } catch (error) {
         console.log('Error Occured while fetching user profile : '+error);
     }
 } 
     

    const login = (token,role) => {
        localStorage.setItem('token',token);
        localStorage.setItem('role',role);
        setUserRole(role); 
        setIsLoggedIn(true);
        fetchUserProfile(token);
        {role==="admin"? navigate('/adminDashboard'):navigate('/');}
        
    }
    const logout = () => { 
        setIsLoggedIn(false);
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('Admin_Title');
        sessionStorage.removeItem('idsAddedToCart');
        sessionStorage.removeItem('orders');
        setToken(null);
        setUser(null);
        setUserRole(null);
        navigate('/'); 
        setIsCardVisible(false);     
        
    } 
 
   
    return (
        <AuthContext.Provider value={{allProducts,fetchOrderFromDB,usingAxios,selectedProducts,setSelectedProducts,orders,setOrders,addedToCart,setAddedToCart,authorizationHeader,adminTitle,setAdminTitle,responseData,fetchCategoryName,subCategoryName,setSubCategoryName,product,setProduct,subCategories,setSubCategories,categories,setCategories,isLoggedIn,login,logout,user,isCardVisible,setIsCardVisible,token,setToken,userRole,setUserRole,toPascalCase}}>
        {children}
        </AuthContext.Provider>
    );
}
export const useAuth = () => useContext(AuthContext);