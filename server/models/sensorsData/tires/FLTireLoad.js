import mongoose from 'mongoose';
import extendSchema from 'mongoose-extend-schema';
import sensorBaseSchema from '../sensorBase.js';

const FLTireLoadSchema = extendSchema(sensorBaseSchema, { 
    value: mongoose.Decimal128,    
});

const FLTireLoad = mongoose.model('FLTireLoad', FLTireLoadSchema);

export default FLTireLoad;