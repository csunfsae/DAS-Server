import mongoose from 'mongoose';

const sensorSchema = mongoose.Schema({
    name: String,
    type: mongoose.ObjectId,
    category: mongoose.ObjectId,
    createdAt: {
        type: Date,
        default: new Date()
    }
}, {strict: false});

const Sensor = mongoose.model('Sensor', sensorSchema);

export default Sensor;