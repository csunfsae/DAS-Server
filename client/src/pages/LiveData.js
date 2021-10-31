import React, { useContext } from 'react';
import { SocketContext, socket } from '../SocketContext';
import Footer from '../components/livePage/Footer/Footer';
import Container from 'react-bootstrap/Container';
import HorizontalBars from '../components/livePage/HorizontalBars/HorizontalBars';
import LapTimes from '../components/livePage/LapTimes/LapTimes';
import GForceChart from '../components/livePage/GForceChart/GForceChart';
import GPSMap from '../components/livePage/GPSMap/GPSMap';
import Header from '../components/Header/Header';
import AuthContext from '../store/auth-context.js'
import { Redirect } from 'react-router-dom'

function LiveData() {
    return (
        <>
            <Header />
            <SocketContext.Provider value={socket}>
                <Container fluid>
                    <div className="das-container pt-5">

                        <div className="laptimes">
                            <LapTimes />
                        </div>

                        <div className="horizontal-bars align-items-center">
                            <HorizontalBars />
                        </div>

                        <div className="gps-track d-flex align-items-center justify-content-center">
                            <GPSMap />
                        </div>

                        <div className="g-g-diagram">
                            <GForceChart />
                        </div>

                    </div>
                </Container>
                <Footer />
            </SocketContext.Provider>
        </>
    )
}

export default LiveData;