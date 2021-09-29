import mongoose from 'mongoose';
import extendSchema from 'mongoose-extend-schema';
import sensorBaseSchema from '../sensorBase.js';

const RLTireTempSchema = extendSchema(sensorBaseSchema, { 
    value: mongoose.Decimal128,    
});

const RLTireTemp = mongoose.model('RLTireTemp', RLTireTempSchema);

export default RLTireTemp;