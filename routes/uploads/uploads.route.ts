// routes/uploads/getImage.route.ts
import express from 'express';
import { retrieveFilepath } from '../../src/controllers/retrieveFilepath.controller';
import { fileExists } from '../../src/middleware/fileExists';

const router = express.Router();
const uploadsDir = '../database/uploads';

router.get('/api/database/uploads/:imageName', fileExists(uploadsDir), retrieveFilepath);

module.exports = router;