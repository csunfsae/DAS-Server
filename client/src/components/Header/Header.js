import { useState, useContext, useEffect } from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import logo from '../../FSAE-Logo.png';
import Login from '../../components/login/Login';
import Logout from '../../components/login/Logout';
import AuthContext from '../../store/authContext';

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
        <Navbar className="das-navbar" bg="dark" variant="dark" expand="lg">
            <Navbar.Brand href="#home">
                <img src={logo} alt="FSAE Logo" />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    {!isLoggedIn && (
                        <Login />
                    )}
                    {isLoggedIn && (
                        <><Nav.Link href="#link">Suspension</Nav.Link><Nav.Link href="#link">Engine</Nav.Link><Logout /></>
                    )}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default Header;