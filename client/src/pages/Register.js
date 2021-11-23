import React from 'react';
import GoogleLogin from 'react-google-login';
import logo from "../components/images/FSAE-Logo.png"

function Register() {
    return (
        
        <div className = "register-page" >
            <img className= "logo-img" src={logo}/>
            <h1>Sign up</h1>
            <form>
                
                <input type="text" id="fname" name="fname" placeholder= "First name" /><br/>
              
                <input type="text" id="lname" name="lname" placeholder= "Last name"/><br/>
                
                <input type="text" id="email" name="email" placeholder= "CSUN email"/><br/>
                
                <input type="text" id="password" name="password" placeholder="Password" /><br/>
            
                <input type="text" id="password-repeat" name="password-repeat" placeholder="Re-enter password" /><br/>
                <input type="submit" class= "submit-btn" value="Submit" />
                
            </form>
            <p>Already a member? 
            <a class= "sign-in" href= "login"> Sign in.</a>
            </p>
        </div>  
    )
}

export default Register;