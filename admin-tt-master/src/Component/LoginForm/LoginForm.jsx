/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import './LoginForm.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import logoBanner from './asset/bg-logo-banner.jpg';
import { useDispatch } from 'react-redux';
import { loginSubmit } from '../store/actions';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handelGoogle = () => {
    window.open('http://localhost:5000/api/v1/auth/google', '_self');
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Gọi action creator loginSubmit từ Redux store để xử lý đăng nhập
    try {
      await dispatch(loginSubmit(email, password));
      // Nếu đăng nhập thành công, điều hướng đến trang dashboard
      navigate('/admin');
    } catch (error) {
      // Xử lý lỗi nếu có
      alert('Không tìm thấy người dùng');
      console.error('Đăng nhập không thành công:', error);
    }
  };
  return (
    <>
      <div className="container-fluid vh-100 d-flex justify-content-center align-items-center">
        <div className="row w-100 m-0">
          <div className="col d-flex justify-content-center align-items-center">
            <div className="Logo-banner-login text-center p-4">
              <img src={logoBanner} alt="bg-login" className="img-fluid" />
              <div className="Footer-Div d-flex mt-3 justify-content-center">
                <span className="text">Don't have an account?</span>
                <Link to="/register">
                  <button className="btn btn-success ms-2">Sign Up</button>
                </Link>
              </div>
            </div>
          </div>
          <div className="col border border-2 border-primary d-flex justify-content-center align-items-center ">
            <div className="loginform-rememberpas p-4">
              <form onSubmit={handleSubmit}>
                <h1 className="text-center">Login</h1>
                <div className="input-box mb-3">
                  <input
                    type="email"
                    name="email"
                    id="id-email"
                    placeholder="Email"
                    value={email}
                    onChange={handleEmailChange}
                    required
                    autoComplete="current-email"
                    className="form-control"
                  />
                </div>
                <div className="input-box mb-3">
                  <input
                    type="password"
                    name="password"
                    id="id-password"
                    placeholder="Password"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                    autoComplete="current-password"
                    className="form-control"
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Login
                </button>
              </form>
              <div className="remember-forgot d-flex justify-content-between mt-2">
                <label htmlFor="remember">
                  <input type="checkbox" id="remember" className="me-2" />
                  Remember me
                </label>
                <a href="#">Forgot password</a>
              </div>
              <div className="label-hoac text-center mt-3">hoặc</div>
              <div className="button-method-loggin d-flex flex-column justify-content-center align-items-center mt-3">
                <button className="btn btn-outline-danger w-100 mb-2" onClick={handelGoogle}>
                  Google
                </button>
                <button className="btn btn-outline-dark w-100 mb-2">X</button>
                <button className="btn btn-outline-primary w-100">Facebook</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginForm;
