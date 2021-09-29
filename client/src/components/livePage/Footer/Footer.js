import React, {useContext, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {SocketContext} from '../../../SocketContext';
import CurrentDateTime from '../CurrentDateTime.js';
import './Footer.css'

function Footer() {

    const socket = useContext(SocketContext);
    const jetson_connection = useSelector( (state) => state.jetsonConnection);
    const dispatch = useDispatch();

    useEffect( () => {
        window.localStorage.setItem('jetson-connection', jetson_connection);
        socket.on('jetson_connection', (data) => {
            window.localStorage.setItem('jetson-connection', data);
            dispatch({type: "update-jetson-connection", payload: data});
          });
    }, [jetson_connection])

    return (
        <footer className="footer py-3">
            <div className="d-flex flex-wrap justify-content-between container-fluid align-items-center">
                <div className="text-center d-flex">
                    <CurrentDateTime/>
                    <div className="ml-2">
                        70°F
                    </div>
                </div>
                <div className="text-center">
                    Jetson: {jetson_connection}
                </div>
            </div>
        </footer>
    );
}

export default Footer;