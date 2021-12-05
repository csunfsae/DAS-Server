import express from 'express';
import { getUsers, authUser, registerUser, logoutUser, checkUser } from '../controllers/users.js';

const router = express.Router();

router.get('/', getUsers);
router.get('/google/user', authUser);
router.get('/google/register', registerUser);
router.get('/google/logout', logoutUser)
router.get('/me', checkUser)

export default router;