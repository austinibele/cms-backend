"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// routes/uploads/uploadImage.route.ts
const express_1 = __importDefault(require("express"));
const upload_utils_1 = require("../../src/utils/upload.utils");
const upload_controller_1 = require("../../src/controllers/upload.controller");
const router = express_1.default.Router();
const imageUpload = (0, upload_utils_1.createMulterUpload)('../database/uploads/', /jpg|jpeg|png/);
router.post('/api/uploadImage', imageUpload.single('image'), upload_controller_1.uploadImage);
module.exports = router;
