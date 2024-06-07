
import React, { useState, useContext } from "react";
import axios from 'axios';
import './Page.css'
import { Link, useNavigate } from 'react-router-dom';
import { loginService } from './authService'
// import { useAuthNavigate } from "../../AuthContext";
import { AuthContext } from "../../AuthContext";


function EmailLogin() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');    
    const { login } = useContext(AuthContext);
    // const { login } = useAuthNavigate();
    const [error, setError] = useState('');
    const navigate = useNavigate();


    // const [values, setValues] = useState({
    //     email: '',
    //     password: ''
    // })

    // const [errors,setErrors] = useState({})
    // const handleInput = (e) => {
    //     setValues(prev => ({...prev, [e.target.name]: [e.target.value]}))
    // }

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };
    
    // const handleLogin = (e) => {
    //     e.preventDefault();        

    //     // Gửi yêu cầu đăng nhập đến API
        
    //         axios
    //         .post('http://localhost:5000/api/v1/auth/login', {
    //         email: email,
    //         password: password
    //     })
    //         .then((response) => {
    //             // Xử lý phản hồi thành công    
                         
    //             console.log(response.data);
    //             if (response.data.err === 0) {
    //                 // localStorage.setItem('token', response.data['access token'])
    //                 // login(response.data.token);
    //                 login({email: data.email, name: data.name, token: data['access token'] });

    //                 // navigate('/')
    //             } else {
    //                 alert(response.data.mess)
    //                 setError(response.data.mess)            
    //             }
    //         })
    //         .catch((error) => {
    //             // Xử lý lỗi
    //             alert('that bai');
    //             console.error(error);
    //         });        
    // };

    const handleLogin = async () => {
        try {
          const data = await loginService(email, password);
    
          if (data.err === 0) {
            login({ email: data.email, token: data['access token'] });
            console.log(data)
            localStorage.setItem('token', data['access token'])                      
          } else {
            setError(data.mess);
            alert(data.mess)
          }
        } catch (error) {
          console.error('Đã xảy ra lỗi khi đăng nhập', error);
          // setError('Đã xảy ra lỗi khi đăng nhập. Vui lòng thử lại sau.');
          setError('Đã xảy ra lỗi khi đăng nhập. Vui lòng thử lại sau.');
        }
      };

    return (
        <div className='container-login'>            
            <div className='notification-text'><h2>Login With Email</h2></div>
            {/* <form action="" onSubmit={handleSubmit}> */}
            <form action="" onSubmit={(e) => e.preventDefault()}>
                <div className='mb-3'>            
                    <div>
                        <p className="email-title">Email</p>                        
                        <input 
                        type='email' 
                        className='input-text' 
                        name='email' 
                        value={email}
                        // onChange={handleEmailChange} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required/>
                        {/* {errors.email && <span className='text-danger'> {errors.email} </span>} */}
                    </div>
                    <div>
                        <p className="password-title">Password</p>
                        <input 
                        type='password' 
                        className='input-text' 
                        name='password' 
                        value={password}
                        // onChange={handlePasswordChange} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required/>   
                        {/* {errors.password && <span className='text-danger'> {errors.password} </span>} */}
                    </div>             
                </div>        
                {error && <p style={{ color: 'red' }}>{error}</p>}   
                {/* <button type="submit" className="Login-Button">Login</button> */}
                <button type="submit" className="Login-Button-number" onClick={handleLogin}>Login</button>
                <Link to="/login" style={{ textDecoration: 'none' , color:"black"}}><div className='Back-Button'>Back</div></Link>          
            </form>
        </div>
    )
}

export default EmailLogin