import express from 'express';
import { fetchContentController } from '../../src/controllers/fetchContent.controller';

const router = express.Router();

router.get('/api/fetchContent/:contentOption/:segment', fetchContentController);

module.exports = router;