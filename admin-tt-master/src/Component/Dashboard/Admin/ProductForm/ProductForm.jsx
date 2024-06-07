import React, { useState } from 'react';
import axios from 'axios';
import AdminSideBar from '../AdminSidebar/AdminSidebar';
import { Link } from 'react-router-dom';
import './UserForm.css';

const ProductForm = ({ user, onSave }) => {
    const [formData, setFormData] = useState({
        id: user ? user.id : '',
        name: user ? user.name : '',
        email: user ? user.email : '',
        address: user ? user.address : '',
        mobile: user ? user.mobile : '',
        // typeLogin: user ? user.typeLogin : ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (user) {
                // Update user
                const response = await axios.put(`http://localhost:5000/api/v1/auth/register/${user.id}`, formData);
                onSave(response.data);
                console.log(user);
            } else {
                // Add user
                const response = await axios.post('http://localhost:5000/api/v1/auth/register', formData);
                onSave(response.data);
                console.log(user);
            }
        } catch (error) {
            console.error("There was an error saving the user!", error);
        }
    };

    return (        
        <div>
        <form className="user-form" onSubmit={handleSubmit}>
            <h2 style={{color: "black"}}>New User</h2>
            <div className="form-group">
                <label>Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label>Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label>Address</label>
                <input type="text" name="address" value={formData.address} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label>Mobile</label>
                <input type="text" name="mobile" value={formData.mobile} onChange={handleChange} />
            </div>
            {/* <div className="form-group">
                <label>Type Login</label>
                <input type="text" name="typeLogin" value={formData.typeLogin} onChange={handleChange} />
            </div> */}
            <button type="submit" className="btn btn-primary">Save</button>
            <Link to="/admin/getalluser"><button className="btn btn-primary">Back</button></Link>
        </form>
        </div>                  
    );
};

export default ProductForm;
