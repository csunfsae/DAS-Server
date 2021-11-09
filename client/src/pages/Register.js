import React from 'react';

function Register() {
    return (
        <div>
            <h1>Logo here</h1>
            <form>
                <label for="fname">First name:</label><br/>
                <input type="text" id="fname" name="fname" /><br/>
                <label for="lname">Last Name:</label><br/>
                <input type="text" id="lname" name="lname" /><br/>
                <label for="email">CSUN email:</label><br/>
                <input type="text" id="email" name="email" /><br/>
                <label for="password">Password:</label><br/>
                <input type="text" id="password" name="password" /><br/>
                <label for="password">Re-enter Password:</label><br/>
                <input type="text" id="password" name="password" /><br/>
                <input type="submit" value="Submit" />
            </form>
            <p>Already a member? Sign In.</p>
        </div>  
    )
}

export default Register;