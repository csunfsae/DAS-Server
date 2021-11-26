import mongoose from 'mongoose';
import extendSchema from 'mongoose-extend-schema';
import sensorBaseSchema from './sensorBase.js';

const motorTempSchema = extendSchema(sensorBaseSchema, { 
    value: mongoose.Decimal128
});

const MotorTemp = mongoose.model('MotorTemp', motorTempSchema);

export default MotorTemp;