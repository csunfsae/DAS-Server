import express from 'express';
import { getUsers, authUser, createUser } from '../controllers/users.js';

const router = express.Router();

router.get('/', getUsers);
router.get('/user', authUser);
router.post('/', createUser);

export default router;