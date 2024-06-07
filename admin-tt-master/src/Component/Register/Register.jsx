import React, { useState } from 'react';
import axios from 'axios';
import './Register.css';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState({});
  const navigate = useNavigate();

  const [showRequirements, setShowRequirements] = useState({});

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    return password.length > 8;
  };

  const validateMobile = (mobile) => {
    const regex = /^0\d{9}$/;
    return regex.test(mobile);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleMobileChange = (e) => {
    setMobile(e.target.value);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleRegister = (e) => {
    e.preventDefault();

    let validationErrors = {};

    if (!validateEmail(email)) {
      validationErrors.email = 'Email không hợp lệ. Ví dụ: example@example.com';
    }

    if (!validatePassword(password)) {
      validationErrors.password = 'Mật khẩu phải dài hơn 8 ký tự';
    }

    if (!validateMobile(mobile)) {
      validationErrors.mobile = 'Số điện thoại phải bắt đầu bằng số 0 và có đúng 10 chữ số';
    }

    if (Object.keys(validationErrors).length > 0) {
      setError(validationErrors);
      return;
    }

    setError({});

    axios
      .post('http://localhost:5000/api/v1/auth/register', {
        email,
        password,
        name,
        mobile,
        address,
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.err === 0) {
          alert('Đăng ký thành công!');
          navigate('/');
        } else {
          alert(response.data.mess);
        }
      })
      .catch((error) => {
        console.error('Đã xảy ra lỗi khi đăng ký', error);
        alert('Đã xảy ra lỗi khi đăng ký. Vui lòng thử lại sau.');
      });
  };

  const handleFocus = (field) => {
    setShowRequirements({ ...showRequirements, [field]: true });
  };

  const handleBlur = (field) => {
    setShowRequirements({ ...showRequirements, [field]: false });
  };

  return (
    <div className="register">
      <div className="register-container">
        <form className="register__form" onSubmit={handleRegister}>
          <h1 className="register__form__title">Đăng ký</h1>
          <div className="register__form__field">
            <label className="register__form__label">Email</label>
            <input
              name="email"
              type="text"
              placeholder="Email"
              className="register__form__input"
              onChange={handleEmailChange}
              onFocus={() => handleFocus('email')}
              onBlur={() => handleBlur('email')}
              value={email}
              required
            />
            {showRequirements.email && <p style={{ color: 'blue' }}>Email phải hợp lệ. Ví dụ: example@example.com</p>}
            {error.email && <p style={{ color: 'red' }}>{error.email}</p>}
          </div>
          <div className="register__form__field">
            <label className="register__form__label">Mật khẩu</label>
            <input
              name="password"
              type="password"
              placeholder="Password"
              className="register__form__input"
              onChange={handlePasswordChange}
              onFocus={() => handleFocus('password')}
              onBlur={() => handleBlur('password')}
              value={password}
              required
            />
            {showRequirements.password && <p style={{ color: 'blue' }}>Mật khẩu phải dài hơn 8 ký tự</p>}
            {error.password && <p style={{ color: 'red' }}>{error.password}</p>}
          </div>
          <div className="register__form__field">
            <label className="register__form__label">Họ và tên</label>
            <input
              name="name"
              type="text"
              placeholder="Name"
              required
              className="register__form__input"
              onChange={handleNameChange}
              value={name}
            />
          </div>
          <div className="register__form__field">
            <label className="register__form__label">Số điện thoại</label>
            <input
              name="phone"
              type="tel"
              placeholder="Phone"
              className="register__form__input"
              onChange={handleMobileChange}
              onFocus={() => handleFocus('phone')}
              onBlur={() => handleBlur('phone')}
              value={mobile}
              required
            />
            {showRequirements.phone && (
              <p style={{ color: 'blue' }}>Số điện thoại phải bắt đầu bằng số 0 và có đúng 10 chữ số</p>
            )}
            {error.mobile && <p style={{ color: 'red' }}>{error.mobile}</p>}
          </div>
          <div className="register__form__field">
            <label className="register__form__label">Địa chỉ</label>
            <input
              name="address"
              type="text"
              placeholder="Address"
              required
              className="register__form__input"
              onChange={handleAddressChange}
              value={address}
            />
          </div>
          {Object.keys(error).length > 0 && (
            <div style={{ color: 'red' }}>
              {Object.values(error).map((err, index) => (
                <p key={index}>{err}</p>
              ))}
            </div>
          )}
          <div className="register__btn__submit">
            <button type="submit" className="register__form__submit">
              Đăng ký
            </button>
          </div>
          <div className="from__login">
            <p className="register__form__text-register">
              Bạn đã có tài khoản?
              <Link to="/login" className="register__form__register">
                Đăng nhập
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
