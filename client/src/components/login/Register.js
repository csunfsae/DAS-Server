import React from 'react';
import { GoogleLogin } from 'react-google-login';
import { useHistory } from "react-router-dom";


function Register() {
    const history = useHistory();

    const onSuccess = async googleData => {
        const res = await fetch(`http://localhost:4000/api/v1/auth/google/register?tokenId=${encodeURIComponent(googleData.tokenId)}`, {
            method: "Get",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json"
            }
        })
        if (res.status === 200) {
            history.push("/registration-success")
        } else {
            alert(await res.json().then(data => data.error));
        }
    };

    const onFailure = (res) => {
        alert("Google authentication failed.", res)
    };

    return (
        <div>
            <GoogleLogin
                clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                buttonText="Register"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                style={{ marginTop: '100px' }}
                isSignedIn={false}
            />
        </div>
    );
}

export default Register;