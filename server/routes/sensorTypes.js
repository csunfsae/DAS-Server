import express from 'express';
import {getSensorTypes, createSensorType} from '../controllers/sensorTypes.js';

const router = express.Router();

router.get('/', getSensorTypes);
router.post('/', createSensorType);


export default router; 