import mongoose from 'mongoose';
import extendSchema from 'mongoose-extend-schema';
import sensorBaseSchema from './sensorBase.js';

const SteeringAngleSchema = extendSchema(sensorBaseSchema, { 
    value: mongoose.Decimal128
});

const SteeringAngle = mongoose.model('SteeringAngle', SteeringAngleSchema);

export default SteeringAngle;