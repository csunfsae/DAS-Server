import mongoose from 'mongoose';
import extendSchema from 'mongoose-extend-schema';
import sensorBaseSchema from './sensorBase.js';

const batteryVoltageSchema = extendSchema(sensorBaseSchema, { 
    value: mongoose.Decimal128
});

const BatteryVoltage = mongoose.model('BatteryVoltage', batteryVoltageSchema);

export default BatteryVoltage;