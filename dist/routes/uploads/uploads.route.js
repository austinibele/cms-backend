"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// routes/uploads/getImage.route.ts
const express_1 = __importDefault(require("express"));
const retrieveFilepath_controller_1 = require("../../src/controllers/retrieveFilepath.controller");
const fileExists_1 = require("../../src/middleware/fileExists");
const router = express_1.default.Router();
const uploadsDir = '../database/uploads';
router.get('/api/database/uploads/:imageName', (0, fileExists_1.fileExists)(uploadsDir), retrieveFilepath_controller_1.retrieveFilepath);
module.exports = router;
