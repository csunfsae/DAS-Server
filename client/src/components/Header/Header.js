import { useState, useContext, useEffect } from 'react';
import logo from '../../FSAE-Logo.png';
import Login from '../login/Login';
import Logout from '../login/Logout';
import AuthContext from '../../store/authContext';
import { Link } from "react-router-dom";

function Header() {

    const [isLoggedIn, setLogin] = useState(false);
    const authCtx = useContext(AuthContext);
    useEffect(() => {
        authCtx.isLoggedIn()
            .then(response =>
                setLogin(response)
            );
    }, undefined)

    return (
        <div class="topnav">
            <a class="logo" target="_blank" href="/">
                <img src={logo} alt="FSAE Logo" />
            </a>
            <div class="topnav-right">

                {!isLoggedIn && (
                    <><Login />
                        <div class="register-nav">
                            <Link to="/register">Don't have an account? <u>Register here</u></Link>
                        </div></>
                )}
                {isLoggedIn && (
                    <><a href="/live"><u>Live</u></a>
                        <a href="/history"><u>Historical</u></a>
                        <Logout /></>
                )}
            </div>
        </div>
    );
}

export default Header;