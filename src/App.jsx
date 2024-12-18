import React from 'react';
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Navbar from './components/Navbar/navbar';
import Login from './components/Login/login';
import Register from './components/Register/register';
import { AuthProvider } from './components/authContext';
import ChangePassword from './components/changePassword';
import Sidebar from './components/sidebar/sidebar';
import AdminProfile from './components/sidebar/Admin/adminProfile';
import Users from './components/sidebar/Admin/users';
import Products from './components/sidebar/Admin/products';
import EquipmentTable from './components/sidebar/Admin/adminComponents/equipmentTable';
import Items from './components/sidebar/Admin/adminComponents/items';
import Add from './components/sidebar/Admin/adminComponents/add';
import './styles.css';
import UpdateCategory from './components/sidebar/Admin/adminComponents/UpdateComponents/UpdateCategory';
import AdminDashboard from './components/sidebar/Admin/adminDashboard';
import CheckoutPage from './components/sidebar/User/checkoutPage';
import ProductsDisplayPage from './components/sidebar/User/productsDisplayPage';
import Orders from './components/sidebar/Admin/orders';
import MyOrders from './components/sidebar/User/MyOrders';

function App(){
  
 return(
  <Router>
  <AuthProvider>
  
    <div>
    <CSSTransition in={true} timeout={300} classNames="fade">
        <Navbar />
    </CSSTransition>

    <CSSTransition in={true} timeout={300} classNames="fade">
          <Sidebar/> 
    </CSSTransition>

    <TransitionGroup> 
        <CSSTransition key={window.location.pathname} classNames="fade" timeout={500}>
        <Routes>
          
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/changePassword" element={<ChangePassword />} />

          <Route path='/adminDashboard' element={ <AdminDashboard/> } ></Route>
          <Route path='/adminProfile' element={<AdminProfile />} />
          <Route path='/users' element={<Users />} />
          <Route path='/products' element={<Products />} />
          <Route path='/orders' element={<Orders />} />
            <Route path='/products/add' element={<Add />} />
            <Route path='/products/update/:categoryId' element={< UpdateCategory />} />
            <Route path='/products/equipment/:categoryId/:categoryName' element={<EquipmentTable />} />
            <Route path='/products/equipment/item/:subCategoryId/:subCategoryName' element={<Items />} />
          <Route path='/myOrders' element={<MyOrders />} />

        </Routes>
        </CSSTransition>
        </TransitionGroup>
    </div>
  
  </AuthProvider>
  </Router>
 )
  
}
export default App;

