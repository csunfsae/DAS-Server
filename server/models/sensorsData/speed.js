import mongoose from 'mongoose';
import extendSchema from 'mongoose-extend-schema';
import sensorBaseSchema from './sensorBase.js';

const speedSchema = extendSchema(sensorBaseSchema, { 
    value: mongoose.Decimal128
});

const Speed = mongoose.model('Speed', speedSchema);

export default Speed;