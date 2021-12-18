import express from "express";
import {
  getUsers,
  authUser,
  createUser,
  logoutUser,
  checkUser,
  updateUser,
  deleteUser,
} from "../controllers/users.js";

const router = express.Router();

router.get("/", getUsers);
router.get("/google/user", authUser);
router.post("/", createUser);
router.post("/update", updateUser);
router.post("/delete", deleteUser);
router.get("/google/logout", logoutUser);
router.get("/me", checkUser);

export default router;
