import mongoose from 'mongoose';
import extendSchema from 'mongoose-extend-schema';
import sensorBaseSchema from './sensorBase.js';

const motorControllerAirTempSchema = extendSchema(sensorBaseSchema, { 
    value: mongoose.Decimal128
});

const MotorControllerAirTemp = mongoose.model('MotorControllerAirTemp', motorControllerAirTempSchema);

export default MotorControllerAirTemp;