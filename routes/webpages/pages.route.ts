// routes/pages.route.ts
import express from 'express';
import { getPage } from '../../src/controllers/page.controller';

const router = express.Router();

router.get('/api/pages', getPage);

module.exports = router;