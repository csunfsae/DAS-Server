import mongoose from 'mongoose';

const todaysDate = new Date().toISOString();

const driveDaySchema = mongoose.Schema({
    date: {
        type: String,
        default: todaysDate.substr(0, todaysDate.indexOf("T"))
    },
    sessions: [
        {
            number: Number,
            laps:  [
                {
                    lap_number: Number,
                    lap_time: String
                }
            ]
        }
    ],
    createdAt: {
        type: Date,
        default: new Date()
    }
});

const DriveDay = mongoose.model('DriveDay', driveDaySchema);

export default DriveDay;