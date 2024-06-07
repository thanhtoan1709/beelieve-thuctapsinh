// import React from 'react';
// import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';
// import axios from 'axios';
// import './Page.css'

// const GoogleLoginComponent = () => {
//     const GOOGLE_CLIENT_ID="1080539088484-27r7uupsmlpnaptei93rhi487sgr8f0n.apps.googleusercontent.com"

//   const handleLoginSuccess = (response) => {
//     console.log(response);
//     axios
//       .post('http://localhost:5000/api/v1/auth/google/callback', {
//         token: response.credential,
//       })
//       .then((res) => {
//         console.log('Login success:', res.data);
//         // Handle successful login here (e.g., store token, redirect, etc.)
//       })
//       .catch((error) => {
//         console.error('Login failed:', error);
//         // Handle login failure here
//       });
//   };

//   const handleLoginFailure = (error) => {
//     console.error('Login failed:', error);
//   };

//   return (
//     <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        
//       <h2>Login with Google</h2>
//       <GoogleLogin
//         onSuccess={handleLoginSuccess}
//         onFailure={handleLoginFailure}
//       />
//     </GoogleOAuthProvider>
//   );
// };

// export default GoogleLoginComponent;

import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

const GoogleLoginComponent = () => {
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const res = await axios.get(`http://localhost:5000/api/v1/auth/google/callback`, {
          headers: {
            Authorization: `Bearer ${tokenResponse.accessToken}`,
          },
        });
        console.log('Login success:', res.data);

        // Store the token in localStorage
        localStorage.setItem('token', res.data.token);

        // Redirect or perform further actions
        window.location.href = '/dashboard'; // or wherever you want to redirect after login
      } catch (error) {
        console.error('Login failed:', error);
      }
    },
    onError: (error) => {
      console.error('Login failed:', error);
    },
  });

  return (
    <div onClick={() => login()} style={{ cursor: 'pointer', padding: '10px', background: '#4285F4', color: 'white', borderRadius: '5px' }}>
      Login with Google
    </div>
  );
};

export default GoogleLoginComponent;