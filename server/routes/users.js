import express from 'express';
import { getUsers, loginUser, createUser, logoutUser, getUserById, validateNewUserEmail } from '../controllers/users.js';

const router = express.Router();

router.get('/google/login', loginUser);
router.get('/google/logout', logoutUser)
router.get('/authorize', getUserById)
router.get('/google/newUser', validateNewUserEmail)
router.post('/create', createUser);
router.get('/list', getUsers);

export default router;