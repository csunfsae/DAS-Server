import React from 'react';
import { GoogleLogout } from 'react-google-login';
import { useHistory } from 'react-router-dom'

function Logout() {
  const history = useHistory();

  const onSuccess = async () => {
    const res = await fetch(`http://localhost:4000/api/v1/auth/google/logout`, {
      method: "Get",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json"
      }
    })
    const status = res.status;
    if (status === 200) {
      history.push("/");
    } else {
      alert("User was not logged out.  Please try again.")
    }
  };

  return (
    <div>
      <GoogleLogout
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
        buttonText="Logout"
        onLogoutSuccess={onSuccess}
        isSignedIn={false}
      ></GoogleLogout>
    </div>
  );
}

export default Logout;