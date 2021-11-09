function Login() {
    const onSuccess = async googleData => {
        console.log('Login Success: currentUser:', googleData.profileObj);
        const res = await fetch("http://localhost:4000/api/v1/auth/google", {
            method: "POST",
            body: JSON.stringify({
                tokenId: googleData.tokenId,
                googleId: googleData.profileObj.googleId,
                firstName: googleData.profileObj.givenName,
                lastName: googleData.profileObj.familyName,
                email: googleData.profileObj.email,
                image: googleData.profileObj.image
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const data = await res.json()
        // store returned user somehow
    };
}

export default Login;