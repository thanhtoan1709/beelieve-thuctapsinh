import React from 'react';
import Navbar from './Components/Navbar/Navbar.jsx'; // Import Header component
import SidebarMenu from './Components/SidebarMenu/SidebarMenu.jsx'; // Import SidebarMenu component
import './App.css'; // Import CSS file for styling

const Layout = () => {
  return (
    <div className="">
      <Navbar />
      <SidebarMenu />
    </div>
  );
};

export default Layout;