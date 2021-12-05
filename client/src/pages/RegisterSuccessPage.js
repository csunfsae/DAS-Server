import logo from "../components/images/FSAE-Logo.png";
import Register from '../components/login/Register';

function RegisterSuccessPage() {
    return (

        <div className="register-page" >
            <a href="/">
                <img className="logo-img" src={logo} atl="CSUN LOGO" />
            </a>
            <div>
                <h1>Success!</h1>
                <br></br>
                <h2>You have successfully registered for CSUN Matador Motorsports</h2>
                <br></br><br></br>
                <h4>Your request is currently being reviewed. Once you are approved, <br></br>you will receive an email indicating you have been granted access.</h4>
            </div>


        </div>
    )
}

export default RegisterSuccessPage;