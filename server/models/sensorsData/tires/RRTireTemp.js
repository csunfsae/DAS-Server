import mongoose from 'mongoose';
import extendSchema from 'mongoose-extend-schema';
import sensorBaseSchema from '../sensorBase.js';

const RRTireTempSchema = extendSchema(sensorBaseSchema, { 
    value: mongoose.Decimal128,    
});

const RRTireTemp = mongoose.model('RRTireTemp', RRTireTempSchema);

export default RRTireTemp;