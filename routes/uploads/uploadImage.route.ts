// routes/uploads/uploadImage.route.ts
import express from 'express';
import { createMulterUpload } from '../../src/utils/upload.utils';
import { uploadImage } from '../../src/controllers/upload.controller';

const router = express.Router();
const imageUpload = createMulterUpload('../database/uploads/', /jpg|jpeg|png/);

router.post('/api/uploadImage', imageUpload.single('image'), uploadImage);

module.exports = router;