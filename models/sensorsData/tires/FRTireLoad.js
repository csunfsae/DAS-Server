import mongoose from 'mongoose';
import extendSchema from 'mongoose-extend-schema';
import sensorBaseSchema from '../sensorBase.js';

const FRTireLoadSchema = extendSchema(sensorBaseSchema, { 
    value: mongoose.Decimal128,    
});

const FRTireLoad = mongoose.model('FRTireLoad', FRTireLoadSchema);

export default FRTireLoad;