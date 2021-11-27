import React from 'react';
import GoogleLogin from 'react-google-login';
import logo from "../components/images/FSAE-Logo.png";
// import Login from '../components/login/Login';
import Logout from '../components/login/Logout';

function Register() {
    return (
        
        <div className = "register-page" >
            <img className= "logo-img" src={logo}/>
            <h1>Sign up</h1>

            <h2>Register Procedure</h2>
            {/* <ul>
                <li>Must use a CSUN email to authenticate with google to make sure you are actually a student.</li>
                <li>All new requests to join must be approved by an Admin first. You will be sent an email later on notify you whether your request was approved or rejected.</li>
            </ul> */}

            <p>Must use a CSUN email to authenticate with google to make sure you are actually a student.</p>
            <p>All new requests to join must be approved by an Admin first. You will be sent an email later on notify you whether your request was approved or rejected.</p>

            {/* Add a new google login button if needed that uses extra authentication. Leaving the Login button for now to give out the idea. */}
            <Logout />

            {/* <form>

                <input type="text" id="fname" name="fname" placeholder= "First name" /><br/>
              
                <input type="text" id="lname" name="lname" placeholder= "Last name"/><br/>
                
                <input type="text" id="email" name="email" placeholder= "CSUN email"/><br/>
                
                <input type="text" id="password" name="password" placeholder="Password" /><br/>
            
                <input type="text" id="password-repeat" name="password-repeat" placeholder="Re-enter password" /><br/>
                <input type="submit" class= "submit-btn" value="Submit" />
                
            </form> */}

            {/* <p>Already a member? 
            <a class= "sign-in" href= "login"> Sign in.</a>
            </p> */}
        </div>  
    )
}

export default Register;