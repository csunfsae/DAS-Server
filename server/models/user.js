import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  googleId: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "Basic",
  },
  team: {
    type: String,
    default: "none",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  status: {
    type: String,
    default: "Pending",
  },
  deleted: {
    type: Boolean,
    default: 0,
  },
});

const User = mongoose.model("User", UserSchema);

export default User;
