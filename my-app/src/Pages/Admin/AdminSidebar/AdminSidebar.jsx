import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
import './AdminSidebar.css';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../store/actions';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Button from 'react-bootstrap/Button';
import * as Popper from "@popperjs/core"
import 'bootstrap-icons/font/bootstrap-icons.css';

const AdminSideBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // state
  const [openMenu, setOpenMenu] = useState('');

  const handleLogout = () => {
    dispatch(logOut());
    navigate('/dashboard', { replace: true });
  };

  const handleMenuToggle = (menuName) => {
    setOpenMenu(openMenu === menuName ? '' : menuName);
  };

  return (
    <>
      {/* <div className="admin-sidebar">
        <div className="admin-sidebar__user">
          <img src="/user.png" alt="user" />
          <span>Admin</span>{' '}
          {/* <div className="screen-test">
          <button onClick={() => dispath(logOut())}>Đăng xuất</button>
        </div>
          <button className="button-logout-sidebars" onClick={handleLogout}>
            Đăng xuất
          </button>
        </div>
        <div className="admin-sidebar__menu">
          <div className="admin-sidebar__menu__item">
            <Link to="/dashboard" className="admin-sidebar__menu__dashboard">
              Trang chủ
            </Link>
          </div>
          <div className="admin-sidebar__menu__item" onClick={() => handleMenuToggle('consultation')}>
            <span>Tư vấn ăn mặc</span>
            {openMenu === 'consultation' && (
              <div className="admin-sidebar__menu__sub">
                <Link to="/admin/manage-accounts" className="admin-sidebar__menu__sub__item">
                  Quản lý tài khoản
                </Link>
                <Link to="/admin/manage-outfit" className="admin-sidebar__menu__sub__item">
                  Quản lý outfit
                </Link>
                <Link to="/admin/manage-products" className="admin-sidebar__menu__sub__item">
                  Quản lý sản phẩm
                </Link>
              </div>
            )}
          </div>
          <div className="admin-sidebar__menu__item" onClick={() => handleMenuToggle('invoice')}>
            <span>Quản lý hóa đơn</span>
            {openMenu === 'invoice' && (
              <div className="admin-sidebar__menu__sub">
                <Link to="/admin/manage-invoices" className="admin-sidebar__menu__sub__item">
                  Quản lý hóa đơn
                </Link>
                <Link to="/admin/manage-invoice-details" className="admin-sidebar__menu__sub__item">
                  Quản lý chi tiết hóa đơn
                </Link>
              </div>
            )}
          </div>
          <div className="admin-sidebar__menu__item" onClick={() => handleMenuToggle('employee')}>
            <span>Quản lý nhân viên</span>
            {openMenu === 'employee' && (
              <div className="admin-sidebar__menu__sub">
                <Link to="/admin/add-employee" className="admin-sidebar__menu__sub__item">
                  Thêm nhân viên
                </Link>
                <Link to="/admin/edit-employee" className="admin-sidebar__menu__sub__item">
                  Chỉnh sửa nhân viên
                </Link>
                <Link to="/admin/delete-employee" className="admin-sidebar__menu__sub__item">
                  Xóa nhân viên
                </Link>
              </div>
            )}
          </div>
          <div className="admin-sidebar__menu__item" onClick={() => handleMenuToggle('supplier')}>
            <span>Quản lý nhà cung cấp</span>
            {openMenu === 'supplier' && (
              <div className="admin-sidebar__menu__sub">
                <Link to="/admin/add-supplier" className="admin-sidebar__menu__sub__item">
                  Thêm nhà cung cấp
                </Link>
                <Link to="/admin/edit-supplier" className="admin-sidebar__menu__sub__item">
                  Chỉnh sửa nhà cung cấp
                </Link>
                <Link to="/admin/delete-supplier" className="admin-sidebar__menu__sub__item">
                  Xóa nhà cung cấp
                </Link>
              </div>
            )}
          </div>
        </div>
      </div> */}
      <div className="flex-shrink-0 p-3 " style={{height: "954px",width: "300px", border: "1px solid "}}>
    <a href="/admin" className="d-flex align-items-center pb-3 mb-3 link-body-emphasis text-decoration-none border-bottom">
      <svg className="bi pe-none me-2" width="30" height="24"></svg>
      <span className="fs-5 fw-semibold">Dashboard</span>
    </a>
    <ul className="list-unstyled ps-0">
      <li className="mb-1">
        <button className="btn btn-toggle d-inline-flex align-items-center rounded border-0 fw-semibold collapsed " data-bs-toggle="collapse" data-bs-target="#tuvan-collapse" aria-expanded="false" >
        Tư vấn ăn mặc
        </button>
        <div className="collapse" id="tuvan-collapse">
          <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
            <li><a href="#" className=" link-body-emphasis d-inline-flex text-decoration-none rounded">Quản lý tài khoản</a></li>
            <li><a href="#" className="link-body-emphasis d-inline-flex text-decoration-none rounded">Quản lý outfits</a></li>
            <li><a href="#" className="link-body-emphasis d-inline-flex text-decoration-none rounded">Quản lý sản phẩm</a></li>
          </ul>
        </div>
      </li>
      <li className="mb-1">
        <button className="btn btn-toggle d-inline-flex align-items-center rounded border-0 fw-semibold collapsed" data-bs-toggle="collapse" data-bs-target="#hoadon-collapse" aria-expanded="false">
          Hóa đơn
        </button>
        <div className="collapse" id="hoadon-collapse">
          <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
            <li><a href="#" className="link-body-emphasis d-inline-flex text-decoration-none rounded">Quản lý hóa đơn</a></li>
            <li><a href="#" className="link-body-emphasis d-inline-flex text-decoration-none rounded">Quản lý chi tiết hóa đơn</a></li>
          </ul>
        </div>
      </li>
      <li className="mb-1">
        <button className="btn btn-toggle d-inline-flex align-items-center rounded border-0 fw-semibold collapsed" data-bs-toggle="collapse" data-bs-target="#nhanvien-collapse" aria-expanded="false">
          Quản lý nhân viên
        </button>
        <div className="collapse" id="nhanvien-collapse">
          <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
            <li><a href="#" className="link-body-emphasis d-inline-flex text-decoration-none rounded">Thêm nhân viên</a></li>
            <li><a href="#" className="link-body-emphasis d-inline-flex text-decoration-none rounded">Sửa nhân viên</a></li>
            <li><a href="#" className="link-body-emphasis d-inline-flex text-decoration-none rounded">Xóa nhân viên</a></li>
          
          </ul>
        </div>
      </li>
      <li className="mb-1">
        <button className="btn btn-toggle d-inline-flex align-items-center rounded border-0 fw-semibold collapsed" data-bs-toggle="collapse" data-bs-target="#supplier-collapse" aria-expanded="false">
          Quản lý nhà cung cấp
        </button>
        <div className="collapse" id="supplier-collapse">
          <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
            <li><a href="#" className="link-body-emphasis d-inline-flex text-decoration-none rounded">Thêm nhà cung cấp</a></li>
            <li><a href="#" className="link-body-emphasis d-inline-flex text-decoration-none rounded">Sửa nhà cung cấp</a></li>
            <li><a href="#" className="link-body-emphasis d-inline-flex text-decoration-none rounded">Xóa nhà cung cấp</a></li>            
          </ul>
        </div>
      </li>
      <li className="border-top my-3"></li>
      <li className="mb-1">
        <button className="btn btn-toggle d-inline-flex align-items-center rounded border-0 fw-semibold collapsed" data-bs-toggle="collapse" data-bs-target="#account-collapse" aria-expanded="false">
          Account
        </button>
        <div className="collapse" id="account-collapse">
          <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
            <li><a href="#" className="link-body-emphasis d-inline-flex text-decoration-none rounded">New...</a></li>
            <li><a href="#" className="link-body-emphasis d-inline-flex text-decoration-none rounded">Profile</a></li>
            <li><a href="#" className="link-body-emphasis d-inline-flex text-decoration-none rounded">Settings</a></li>
            <li><a href="#" className="link-body-emphasis d-inline-flex text-decoration-none rounded" onClick={handleLogout}>Sign out</a></li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
  </>
  );
};

export default AdminSideBar;