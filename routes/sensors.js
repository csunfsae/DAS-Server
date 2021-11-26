import express from 'express';
import {getSensors, createSensor} from '../controllers/sensors.js';

const router = express.Router();

router.get('/', getSensors);
router.post('/', createSensor);

export default router; 