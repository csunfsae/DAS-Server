import mongoose from 'mongoose';
import extendSchema from 'mongoose-extend-schema';
import sensorBaseSchema from './sensorBase.js';

const brakePositionSchema = extendSchema(sensorBaseSchema, { 
    value: mongoose.Decimal128
});

const BrakePosition = mongoose.model('BrakePosition', brakePositionSchema);

export default BrakePosition;