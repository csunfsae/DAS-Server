import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import Server from 'socket.io';
import {createServer} from 'http';
import XLSX from 'xlsx';

import userRoutes from './routes/users.js';
import sensorRoutes from './routes/sensors.js';
import sensorTypeRoutes from './routes/sensorTypes.js';
import sensorCategoryRoutes from './routes/sensorCategories.js';
import subTeamRoutes from './routes/subTeams.js';

import BatteryVoltage from './models/sensorsData/batteryVoltage.js';
import BrakePosition from './models/sensorsData/brakePosition.js';
import GGSuspension from './models/sensorsData/GGSuspension.js';
import MotorControllerAirTemp from './models/sensorsData/motorControllerAirTemp.js';
import MotorTemp from './models/sensorsData/motorTemp.js';
import SteeringAngle from './models/sensorsData/steeringAngle.js';
import ThrottlePosition from './models/sensorsData/throttlePosition.js';

import FLTireLoad from './models/sensorsData/tires/FLTireLoad.js';
import FLTireTemp from './models/sensorsData/tires/FLTireTemp.js';

import FRTireLoad from './models/sensorsData/tires/FRTireLoad.js';
import FRTireTemp from './models/sensorsData/tires/FRTireTemp.js';

import RLTireLoad from './models/sensorsData/tires/RLTireLoad.js';
import RLTireTemp from './models/sensorsData/tires/RLTireTemp.js';

import RRTireLoad from './models/sensorsData/tires/RRTireLoad.js';
import RRTireTemp from './models/sensorsData/tires/RRTireTemp.js';

import GPSLocation from './models/sensorsData/GPSLocation.js';
import Speed from './models/sensorsData/speed.js';
import DriveDay from './models/driveDay.js';


const app = express();
const http = createServer(app);
const io = new Server(http);

app.use('/users', userRoutes);
app.use('/sensors', sensorRoutes);
app.use('/subTeams', subTeamRoutes);
app.use('/sensorCategories', sensorTypeRoutes);
app.use('/sensorTypes', sensorCategoryRoutes);


app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/test_matador_motorsports', {useNewUrlParser: true, useUnifiedTopology: true});


app.get('/', async (req, res) => {

    // await DriveDay.create({
    //     date: "2021-02-22", 
    //     sessions: [
    //         {
    //             number: 1,
    //             laps: [
    //                 {
    //                     lap_number: 1,
    //                     lap_time: "34:23"
    //                 },
    //                 {
    //                     lap_number: 2,
    //                     lap_time: "40:123"
    //                 },
    //                 {
    //                     lap_number: 3,
    //                     lap_time: "43:59"
    //                 },
    //             ]
    //         }
    //     ]
    // })

    // await BatteryVoltage.create(
    //     {
    //         date: "2021-02-19",
    //         lapTime: "20:00",
    //         sessionNumber: 1,
    //         lapNumber: 1,
    //         value: 50
    //     }
    // )

    // await DriveDay.create({
    //     date: "2021-02-19", 
    //     sessions: [
    //         {
    //             number: 1,
    //             laps: [
    //                 {
    //                     lap_number: 1,
    //                     lap_time: "34:23"
    //                 },
    //                 {
    //                     lap_number: 2,
    //                     lap_time: "40:123"
    //                 },
    //                 {
    //                     lap_number: 3,
    //                     lap_time: "43:59"
    //                 },
    //             ]
    //         }
    //     ]
    // })

    // await DriveDay.create({
    //     date: "2021-02-20", 
    //     sessions: [
    //         {
    //             number: 1,
    //             laps: [
    //                 {
    //                     lap_number: 1,
    //                     lap_time: "34:23"
    //                 },
    //                 {
    //                     lap_number: 2,
    //                     lap_time: "40:123"
    //                 },
    //             ]
    //         }
    //     ]
    // })

    // await DriveDay.create({
    //     date: "2021-02-21", 
    //     sessions: [
    //         {
    //             number: 1,
    //             laps: [
    //                 {
    //                     lap_number: 1,
    //                     lap_time: "20:20"
    //                 },
    //                 {
    //                     lap_number: 2,
    //                     lap_time: "19:56"
    //                 },
    //                 {
    //                     lap_number: 3,
    //                     lap_time: "32:40"
    //                 },
    //             ]
    //         }
    //     ]
    // })

    
    // const lastDriveDay = await DriveDay.findOne().sort( {date: -1} ) ;

    // const batteryVoltages = await BatteryVoltage.find({date: lastDriveDay.date, lapNumber: 1, sessionNumber: 1});

    // var workbook = XLSX.readFile('Copy-Simulation-Test-Data.xlsx');
    // var sheet_name_list = workbook.SheetNames;
    // var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
    // let lap = 1;
    // for (let i = 0; i < xlData.length; i++) {
    //     if (i > 416 ){
    //         lap = 2
    //     }
    //     await BatteryVoltage.create(
    //         {
    //             lapTime: xlData[i].Lap_Time,
    //             sessionNumber: 1,
    //             lapNumber: lap,
    //             value: xlData[i].Battery_Voltage
    //         }
    //     );

    //     await BrakePosition.create(
    //         {
    //             lapTime: xlData[i].Lap_Time,
    //             sessionNumber: 1,
    //             lapNumber: lap,
    //             value: xlData[i].Brake_Position
    //         }
    //     );

    //     await GGSuspension.create(
    //         {
    //             lapTime: xlData[i].Lap_Time,
    //             sessionNumber: 1,
    //             lapNumber: lap,
    //             latitude: xlData[i].G_G_Latitude,
    //             longitude: xlData[i].G_G_Longitude
    //         }
    //     );

    //     await GPSLocation.create(
    //         {
    //             lapTime: xlData[i].Lap_Time,
    //             sessionNumber: 1,
    //             lapNumber: lap,
    //             latitude: xlData[i].GPS_Latitude,
    //             longitude: xlData[i].GPS_Longitude
    //         }
    //     );

    //     await MotorControllerAirTemp.create(
    //         {
    //             lapTime: xlData[i].Lap_Time,
    //             sessionNumber: 1,
    //             lapNumber: lap,
    //             value: xlData[i].Motor_Controller_Air_Temp
    //         }
    //     );

    //     await MotorTemp.create(
    //         {
    //             lapTime: xlData[i].Lap_Time,
    //             sessionNumber: 1,
    //             lapNumber: lap,
    //             value: xlData[i].Motor_Temp
    //         }
    //     );

    //     await Speed.create(
    //         {
    //             lapTime: xlData[i].Lap_Time,
    //             sessionNumber: 1,
    //             lapNumber: lap,
    //             value: xlData[i].Speed
    //         }
    //     );

    //     await SteeringAngle.create(
    //         {
    //             lapTime: xlData[i].Lap_Time,
    //             sessionNumber: 1,
    //             lapNumber: lap,
    //             value: xlData[i].Steering_Angle
    //         }
    //     );

    //     await ThrottlePosition.create(
    //         {
    //             lapTime: xlData[i].Lap_Time,
    //             sessionNumber: 1,
    //             lapNumber: lap,
    //             value: xlData[i].Throttle_Position
    //         }
    //     );

    //     await FLTireLoad.create(
    //         {
    //             lapTime: xlData[i].Lap_Time,
    //             sessionNumber: 1,
    //             lapNumber: lap,
    //             value: xlData[i].FL_Tire_Load
    //         }
    //     );

    //     await FLTireTemp.create(
    //         {
    //             lapTime: xlData[i].Lap_Time,
    //             sessionNumber: 1,
    //             lapNumber: lap,
    //             value: xlData[i].FL_Tire_Temp
    //         }
    //     );

    //     await FRTireLoad.create(
    //         {
    //             lapTime: xlData[i].Lap_Time,
    //             sessionNumber: 1,
    //             lapNumber: lap,
    //             value: xlData[i].FR_Tire_Load
    //         }
    //     );

    //     await FRTireTemp.create(
    //         {
    //             lapTime: xlData[i].Lap_Time,
    //             sessionNumber: 1,
    //             lapNumber: lap,
    //             value: xlData[i].FR_Tire_Temp
    //         }
    //     );

    //     await RLTireLoad.create(
    //         {
    //             lapTime: xlData[i].Lap_Time,
    //             sessionNumber: 1,
    //             lapNumber: lap,
    //             value: xlData[i].RL_Tire_Load
    //         }
    //     );

    //     await RLTireTemp.create(
    //         {
    //             lapTime: xlData[i].Lap_Time,
    //             sessionNumber: 1,
    //             lapNumber: lap,
    //             value: xlData[i].RL_Tire_Temp
    //         }
    //     );

    //     await RRTireLoad.create(
    //         {
    //             lapTime: xlData[i].Lap_Time,
    //             sessionNumber: 1,
    //             lapNumber: lap,
    //             value: xlData[i].RR_Tire_Load
    //         }
    //     );

    //     await RRTireTemp.create(
    //         {
    //             lapTime: xlData[i].Lap_Time,
    //             sessionNumber: 1,
    //             lapNumber: lap,
    //             value: xlData[i].RR_Tire_Temp
    //         }
    //     );
    // }
    res.send("done");
})

const lookUpSensors = (sensorList) => {

    // Getting all of the models from mongoose
    const models = mongoose.models;

    // List of the model representations for the sensors
    // Going to be returned so we can further query data from the db
    let sensors = [];

    // For each sensor in the sensorList params
    for(const sensor of sensorList) {
        
        // For each model from the models object
        for (const model in models) {

            // If the sensor equals that models collection name in the db, append it to the list of models
            if (sensor === models[model].collection.collectionName) {
                sensors.push(models[model])
            }
        }
    }

    return sensors;
}

app.get('/api/v1/data', async (req, res) => {
    // console.log(req.query);

    // Creating arrays for the data being sent from the get request
    // Either an array with multiple items split by the comma or just one item
    
    // Ex. /api/v1/data?dates=2021-02-22,2021-03-01&session_numbers=1,2&lap_numbers=1,3&sensors=throttlePosition,brakePosition
    // Example above would create an array with mutltiple items. (['2021-02-22', '2021-03-01'])
    
    // Ex. /api/v1/data?date=2021-02-22&session_numbers=1&lap_numbers=1&sensors=throttlePosition
    // Example above would create an array with one item. (['2021-02-22'])

    const dates = req.query.dates.includes(',') ? req.query.dates.split(',') : [req.query.dates];
    const sessionNumbers = req.query.session_numbers.includes(',') ? req.query.session_numbers.split(',') : [req.query.session_numbers];
    const lapNumbers = req.query.lap_numbers.includes(',') ? req.query.lap_numbers.split(',') : [req.query.lap_numbers];
    const sensors = req.query.sensors.includes(',') ? req.query.sensors.split(',') : [req.query.sensors]; 
    
    // Object to hold all of the data from the db
    let sensorsData = {};

    // Array to hold the model representation from mongoose
    // Ex. ThrottlePosition
    const sensorModels = lookUpSensors(sensors)

    // For the length of the laps array
    for (let i = 0; i < lapNumbers.length; i++) {

        // If there isn't as many dates/sessions as laps, use last index in the date/session array
        // Else, use that index of the date/session array
        const date = dates[i] === undefined ? dates[dates.length - 1] : dates[i]; 
        const session = sessionNumbers[i] === undefined ? sessionNumbers[sessionNumbers.length - 1] : sessionNumbers[i];
        const lap = lapNumbers[i] === undefined ? lapNumbers[lapNumbers.length - 1] : lapNumbers[i];
        
        // For each sensor, get the data and append it to the sensorsData object
        for (let j = 0; j < sensorModels.length; j++) {
            const sensorName = sensorModels[j].modelName;
            const sensorData = await sensorModels[j].find({date: date, sessionNumber: session, lapNumber: lap}).select("lapTime value -_id");

            if (Object.keys(sensorsData).length < sensorModels.length) {
                sensorsData[sensorName] = [];
            }
            
            if (Object.keys(sensorsData)[j] === sensorName) {
                const sensor = Object.keys(sensorsData)[j];
                sensorsData[sensor].push(sensorData);
            }

        }
    }

    // Send back the data to the fontend
    // res.type('json').send(JSON.stringify(sensorsData, null, 2) + '\n');
    res.send(sensorsData);
})

app.get('/api/v1/drive-days', async (req, res) => {

    if (req.query.dates === undefined) {
        const driveDays = await DriveDay.findOne({}).sort({date: -1}).select("date sessions -_id");
        res.status(200).json(driveDays);
    }

    const dates = req.query.dates.includes(',') ? req.query.dates.split(',') : [req.query.dates];

    const driveDays = await DriveDay.find(
        {
            $and: [ 
                {
                    "date": {
                        $gte: dates[0]
                    }, 
                }, 
                {
                    "date": {
                        $lte: dates[1]
                    }

                }
            ]
        }).sort({date: -1}).select("date sessions -_id")
        res.status(200).json(driveDays);
})

http.listen(4000, () => {
    console.log('listening on port 4000');
  });

io.on('connection', (socket) => {
    let jetsonSocketId = null;

    socket.on('jetson_connection', (msg) => {
        jetsonSocketId =  socket.id
        socket.broadcast.emit('jetson_connection', msg)
    });

    test(socket);

    socket.on('disconnect', (reason) => {
        let jetsonDisconnected = false;

        if (socket.id === jetsonSocketId) {
            socket.broadcast.emit('jetson_connection', "Not Connected");
        }
    });

});


async function test(socket) {
    
    var workbook = XLSX.readFile('Copy-Simulation-Test-Data.xlsx');

    var sheet_name_list = workbook.SheetNames;
    var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);


    for (let i = 0; i < xlData.length; i++) {

        socket.emit('lap_time', xlData[i].Lap_Time);

        socket.emit('gForceChart', {x: (-1 * xlData[i].G_G_Latitude), y: (-1 * xlData[i].G_G_Longitude)});
        socket.emit('gps_data', {x: xlData[i].GPS_Longitude, y: xlData[i].GPS_Latitude});
        
        socket.emit('battery_voltage', xlData[i].Battery_Voltage);

        socket.emit('fl_tire_load', xlData[i].FL_Tire_Load);
        socket.emit('fl_tire_temp', xlData[i].FL_Tire_Temp);
        
        socket.emit('fr_tire_load', xlData[i].FR_Tire_Load);
        socket.emit('fr_tire_temp', xlData[i].FR_Tire_Temp);

        socket.emit('rl_tire_load', xlData[i].RL_Tire_Load);
        socket.emit('rl_tire_temp', xlData[i].RL_Tire_Temp);

        socket.emit('rr_tire_load', xlData[i].RR_Tire_Load);
        socket.emit('rr_tire_temp', xlData[i].RR_Tire_Temp);

        socket.emit('brake_position', xlData[i].Brake_Position);
        socket.emit('steering_angle', xlData[i].Steering_Angle);
        socket.emit('motor_temp', xlData[i].Motor_Temp);
        socket.emit('throttle_position', xlData[i].Throttle_Position);
        socket.emit('motor_controller_air_temp', xlData[i].Motor_Controller_Air_Temp);
        socket.emit('speed', xlData[i].Speed);
        await sleep(100);
    }
}

function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  } 