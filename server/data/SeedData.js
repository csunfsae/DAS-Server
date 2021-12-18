import XLSX from 'xlsx';
import User from '../models/User.js';
import DriveDay from '../models/driveDay.js';
import BatteryVoltage from '../models/sensorsData/batteryVoltage.js';
import BrakePosition from '../models/sensorsData/brakePosition.js';
import GGSuspension from '../models/sensorsData/GGSuspension.js';
import MotorControllerAirTemp from '../models/sensorsData/motorControllerAirTemp.js';
import MotorTemp from '../models/sensorsData/motorTemp.js';
import SteeringAngle from '../models/sensorsData/steeringAngle.js';
import ThrottlePosition from '../models/sensorsData/throttlePosition.js';
import FLTireLoad from '../models/sensorsData/tires/FLTireLoad.js';
import FLTireTemp from '../models/sensorsData/tires/FLTireTemp.js';
import FRTireLoad from '../models/sensorsData/tires/FRTireLoad.js';
import FRTireTemp from '../models/sensorsData/tires/FRTireTemp.js';
import RLTireLoad from '../models/sensorsData/tires/RLTireLoad.js';
import RLTireTemp from '../models/sensorsData/tires/RLTireTemp.js';
import RRTireLoad from '../models/sensorsData/tires/RRTireLoad.js';
import RRTireTemp from '../models/sensorsData/tires/RRTireTemp.js';
import GPSLocation from '../models/sensorsData/GPSLocation.js';
import Speed from '../models/sensorsData/speed.js';

const seedData = async () => {

    try {

        const user = await User.findOne({ googleId: "115439410176093243700" });

        // Seed ALL data only if the expected user does not exist.  If you want to re-seed your data, drop the db first.
        if (user == null) {
            await User.create({
                googleId: "115439410176093243700",
                firstName: "Das",
                lastName: "User",
                email: "dascsunuser@gmail.com",
                status: "Active",
                role: "Basic",
                team: "Unassigned",
                createdAt: Date.now()
            })

            await DriveDay.create({
                date: "2021-02-22",
                sessions: [
                    {
                        number: 1,
                        laps: [
                            {
                                lap_number: 1,
                                lap_time: "34:23"
                            },
                            {
                                lap_number: 2,
                                lap_time: "40:123"
                            },
                            {
                                lap_number: 3,
                                lap_time: "43:59"
                            },
                        ]
                    }
                ]
            })

            await BatteryVoltage.create(
                {
                    date: "2021-02-19",
                    lapTime: 20.00,
                    sessionNumber: 1,
                    lapNumber: 1,
                    value: 50
                }
            )

            await DriveDay.create({
                date: "2021-02-19",
                sessions: [
                    {
                        number: 1,
                        laps: [
                            {
                                lap_number: 1,
                                lap_time: "34:23"
                            },
                            {
                                lap_number: 2,
                                lap_time: "40:123"
                            },
                            {
                                lap_number: 3,
                                lap_time: "43:59"
                            },
                        ]
                    }
                ]
            })

            await DriveDay.create({
                date: "2021-02-20",
                sessions: [
                    {
                        number: 1,
                        laps: [
                            {
                                lap_number: 1,
                                lap_time: "34:23"
                            },
                            {
                                lap_number: 2,
                                lap_time: "40:123"
                            },
                        ]
                    }
                ]
            })

            await DriveDay.create({
                date: "2021-02-21",
                sessions: [
                    {
                        number: 1,
                        laps: [
                            {
                                lap_number: 1,
                                lap_time: "20:20"
                            },
                            {
                                lap_number: 2,
                                lap_time: "19:56"
                            },
                            {
                                lap_number: 3,
                                lap_time: "32:40"
                            },
                        ]
                    }
                ]
            })

            var workbook = XLSX.readFile('./data/excelFiles/Copy-Simulation-Test-Data.xlsx');
            var sheet_name_list = workbook.SheetNames;
            var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
            let lap = 1;
            for (let i = 0; i < xlData.length; i++) {
                if (i > 416) {
                    lap = 2
                }
                await BatteryVoltage.create(
                    {
                        lapTime: xlData[i].Lap_Time,
                        sessionNumber: 1,
                        lapNumber: lap,
                        value: xlData[i].Battery_Voltage
                    }
                );

                await BrakePosition.create(
                    {
                        lapTime: xlData[i].Lap_Time,
                        sessionNumber: 1,
                        lapNumber: lap,
                        value: xlData[i].Brake_Position
                    }
                );

                await GGSuspension.create(
                    {
                        lapTime: xlData[i].Lap_Time,
                        sessionNumber: 1,
                        lapNumber: lap,
                        latitude: xlData[i].G_G_Latitude,
                        longitude: xlData[i].G_G_Longitude
                    }
                );

                await GPSLocation.create(
                    {
                        lapTime: xlData[i].Lap_Time,
                        sessionNumber: 1,
                        lapNumber: lap,
                        latitude: xlData[i].GPS_Latitude,
                        longitude: xlData[i].GPS_Longitude
                    }
                );

                await MotorControllerAirTemp.create(
                    {
                        lapTime: xlData[i].Lap_Time,
                        sessionNumber: 1,
                        lapNumber: lap,
                        value: xlData[i].Motor_Controller_Air_Temp
                    }
                );

                await MotorTemp.create(
                    {
                        lapTime: xlData[i].Lap_Time,
                        sessionNumber: 1,
                        lapNumber: lap,
                        value: xlData[i].Motor_Temp
                    }
                );

                await Speed.create(
                    {
                        lapTime: xlData[i].Lap_Time,
                        sessionNumber: 1,
                        lapNumber: lap,
                        value: xlData[i].Speed
                    }
                );

                await SteeringAngle.create(
                    {
                        lapTime: xlData[i].Lap_Time,
                        sessionNumber: 1,
                        lapNumber: lap,
                        value: xlData[i].Steering_Angle
                    }
                );

                await ThrottlePosition.create(
                    {
                        lapTime: xlData[i].Lap_Time,
                        sessionNumber: 1,
                        lapNumber: lap,
                        value: xlData[i].Throttle_Position
                    }
                );

                await FLTireLoad.create(
                    {
                        lapTime: xlData[i].Lap_Time,
                        sessionNumber: 1,
                        lapNumber: lap,
                        value: xlData[i].FL_Tire_Load
                    }
                );

                await FLTireTemp.create(
                    {
                        lapTime: xlData[i].Lap_Time,
                        sessionNumber: 1,
                        lapNumber: lap,
                        value: xlData[i].FL_Tire_Temp
                    }
                );

                await FRTireLoad.create(
                    {
                        lapTime: xlData[i].Lap_Time,
                        sessionNumber: 1,
                        lapNumber: lap,
                        value: xlData[i].FR_Tire_Load
                    }
                );

                await FRTireTemp.create(
                    {
                        lapTime: xlData[i].Lap_Time,
                        sessionNumber: 1,
                        lapNumber: lap,
                        value: xlData[i].FR_Tire_Temp
                    }
                );

                await RLTireLoad.create(
                    {
                        lapTime: xlData[i].Lap_Time,
                        sessionNumber: 1,
                        lapNumber: lap,
                        value: xlData[i].RL_Tire_Load
                    }
                );

                await RLTireTemp.create(
                    {
                        lapTime: xlData[i].Lap_Time,
                        sessionNumber: 1,
                        lapNumber: lap,
                        value: xlData[i].RL_Tire_Temp
                    }
                );

                await RRTireLoad.create(
                    {
                        lapTime: xlData[i].Lap_Time,
                        sessionNumber: 1,
                        lapNumber: lap,
                        value: xlData[i].RR_Tire_Load
                    }
                );

                await RRTireTemp.create(
                    {
                        lapTime: xlData[i].Lap_Time,
                        sessionNumber: 1,
                        lapNumber: lap,
                        value: xlData[i].RR_Tire_Temp
                    }
                );
            }
        }
    }
    catch (error) {
        console.log(error);
    }
}

export default seedData