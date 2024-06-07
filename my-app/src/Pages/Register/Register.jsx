import React, { useState } from "react";
import axios from 'axios';
import "./Register.css";
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    mobile: '',
    address: ''
  });
  const [error, setError] = useState({});
  const navigate = useNavigate(); 
  const [showRequirements, setShowRequirements] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (password) => password.length > 8;
  const validateMobile = (mobile) => /^0\d{9}$/.test(mobile);

  const handleRegister = async (e) => {
    e.preventDefault();

    const { email, password, name, mobile, address } = formData;
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

    try {
      const response = await axios.post('http://localhost:5000/api/v1/auth/register', {
        email,
        password,
        name,
        mobile,
        address,
      });
      console.log(response.data);
      if (response.data.err === 0) {
        alert('Đăng ký thành công!');
        navigate('/login');
      } else {
        alert(response.data.mess);
      }
    } catch (error) {
      if (error.response) {
        console.error('Đã xảy ra lỗi khi đăng ký:', error.response.data);
        alert(`Đã xảy ra lỗi khi đăng ký: ${error.response.data.message || error.response.data}`);
      } else if (error.request) {
        console.error('Không nhận được phản hồi từ server:', error.request);
        alert('Không nhận được phản hồi từ server. Vui lòng thử lại sau.');
      } else {
        console.error('Lỗi khi tạo yêu cầu:', error.message);
        alert('Lỗi khi tạo yêu cầu. Vui lòng thử lại sau.');
      }
    }
  };
      
  const handleFocus = (field) => setShowRequirements({ ...showRequirements, [field]: true });
  const handleBlur = (field) => setShowRequirements({ ...showRequirements, [field]: false });

  return (
    <div className="register">
      <div className="register-container">
        <form className="register__form" onSubmit={handleRegister}>
          <h1 className="register__form__title">Đăng ký</h1>
          {['email', 'password', 'name', 'mobile', 'address'].map((field, index) => (
            <div className="register__form__field" key={index}>
              <label className="register__form__label">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
              <input
                name={field}
                type={field === 'password' ? 'password' : 'text'}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                className="register__form__input"
                onChange={handleChange}
                onFocus={() => handleFocus(field)}
                onBlur={() => handleBlur(field)}
                value={formData[field]}
                required
              />
              {showRequirements[field] && (
                <p style={{ color: 'blue' }}>
                  {field === 'email' && 'Email phải hợp lệ. Ví dụ: example@example.com'}
                  {field === 'password' && 'Mật khẩu phải dài hơn 8 ký tự'}
                  {field === 'mobile' && 'Số điện thoại phải bắt đầu bằng số 0 và có đúng 10 chữ số'}
                </p>
              )}
              {error[field] && <p style={{ color: 'red' }}>{error[field]}</p>}
            </div>
          ))}
          {error.general && <p style={{ color: 'red' }}>{error.general}</p>}
          <div className="register__btn__submit">
            <button type="submit" className="register__form__submit">Đăng ký</button>
          </div>
          <div className="from__login">
            <p className="register__form__text-register">
              Bạn đã có tài khoản?
              <Link to="/login" className="register__form__register"> Đăng nhập</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
