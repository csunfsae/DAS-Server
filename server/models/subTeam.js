import mongoose from 'mongoose';

const subTeamSchema = mongoose.Schema({
    name: String,
    createdAt: {
        type: Date,
        default: new Date()
    }
});

const SubTeam = mongoose.model('SubTeam', subTeamSchema);

export default SubTeam;