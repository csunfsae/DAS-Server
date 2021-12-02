import express from 'express';
import path from 'path';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import createSeedData from './data/SeedData.js';
import morgan from 'morgan';
import mongoose from 'mongoose';
import cors from 'cors';
import Server from 'socket.io';
import XLSX from 'xlsx';

import userRoutes from './routes/users.js';
import sensorRoutes from './routes/sensors.js';
import sensorTypeRoutes from './routes/sensorTypes.js';
import sensorCategoryRoutes from './routes/sensorCategories.js';
import subTeamRoutes from './routes/subTeams.js';

import DriveDay from './models/driveDay.js';

// Load config
dotenv.config({ path: './config/config.env' })

connectDB();
createSeedData();

const app = express();

// Telling server to serve static files on client
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, 'client', 'build')));

// middleware
app.use(express.json());
app.use(cookieParser());

const oneDay = 1000 * 60 * 60 * 24;
app.use(session({ resave: false, secret: '123456', cookie: { maxAge: oneDay }, saveUninitialized: true }));

// Add headers before the routes are defined
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '/');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

// Logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, console.log(`Server running on port ${PORT}`));

const io = new Server(server);

app.use('/api/v1/auth', userRoutes);
app.use('/sensors', sensorRoutes);
app.use('/subTeams', subTeamRoutes);
app.use('/sensorCategories', sensorTypeRoutes);
app.use('/sensorTypes', sensorCategoryRoutes);
app.use(cors());

io.on('connection', (socket) => {
    let jetsonSocketId = null;

    socket.on('jetson_connection', (msg) => {
        jetsonSocketId = socket.id
        socket.broadcast.emit('jetson_connecti on', msg)
    });

    socket.on('speedometer', (msg) => {
        socket.emit('speedometer', msg)
    });

    //test(socket);

    socket.on('disconnect', (reason) => {
        let jetsonDisconnected = false;

        if (socket.id === jetsonSocketId) {
            socket.broadcast.emit('jetson_connection', "Not Connected");
        }
    });
});


// async function test(socket) {

//     var workbook = XLSX.readFile('./data/excelFiles/Copy-Simulation-Test-Data.xlsx');

//     var sheet_name_list = workbook.SheetNames;
//     var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);


//     for (let i = 0; i < xlData.length; i++) {

//         socket.emit('lap_time', xlData[i].Lap_Time);

//         socket.emit('gForceChart', { x: (-1 * xlData[i].G_G_Latitude), y: (-1 * xlData[i].G_G_Longitude) });
//         socket.emit('gps_data', { x: xlData[i].GPS_Longitude, y: xlData[i].GPS_Latitude });

//         socket.emit('battery_voltage', xlData[i].Battery_Voltage);

//         socket.emit('fl_tire_load', xlData[i].FL_Tire_Load);
//         socket.emit('fl_tire_temp', xlData[i].FL_Tire_Temp);

//         socket.emit('fr_tire_load', xlData[i].FR_Tire_Load);
//         socket.emit('fr_tire_temp', xlData[i].FR_Tire_Temp);

//         socket.emit('rl_tire_load', xlData[i].RL_Tire_Load);
//         socket.emit('rl_tire_temp', xlData[i].RL_Tire_Temp);

//         socket.emit('rr_tire_load', xlData[i].RR_Tire_Load);
//         socket.emit('rr_tire_temp', xlData[i].RR_Tire_Temp);

//         socket.emit('brake_position', xlData[i].Brake_Position);
//         socket.emit('steering_angle', xlData[i].Steering_Angle);
//         socket.emit('motor_temp', xlData[i].Motor_Temp);
//         socket.emit('throttle_position', xlData[i].Throttle_Position);
//         socket.emit('motor_controller_air_temp', xlData[i].Motor_Controller_Air_Temp);
//         socket.emit('speed', xlData[i].Speed);
//         await sleep(100);
//     }
// }

// const lookUpSensors = (sensorList) => {

//     // Getting all of the models from mongoose
//     const models = mongoose.models;

//     // List of the model representations for the sensors
//     // Going to be returned so we can further query data from the db
//     let sensors = [];

//     // For each sensor in the sensorList params
//     for (const sensor of sensorList) {

//         // For each model from the models object
//         for (const model in models) {

//             // If the sensor equals that models collection name in the db, append it to the list of models
//             if (sensor === models[model].collection.collectionName) {
//                 sensors.push(models[model])
//             }
//         }
//     }

//     return sensors;
// }

// app.get('/api/v1/data', async (req, res) => {

//     const dates = req.query.dates.includes(',') ? req.query.dates.split(',') : [req.query.dates];
//     const sessionNumbers = req.query.session_numbers.includes(',') ? req.query.session_numbers.split(',') : [req.query.session_numbers];
//     const lapNumbers = req.query.lap_numbers.includes(',') ? req.query.lap_numbers.split(',') : [req.query.lap_numbers];
//     const sensors = req.query.sensors.includes(',') ? req.query.sensors.split(',') : [req.query.sensors];

//     // Object to hold all of the data from the db
//     let sensorsData = {};

//     // Array to hold the model representation from mongoose
//     // Ex. ThrottlePosition
//     const sensorModels = lookUpSensors(sensors)

//     // For the length of the laps array
//     for (let i = 0; i < lapNumbers.length; i++) {

//         // If there isn't as many dates/sessions as laps, use last index in the date/session array
//         // Else, use that index of the date/session array
//         const date = dates[i] === undefined ? dates[dates.length - 1] : dates[i];
//         const session = sessionNumbers[i] === undefined ? sessionNumbers[sessionNumbers.length - 1] : sessionNumbers[i];
//         const lap = lapNumbers[i] === undefined ? lapNumbers[lapNumbers.length - 1] : lapNumbers[i];

//         // For each sensor, get the data and append it to the sensorsData object
//         for (let j = 0; j < sensorModels.length; j++) {
//             const sensorName = sensorModels[j].modelName;
//             const sensorData = await sensorModels[j].find({ date: date, sessionNumber: session, lapNumber: lap }).select("lapTime value -_id");

//             if (Object.keys(sensorsData).length < sensorModels.length) {
//                 sensorsData[sensorName] = [];
//             }

//             if (Object.keys(sensorsData)[j] === sensorName) {
//                 const sensor = Object.keys(sensorsData)[j];
//                 sensorsData[sensor].push(sensorData);
//             }

//         }
//     }

//     // Send back the data to the fontend
//     // res.type('json').send(JSON.stringify(sensorsData, null, 2) + '\n');
//     res.send(sensorsData);
// })

// app.get('/api/v1/drive-days', async (req, res) => {

//     if (req.query.dates === undefined) {
//         const driveDays = await DriveDay.findOne({}).sort({ date: -1 }).select("date sessions -_id");
//         res.status(200).json(driveDays);
//     }

//     const dates = req.query.dates.includes(',') ? req.query.dates.split(',') : [req.query.dates];

//     const driveDays = await DriveDay.find(
//         {
//             $and: [
//                 {
//                     "date": {
//                         $gte: dates[0]
//                     },
//                 },
//                 {
//                     "date": {
//                         $lte: dates[1]
//                     }

//                 }
//             ]
//         }).sort({ date: -1 }).select("date sessions -_id")
//     res.status(200).json(driveDays);
// })

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}