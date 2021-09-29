import React from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import logo from '../../FSAE-Logo.png';
import { GoogleLogin } from 'react-google-login';
import { GoogleLogout } from 'react-google-login';

function Header(){

    console.log("rendered");

    const responseGoogle = (response) => {
        console.log(response.profileObj);
      }

    return (
        <Navbar className="das-navbar" bg="dark" variant="dark" expand="lg">
            <Navbar.Brand href="#home">
                <img src={logo} alt="FSAE Logo"/>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    <Nav.Link href="#link">Suspension</Nav.Link>
                    <Nav.Link href="#link">Engine</Nav.Link>
                    
                    <div>
                        <GoogleLogin
                            clientId="556956655217-e7b4pep5fd0j3bfouir75fpq67bgdf6u.apps.googleusercontent.com"
                            scope={"https://www.googleapis.com/auth/userinfo.profile"}
                            buttonText="Login"
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle}
                            cookiePolicy={'single_host_origin'}
                            hostedDomain={"my.csun.edu"}
                            isSignedIn={true}
                            // uxMode= "redirect"
                            // redirectUri="http://localhost:3000"
                        />
                    </div>
                    <div>
                        <GoogleLogout
                            clientId="556956655217-e7b4pep5fd0j3bfouir75fpq67bgdf6u.apps.googleusercontent.com"
                            buttonText="Logout"
                            onLogoutSuccess={responseGoogle}
                            hostedDomain={"my.csun.edu"}
                            uxMode= "redirect"
                            // redirectUri={"http://localhost:3000"}
                        >
                        </GoogleLogout>

                    </div>
                    
                    
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}
//
//E7tBA9WEMBmT7E-0Jya8n9SV
export default Header;