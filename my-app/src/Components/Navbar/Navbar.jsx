import React, { useState, useContext } from "react";
import profilePic from '../Asset/login-icon.png';
import logoImage from '../Asset/logo.webp';
import { Link } from "react-router-dom";
import DropdownMenu from "./DropdownMenu";
import { AuthContext } from "../../AuthContext";
import './Navbar.css';

const Navbar = () => {
    const [menu, setMenu] = useState("consultant");
    const { user, logout } = useContext(AuthContext);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleDropdownToggle = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <div className="nav1">
            <div>
                <Link to="/">
                    <img className="nav1-logo" src={logoImage} alt="logImg" />
                </Link>
            </div>
            <ul className="nav1-menu">
                <li onClick={() => { setMenu("consultant") }}>
                    Fashion Consultant {menu === "consultant" ? <hr /> : null}
                </li>
                <li onClick={() => { setMenu("collections") }}>
                    Collection {menu === "collections" ? <hr /> : null}
                </li>
                <li onClick={() => { setMenu("calendar") }}>
                    Calendar {menu === "calendar" ? <hr /> : null}
                </li>
            </ul>
            <div className="profile-dropdown" onClick={handleDropdownToggle}>
                <img className='prof1le-1mage' src={profilePic} alt="profile" />
                {dropdownOpen && (
                    <DropdownMenu>
                        {user ? (
                            <>
                                <Link to="/profile" className="popper-1tem">Trang cá nhân</Link>
                                <li onClick={logout} className="popper-1tem">Đăng xuất</li>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="popper-1tem">Đăng nhập</Link>
                                <Link to="/register" className="popper-1tem">Đăng ký</Link>
                            </>
                        )}
                    </DropdownMenu>
                )}
            </div>
        </div>
    );
}

export default Navbar;
