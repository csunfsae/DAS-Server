import mongoose from 'mongoose';
const todaysDate = new Date().toISOString();

const sensorBaseSchema = new mongoose.Schema({
    lapTime: mongoose.Decimal128,
    sessionNumber: Number,
    lapNumber: Number,
    date: {
        type: String,
        default: todaysDate.substr(0, todaysDate.indexOf("T"))
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
});


export default sensorBaseSchema;