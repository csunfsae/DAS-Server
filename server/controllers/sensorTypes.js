import SensorType from '../models/sensorType.js';

export const getSensorTypes = async (req, res) => {
    try {
        const sensorTypes = await SensorType.find();
        res.status(200).json(sensorTypes);

    } catch(error) {
        res.status(404).json({message: error.message});
    }
}

export const createSensorType = (req, res) => {
   try {
       
   } catch (error) {
       
   }
}