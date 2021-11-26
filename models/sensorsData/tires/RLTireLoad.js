import mongoose from 'mongoose';
import extendSchema from 'mongoose-extend-schema';
import sensorBaseSchema from '../sensorBase.js';

const RLTireLoadSchema = extendSchema(sensorBaseSchema, { 
    value: mongoose.Decimal128,    
});

const RLTireLoad = mongoose.model('RLTireLoad', RLTireLoadSchema);

export default RLTireLoad;