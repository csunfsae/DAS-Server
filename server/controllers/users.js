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
      // throw Error("Unable to find user");
        if (user == null) {
            throw Error("Unable to find user. Make sure you are signing in with your CSUN account.");
        }

        if (user.status == "Pending") {
            throw Error("The status of this account is Pending. Please contact an administrator.");
        }

        if (user.status == "Deleted") {
            throw Error("Your account has been deleted. Please contact an administrator.");
        }

        req.session.userId = user.id;
        res.status(200).json(token);
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
export const registerUser = async (req, res) => {
    try {

        const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

        const token = req.query.tokenId;
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.CLIENT_ID
        });

        const { sub, email, given_name, family_name } = ticket.getPayload();

        if (!email.endsWith("@my.csun.edu" || !email.endsWith("@csun.edu"))) {
            throw Error("Must have a CSUN email address to register.");
        }

        const user = await User.findOne({ googleId: sub, email: email });

        if (user != null) {
            throw Error(`User already exists. Current status: ${user.status}`);
        }

        const googleId = sub;
        const firstName = given_name;
        const lastName = family_name;

        const newUser = new User({
            googleId,
            firstName,
            lastName,
            email
        });

        newUser.save(function (err, result) {
            if (result) {
                res.status(200).json(result)
            } else if (err) {
                res.status(404).json({ error: "Error saving user. Please try again or contact an administrator." });
            }
        });

    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};
