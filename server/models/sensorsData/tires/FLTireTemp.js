import mongoose from 'mongoose';
import extendSchema from 'mongoose-extend-schema';
import sensorBaseSchema from '../sensorBase.js';

const FLTireTempSchema = extendSchema(sensorBaseSchema, { 
    value: mongoose.Decimal128,    
});

const FLTireTemp = mongoose.model('FLTireTemp', FLTireTempSchema);

export default FLTireTemp;