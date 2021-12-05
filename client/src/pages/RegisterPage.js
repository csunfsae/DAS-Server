import logo from "../components/images/FSAE-Logo.png";
import Register from '../components/login/Register';

function RegisterPage() {
    return (

        <div className="register-page" >
            <a href="/">
                <img className="logo-img" src={logo} atl="CSUN LOGO" />
            </a>
            <h1>Sign up</h1>
            <h2>Register Procedure</h2>
            <p>You must register with a CSUN email address.</p>
            <p>Once your registration is complete, an admin will need to approve your request.</p>
            <Register />

        </div>
    )
}

export default RegisterPage;