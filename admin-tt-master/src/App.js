import './App.css';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginForm from './Component/LoginForm/LoginForm';
import LoginSuccess from './Component/LoginForm/LoginSuccess';
import Dashboard from './Component/Dashboard/Dashboard';
import Register from './Component/Register/Register';
import Admin from './Component/Dashboard/Admin/Admin';
import UserList from  './Component/Dashboard/Admin/UserList/UserList'
import UserForm from './Component/Dashboard/Admin/UserForm/UserForm';
import ProductList from "./Component/Dashboard/Admin/ProductList/ProductList"
import AdminSidebar from "./Component/Dashboard/Admin/AdminSidebar/AdminSidebar"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';



function App() {
  return (    
    <div>     
     <Routes>
            <Route path="/" element={<LoginForm />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login-success" element={<LoginSuccess />} />
            <Route path="/login-success/:userID" element={<LoginSuccess />} />
            <Route path="/admin/*" element={<Admin />}>
              <Route path="userlist" element={<UserList />} />
              <Route path="productlist" element={<ProductList />} />                                         
              <Route path="userform" element={<UserForm />} />
            </Route>
        </Routes>               
         
    </div>
  );
}

export default App;
