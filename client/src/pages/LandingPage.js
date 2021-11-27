
import React from 'react';
import Header from '../components/Header/Header'
import Footer from '../components/Footer';
// import Container from 'react-bootstrap/esm/Container';
import racecar from '../components/images/racecar.svg';

function LandingPage() {
    return (
        <div className= "lPBody">

            
           <Header className = "Header">
            
            </Header>
            
            <div className="overlay">
            <h1>Data Acquisition System customized for CSUN FSAE team.</h1>
            <p>Check data from one of our vehicles in real time.</p>
            
            <img id= "carImg" src={racecar} alt="racecar img"/>  
            

         </div>
         <div className= "footer">

         </div>
    </div>  
    )
}

export default LandingPage;