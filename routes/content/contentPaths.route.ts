import express from 'express';
import { getContentPathsController } from '../../src/controllers/contentPaths.controller';

const router = express.Router();

router.get('/api/contentPaths/:contentOption', getContentPathsController);

module.exports = router;