// import { useState, useContext, useEffect } from 'react';
// import Navbar from 'react-bootstrap/Navbar'
// import Nav from 'react-bootstrap/Nav'
// import logo from '../../FSAE-Logo.png';
// import { GoogleLogin } from 'react-google-login';
// import { GoogleLogout } from 'react-google-login';
// import {Link, NavLink} from 'react-router-dom'
// import Login from '../../components/login/Login';
// import Logout from '../../components/login/Logout';
// import AuthContext from '../../store/authContext';

import { useState, useContext, useEffect } from 'react';
import logo from '../../FSAE-Logo.png';
import Login from '../../components/login/Login';
import Logout from '../../components/login/Logout';
import AuthContext from '../../store/authContext';

function Header(){

    // console.log("rendered");

    // const responseGoogle = (response) => {
    //     console.log(response.profileObj);
    //   }

    const [isLoggedIn, setLogin] = useState(false);
    const authCtx = useContext(AuthContext);
    useEffect(() => {
        authCtx.isLoggedIn()
            .then(response =>
                setLogin(response)
            );
    }, undefined)

    return (
        // <Navbar className="das-navbar" bg="dark" variant="dark" expand="lg">
        //     <Navbar.Brand href="#home">
        //         <img src={logo} alt="FSAE Logo"/>
        //     </Navbar.Brand>
        //     <Navbar.Toggle aria-controls="basic-navbar-nav" />
        //     <Navbar.Collapse id="basic-navbar-nav">
        //         <Nav className="ml-auto">
        //             <Nav.Link className= "Get-Started_Btn" href="/live">Get Started</Nav.Link>
                    
                    
        //             <div>
        //                 <GoogleLogin
        //                     clientId="556956655217-e7b4pep5fd0j3bfouir75fpq67bgdf6u.apps.googleusercontent.com"
        //                     scope={"https://www.googleapis.com/auth/userinfo.profile"}
        //                     buttonText="Login"
        //                     onSuccess={responseGoogle}
        //                     onFailure={responseGoogle}
        //                     cookiePolicy={'single_host_origin'}
        //                     hostedDomain={"my.csun.edu"}
        //                     isSignedIn={true}
        //                     // uxMode= "redirect"
        //                     // redirectUri="http://localhost:3000"
        //                 />
        //             </div>
                    
                    
        //         </Nav>
        //     </Navbar.Collapse>
        // </Navbar>

        <div class="topnav">
            {/* <a class="active" href="#home">Home</a>
            <a href="#news">News</a>
            <a href="#contact">Contact</a> */}
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
//
//E7tBA9WEMBmT7E-0Jya8n9SV
export default Header;