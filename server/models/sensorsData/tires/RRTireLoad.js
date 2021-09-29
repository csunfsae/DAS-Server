import mongoose from 'mongoose';
import extendSchema from 'mongoose-extend-schema';
import sensorBaseSchema from '../sensorBase.js';

const RRTireLoadSchema = extendSchema(sensorBaseSchema, { 
    value: mongoose.Decimal128,    
});

const RRTireLoad = mongoose.model('RRTireLoad', RRTireLoadSchema);

export default RRTireLoad;