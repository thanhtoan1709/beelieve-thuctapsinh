
import React from "react";
import './Page.css'
import profilePic from '../Asset/google-logo.png'
import profilePic1 from '../Asset/facebook-logo.png'
import profilePic2 from '../Asset/smartphone-logo.png'
import profilePic3 from '../Asset/mail-logo.png'
import { Link } from "react-router-dom";
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

const Login = () => {    
    
    const login = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
          try {
            const res = await axios.get(`http://localhost:5000/api/v1/auth/google/`, {
              headers: {
                Authorization: `Bearer ${tokenResponse.accessToken}`,
              },
            });
            console.log('Login success:', res.data);
    
            // Store the token in localStorage
            localStorage.setItem('token', res.data.token);
    
            // Redirect or perform further actions
            window.location.href = '/'; // or wherever you want to redirect after login
          } catch (error) {
            console.error('Login failed:', error);
          }
        },
        onError: (error) => {
          console.error('Login failed:', error);
        },
      });

    return (
        
        <div className='container-login'>
            <div className='header-1'>
                <div className='text'><h2> Login</h2> </div>                
            </div>
            <div className='Choice'>                

                {/* <Link to="/GoogleLogin" > */}
                    <div className='signup-google' onClick={() => login()}>                    
                        <img src={profilePic} className='google-img' alt="googleicon" />
                        <div className='text'> Login with Google </div>                    
                    </div>        
                {/* </Link>             */}
                
                <div className='signup-facebook' >
                    <img src={profilePic1} className='facebook-img' alt="facebookicon" />
                    <div className='text'> Login with Facebook </div>                    
                </div>
                
                <Link to="/MobileLogin">
                    <div className='signup-mobile' >                                     
                        <img src={profilePic2} className='mobile-img' alt="mobileicon" />
                        <div className='text'> Login with Mobile Number </div>                    
                    </div>
                </Link>    
                
                <Link to="/EmailLogin">
                    <div className='signup-email' >
                        <img src={profilePic3} className='mail-img' alt="mailicon" />
                        <div className='text'> Login with Email </div>                             
                    </div>
                </Link>

                <div className="form_login">
                    <p className="register_form_text-register">
                    Bạn chưa có tài khoản?
                    <Link to="../Register"  className="register_form_register" > 
                        Đăng ký
                    </Link>
                    </p>
                </div>                                
            </div>                    
        </div>
    )
}

export default Login