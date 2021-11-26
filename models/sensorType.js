import mongoose from 'mongoose';

const sensorTypeSchema = mongoose.Schema({
    name: String,
    createdAt: {
        type: Date,
        default: new Date()
    }
});

const SensorType = mongoose.model('SensorType', sensorTypeSchema);

export default SensorType;