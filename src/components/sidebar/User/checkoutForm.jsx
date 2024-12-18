import React, { useState } from 'react';
import './user.css';



const CheckoutForm = ({confirm}) => {
    const [form, setForm] = useState({
        name: '',
        email: '',
        address: '',
        contact: '', 
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
      };
    
      const handleSubmit = () => {
        confirm();
      };
    
      return (
        <div className="checkout-form-container">
          <form onSubmit={handleSubmit} className="checkout-form">
            <h2>Checkout</h2>
            <div className="input-group">
              <label>Name</label>
              <input type="text" name="name" value={form.name} onChange={handleChange} required />
            </div>
            <div className="input-group">
              <label>Email</label>
              <input type="email" name="email" value={form.email} onChange={handleChange} required />
            </div>
            <div className="input-group">
              <label>Address</label>
              <input type="text" name="address" value={form.address} onChange={handleChange} required />
            </div>
            <div className="inline-group">
              <div className="input-group">
                <label>Phone Number</label>
                <input type="number" name="contact" value={form.contact} onChange={handleChange} required />
              </div>
            </div>
            <button type="submit" className="checkout-button">Submit Payment</button>
          </form>
        </div>
      );
    };

export default CheckoutForm;
