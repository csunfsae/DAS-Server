import express from 'express';
import {getSensorCategories, createSensorCategory} from '../controllers/sensorCategories.js';

const router = express.Router();

router.get('/', getSensorCategories);
router.post('/', createSensorCategory);


export default router; 