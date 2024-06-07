
import React from "react";
import AdminSidebar from "./AdminSidebar/AdminSidebar";
import { Outlet } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const Admin = () => {
    return (        
        <div className="container-fluid">
            <div className="row">
                <div className="col-2 px-1 position-fixed" id="sticky-sidebar">
                    <AdminSidebar />
                </div>
                <div className="col text-bg-dark offset-2" id="main">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Admin