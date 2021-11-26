import mongoose from 'mongoose';
import extendSchema from 'mongoose-extend-schema';
import sensorBaseSchema from './sensorBase.js';

const GGSSuspensionSchema = extendSchema(sensorBaseSchema, { 
    latitude: mongoose.Decimal128,
    longitude: mongoose.Decimal128
});

const GGSuspension = mongoose.model('GGSuspension', GGSSuspensionSchema);

export default GGSuspension;