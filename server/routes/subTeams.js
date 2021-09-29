import express from 'express';
import {getSubTeams, createSubTeam} from '../controllers/subTeams.js';

const router = express.Router();

router.get('/', getSubTeams);
router.post('/', createSubTeam);


export default router; 