import React from 'react';
import { GoogleLogin } from 'react-google-login';
import { useHistory } from "react-router-dom";

function SignUp() {
    let history = useHistory();
    const onSuccess = async googleData => {
        const res = await fetch(`http://localhost:4000/api/v1/auth/google/newUser?tokenId=${encodeURIComponent(googleData.tokenId)}`, {
            method: "Get",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json"
            }
        })
        if (res.status === 200) {
            history.push("/user/new");
        } else {
            alert("Issue")
        }
    };

    const onFailure = (res) => {
        alert("Google authentication failed.", res)
    };

    return (
        <div>
            <GoogleLogin
                clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                buttonText="Sign Up"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                style={{ marginTop: '100px' }}
                isSignedIn={true}
            />
        </div>
    );
}

export default SignUp;