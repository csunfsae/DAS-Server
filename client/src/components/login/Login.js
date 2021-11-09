import React from 'react';
import { GoogleLogin } from 'react-google-login';

function Login() {
  const onSuccess = async googleData => {
    const res = await fetch(`http://localhost:4000/api/v1/auth/google/user?tokenId=${encodeURIComponent(googleData.tokenId)}`, {
      method: "Get",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json"
      }
    })
    if (res.status === 200) {
      window.location.reload(true);
    } else {
      alert("User not found. Please sign up or try a different user.")
    }
  };

  const onFailure = (res) => {
    alert("Google authentication failed.", res)
  };

  return (
    <div>
      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
        buttonText="Login"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
        style={{ marginTop: '100px' }}
        isSignedIn={true}
      />
    </div>
  );
}

export default Login;