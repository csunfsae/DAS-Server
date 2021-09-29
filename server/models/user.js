import mongoose from 'mongoose';
const userSchema = mongoose.Schema({
    name: String,
    email: String,
    teamYear: String,
    subTeam: mongoose.ObjectId,
    isAdmin: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
});

const User = mongoose.model('User', userSchema);

export default User;