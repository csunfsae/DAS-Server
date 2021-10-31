import React, { useContext } from 'react';
import AuthContext from '../../store/auth-context'
import { GoogleLogin } from 'react-google-login';

const clientId = '345612164466-j2pnr9ubb95nhvgrjl5lutuoejmdi83n.apps.googleusercontent.com'

function Login() {
  const authCtx = useContext(AuthContext);

  const onSuccess = async googleData => {
    const res = await fetch(`http://localhost:4000/api/v1/auth/google/user?tokenId=${encodeURIComponent(googleData.tokenId)}`, {
      method: "Get",
      headers: {
        "Content-Type": "application/json"
      }
    })
    const status = res.status;
    if (status == 200) {
      authCtx.login(googleData.tokenId);
    } else {
      authCtx.login(null);
      alert("User not found. Please sign up or try a different user.")
    }
  };

  const onFailure = (res) => {
    alert("Google authentication failed.", res)
  };

  return (
    <div>
      <GoogleLogin
        clientId={clientId}
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