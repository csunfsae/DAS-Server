import React from 'react';
import logo from "../components/images/FSAE-Logo.png"

function Login() {
    return (
        <div class= "sign-in-h">
            <img className= "logo-signin" src={logo}/>
            <h1 class= "sign-in">Sign in</h1>
            <form class= "sign-in-body">
               
                <label for="email">CSUN email:</label><br/>
                <input type="text" id="email" name="email" /><br/>
                <label for="password">Password:</label><br/>
                <input type="text" id="password" name="password" /><br/>
        
                <input type="submit" value="Submit" />
            </form>
           
        </div>  
    )
}

export default Login;