import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from './store/auth-context';

// Live Page Reducers
import gpsReducer from './reducers/livePage/gpsReducer';
import lapTimesReducer from './reducers/livePage/lapTimesReducer';
import monitoringReducer from './reducers/livePage/monitoringReducer';
import tiresReducer from './reducers/livePage/tiresReducer';
import vehicleDynamicsReducer from './reducers/livePage/vehicleDynamicsReducer';

//Historical Page Reducers
import historicalPageReducer from './reducers/historyPage/historicalPageReducer';
import modalReducer from './reducers/historyPage/modalReducer';
import graphicalViewModalReducer from './reducers/historyPage/graphicalViewReducers/graphicalViewModalReducer';

const reducers = {
  // general: rootReducer,
  gps: gpsReducer,
  lapTimes: lapTimesReducer,
  monitoring: monitoringReducer,
  tires: tiresReducer,
  vehicleDynamics: vehicleDynamicsReducer,
  historyModal: modalReducer,
  generalHistoricalData: historicalPageReducer,
  sensorModal: graphicalViewModalReducer
};

const allReducers = combineReducers(reducers);

const store = createStore(allReducers, applyMiddleware(thunk));

ReactDOM.render(
  <AuthContextProvider>
    <React.StrictMode>
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    </React.StrictMode>
  </AuthContextProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
