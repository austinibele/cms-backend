import express from 'express';
import { deleteDataController } from '../../src/controllers/deleteData.controller';

const router = express.Router();

router.post('/api/deleteData', deleteDataController);

module.exports = router;