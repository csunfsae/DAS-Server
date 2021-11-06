import express from 'express';
import { getUsers, authUser, createUser, logoutUser, checkUser } from '../controllers/users.js';

const router = express.Router();

router.get('/', getUsers);
router.get('/google/user', authUser);
router.post('/', createUser);
router.get('/google/logout', logoutUser)
router.get('/me', checkUser)

export default router;