import express from 'express';
import { saveDataController } from '../../src/controllers/saveData.controller';

const router = express.Router();

router.post('/api/saveData', saveDataController);

module.exports = router;