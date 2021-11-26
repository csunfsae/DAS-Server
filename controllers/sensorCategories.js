import SensorCategory from '../models/sensorCategory.js';

export const getSensorCategories = async (req, res) => {
    try {
        const sensorCategories = await SensorCategory.find();
        res.status(200).json(sensorCategories);

    } catch(error) {
        res.status(404).json({message: error.message});
    }
}

export const createSensorCategory = (req, res) => {
   try {
       
   } catch (error) {
       
   }
}