import mongoose from 'mongoose';
import extendSchema from 'mongoose-extend-schema';
import sensorBaseSchema from './sensorBase.js';

const throttlePositionSchema = extendSchema(sensorBaseSchema, { 
    value: mongoose.Decimal128
});

const ThrottlePosition = mongoose.model('ThrottlePosition', throttlePositionSchema, '');

export default ThrottlePosition;