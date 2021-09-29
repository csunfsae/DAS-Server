import mongoose from 'mongoose';
import extendSchema from 'mongoose-extend-schema';
import sensorBaseSchema from '../sensorBase.js';

const FRTireTempSchema = extendSchema(sensorBaseSchema, { 
    value: mongoose.Decimal128,    
});

const FRTireTemp = mongoose.model('FRTireTemp', FRTireTempSchema);

export default FRTireTemp;