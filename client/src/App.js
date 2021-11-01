import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {Switch, Route} from 'react-router-dom';
import LiveData from './pages/LiveData';
import HistoricalData from './pages/HistoricalData';
import LandingPage from './pages/LandingPage';

import ListSensors from './pages/sensors/ListSensors';
import NewSensor from './pages/sensors/NewSensor';
import ShowSensor from './pages/sensors/ShowSensor';
import EditSensor from './pages/sensors/EditSensor';

import ListUsers from './pages/users/ListUsers';
import NewUser from './pages/users/NewUser';
import ShowUser from './pages/users/ShowUser';
import EditUser from './pages/users/EditUser';

import ListSubTeams from './pages/subTeams/ListSubTeams';
import NewSubTeam from './pages/subTeams/NewSubTeam';
import ShowSubTeam from './pages/subTeams/ShowSubTeam';
import EditSubTeam from './pages/subTeams/EditSubTeam';

import ListSensorCategories from './pages/sensorCategories/ListSensorCategories';
import EditSensorCategory from './pages/sensorCategories/EditSensorCategory';
import ShowSensorCategory from './pages/sensorCategories/ShowSensorCategory';
import NewSensorCategory from './pages/sensorCategories/NewSensorCategory';
import Header from './components/Header/Header';
import Footer from './components/Footer';
function App() {
  
  return (
    <>
    
      <Switch>
  
        <Route exact path={"/"} component={LandingPage}/>
        <Header />
        <Footer/>
        <Route exact path={"/live"} component={LiveData}/>
        <Route path={"/history"} component={HistoricalData}/>
        
        <Route exact path={"/users"} component={ListUsers}/>
        <Route path={"/users/new"} component={NewUser}/>
        <Route exact path={"/users/:id"} component={ShowUser}/>
        <Route path={"/users/:id/edit"} component={EditUser}/>

        <Route exact path={"/subTeams"} component={ListSubTeams}/>
        <Route path={"/subTeams/new"} component={NewSubTeam}/>
        <Route exact path={"/subTeams/:id"} component={ShowSubTeam}/>
        <Route path={"/subTeams/:id/edit"} component={EditSubTeam}/>

        <Route exact path={"/sensors"} component={ListSensors}/>
        <Route path={"/sensors/new"} component={NewSensor}/>
        <Route exact path={"/sensors/:id"} component={ShowSensor}/>
        <Route path={"/sensors/:id/edit"} component={EditSensor}/>

        <Route exact path={"/sensorCategories"} component={ListSensorCategories}/>
        <Route path={"/sensorCategories/new"} component={NewSensorCategory}/>
        <Route exact path={"/sensorCategories/:id"} component={ShowSensorCategory}/>
        <Route path={"/sensorCategories/:id/edit"} component={EditSensorCategory}/>

      </Switch>
    </>
  );
}

export default App;
