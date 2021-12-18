import { request } from "express";
import { OAuth2Client } from "google-auth-library";
import User from "../models/User.js";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find({ status: { $ne: "deleted" } });
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    await User.updateOne({ _id: req.userId, role: req.role, team: req.team });
    res.status(200);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// export const deleteUser = async (req, res) => {
//   try {
//     const user = await User.updateOne({ _id: req.userId, status: "deleted" });
//     res.status(200).json(user);
//   } catch (error) {
//     res.status(404).json({ message: error.message });
//   }
// };

// export const deleteUser = async (req, res) => {
//   //   res.json(req.userId);
//   try {
//     const user = await User.findByIdAndUpdate(
//       { _id: ObjectId(req.body.userId) },
//       { status: "deleted" }
//     );
//     res.status(200).json(user);
//   } catch (error) {
//     res.status(404).json({ message: error.message });
//   }
// };

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      { _id: req.body.userId },
      { status: "deleted" }
    );
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const authUser = async (req, res) => {
  try {
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

    const token = req.query.tokenId;
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.CLIENT_ID,
    });

    const { sub, email } = ticket.getPayload();

    const user = await User.findOne({ googleId: sub, email: email });

    if (user != null) {
      req.session.userId = user.id;
      res.status(200).json(token);
    } else {
      throw Error("Unable to find user");
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const logoutUser = async (req, res) => {
  await req.session.destroy();
  res.status(200);
  res.json({
    message: "Logged out successfully",
  });
};

export const checkUser = async (req, res) => {
  const user = await User.findOne({ _id: req.session.userId });
  res.status(200).json(user);
};

export const createUser = (req, res) => {
  try {
    const tokenId = req.body.tokenId;
    const googleId = req.body.googleId;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const image = req.body.image;
    const newUser = new User({
      tokenId,
      googleId,
      firstName,
      lastName,
      email,
      image,
    });

    newUser.save();
    res.status(200).json(newUser);
  } catch (error) {
    console.log(error);
  }
};
