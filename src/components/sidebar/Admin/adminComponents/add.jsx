import React from 'react';
import '../admin.css';
import { useLocation } from 'react-router-dom';
import AddCategory from './AddingComponents/addCategory';

const Add = () => {
  const location = useLocation();
  const {table} = location.state || {};


    return (
        <div>
           {table==="category" && <AddCategory /> } 
           {table==="equipment" && (<h1> Add to equipment table </h1>)} 
           {table==="products" && (<h1> Add to product table </h1>)} 
        </div>
    );
}

export default Add;
