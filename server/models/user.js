import mongoose from 'mongoose';

const UserSchema = mongoose.Schema({
    googleId: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "Basic"
    },
    team: {
        type: String,
        default: "Unassigned"
    },
    status: {
        type: String,
        default: "Pending"
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

const User = mongoose.model('User', UserSchema);

export default User;