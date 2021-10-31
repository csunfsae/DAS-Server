import { useContext } from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import logo from '../../FSAE-Logo.png';
import Login from '../../components/login/Login';
import Logout from '../../components/login/Logout';
import AuthContext from '../../store/auth-context';
import { Redirect } from 'react-router-dom'



function Header() {

    const authCtx = useContext(AuthContext);
    const isLoggedIn = authCtx.isLoggedIn;

    return (
        <Navbar className="das-navbar" bg="dark" variant="dark" expand="lg">
            <Navbar.Brand href="#home">
                <img src={logo} alt="FSAE Logo" />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    {!isLoggedIn && (
                        <div>
                            <Redirect to='/' />
                            <Login />
                        </div>
                    )}
                    {isLoggedIn && (
                        <>
                            <Nav.Link href="#link">Suspension</Nav.Link>
                            <Nav.Link href="#link">Engine</Nav.Link>
                            <Logout />
                        </>
                    )}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}
//
//E7tBA9WEMBmT7E-0Jya8n9SV
export default Header;