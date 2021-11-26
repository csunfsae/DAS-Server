import mongoose from 'mongoose';
import extendSchema from 'mongoose-extend-schema';
import sensorBaseSchema from './sensorBase.js';

const GPSLocationSchema = extendSchema(sensorBaseSchema, { 
    latitude: mongoose.Decimal128,
    longitude: mongoose.Decimal128
});

const GPSLocation = mongoose.model('GPSLocation', GPSLocationSchema);

export default GPSLocation;