import Sensor from '../models/sensor.js';

export const getSensors = async (req, res) => {
    try {
        const sensors = await Sensor.find();
        res.status(200).json(sensors);

    } catch(error) {
        res.status(404).json({message: error.message});
    }
}

export const createSensor = (req, res) => {
   try {
       
   } catch (error) {
       
   }
}