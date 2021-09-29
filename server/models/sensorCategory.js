import mongoose from 'mongoose';

const sensorCategorySchema = mongoose.Schema({
    name: String,
    createdAt: {
        type: Date,
        default: new Date()
    }
});

const SensorCategory = mongoose.model('SensorCategory', sensorCategorySchema);

export default SensorCategory;