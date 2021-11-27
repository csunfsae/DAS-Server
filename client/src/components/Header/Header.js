import { useState, useContext, useEffect } from 'react';
import logo from '../../FSAE-Logo.png';
import Login from '../login/Login';
import Logout from '../login/Logout';
import AuthContext from '../../store/authContext';

function Header(){

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
            <img src={logo} class="logo" alt="FSAE Logo"/>
            <div class="topnav-right">
                <a href="/live">Live</a>
                <a href="#about">Historical</a>
                {!isLoggedIn && (
                    <Login />
                )}
                {isLoggedIn && (
                    <Logout />
                )}
            </div>
        </div>
    );
}

export default Header;