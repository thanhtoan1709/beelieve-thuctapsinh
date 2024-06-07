import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logOut } from '../../../store/actions';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './AdminSidebar.css';

const AdminSideBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [openMenu, setOpenMenu] = useState('');

  const handleLogout = () => {
    dispatch(logOut());
    navigate('/', { replace: true });
  };

  const handleMenuToggle = (menuName) => {
    setOpenMenu(openMenu === menuName ? '' : menuName);
  };

  return (
    <div className="flex-shrink-0 p-3" style={{ height: '954px', width: '300px', border: '1px solid' }}>
      <a href="/admin" className="d-flex align-items-center pb-3 mb-3 link-body-emphasis text-decoration-none border-bottom">
        <svg className="bi pe-none me-2" width="30" height="24"></svg>
        <span className="fs-5 fw-semibold">Dashboard</span>
      </a>
      <ul className="list-unstyled ps-0">
        <li className="mb-1">
          <button
            className="btn btn-toggle d-inline-flex align-items-center rounded border-0 fw-semibold"
            onClick={() => handleMenuToggle('tuvan')}
            aria-expanded={openMenu === 'tuvan'}
          >
            Tư vấn ăn mặc
          </button>
          <div className={`collapse ${openMenu === 'tuvan' ? 'show' : ''}`} id="tuvan-collapse">
            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
              <li><Link to="/admin/userlist" className="link-body-emphasis d-inline-flex text-decoration-none rounded">Quản lý tài khoản</Link></li>
              <li><a href="#" className="link-body-emphasis d-inline-flex text-decoration-none rounded">Quản lý outfits</a></li>
              <li><Link to="/admin/productlist" className="link-body-emphasis d-inline-flex text-decoration-none rounded">Quản lý sản phẩm</Link></li>
            </ul>
          </div>
        </li>
        <li className="mb-1">
          <button
            className="btn btn-toggle d-inline-flex align-items-center rounded border-0 fw-semibold"
            onClick={() => handleMenuToggle('hoadon')}
            aria-expanded={openMenu === 'hoadon'}
          >
            Hóa đơn
          </button>
          <div className={`collapse ${openMenu === 'hoadon' ? 'show' : ''}`} id="hoadon-collapse">
            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
              <li><a href="#" className="link-body-emphasis d-inline-flex text-decoration-none rounded">Quản lý hóa đơn</a></li>
              <li><a href="#" className="link-body-emphasis d-inline-flex text-decoration-none rounded">Quản lý chi tiết hóa đơn</a></li>
            </ul>
          </div>
        </li>
        <li className="mb-1">
          <button
            className="btn btn-toggle d-inline-flex align-items-center rounded border-0 fw-semibold"
            onClick={() => handleMenuToggle('nhanvien')}
            aria-expanded={openMenu === 'nhanvien'}
          >
            Quản lý nhân viên
          </button>
          <div className={`collapse ${openMenu === 'nhanvien' ? 'show' : ''}`} id="nhanvien-collapse">
            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
              <li><a href="#" className="link-body-emphasis d-inline-flex text-decoration-none rounded">Thêm nhân viên</a></li>
              <li><a href="#" className="link-body-emphasis d-inline-flex text-decoration-none rounded">Sửa nhân viên</a></li>
              <li><a href="#" className="link-body-emphasis d-inline-flex text-decoration-none rounded">Xóa nhân viên</a></li>
            </ul>
          </div>
        </li>
        <li className="mb-1">
          <button
            className="btn btn-toggle d-inline-flex align-items-center rounded border-0 fw-semibold"
            onClick={() => handleMenuToggle('supplier')}
            aria-expanded={openMenu === 'supplier'}
          >
            Quản lý nhà cung cấp
          </button>
          <div className={`collapse ${openMenu === 'supplier' ? 'show' : ''}`} id="supplier-collapse">
            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
              <li><a href="#" className="link-body-emphasis d-inline-flex text-decoration-none rounded">Thêm nhà cung cấp</a></li>
              <li><a href="#" className="link-body-emphasis d-inline-flex text-decoration-none rounded">Sửa nhà cung cấp</a></li>
              <li><a href="#" className="link-body-emphasis d-inline-flex text-decoration-none rounded">Xóa nhà cung cấp</a></li>
            </ul>
          </div>
        </li>
        <li className="border-top my-3"></li>
        <li className="mb-1">
          <button
            className="btn btn-toggle d-inline-flex align-items-center rounded border-0 fw-semibold"
            onClick={() => handleMenuToggle('account')}
            aria-expanded={openMenu === 'account'}
          >
            Account
          </button>
          <div className={`collapse ${openMenu === 'account' ? 'show' : ''}`} id="account-collapse">
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
  );
};

export default AdminSideBar;
