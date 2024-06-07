
import React from "react";
import './Page.css'
import { Link } from "react-router-dom";

const MobileOTP = () => {
    return (
        <div className='container-login'>                        
            <div className='notification-text'>
                <h2>We sent OTP code to</h2>
                <h2>your email, please check it.</h2>
            </div>
            <div className=''>                
                <div className='input'>
                    <input type="tel" className='input-number'/>
                </div>
            </div>            
            <div className='Login-Button-number'>Verify</div>
            <Link to="../" style={{ textDecoration: 'none' , color:"black"}}><div className='Back-Button'>Back</div></Link>      
        </div>
    )
}

export default MobileOTP