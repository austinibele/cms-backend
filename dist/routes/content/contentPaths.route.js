"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const contentPaths_controller_1 = require("../../src/controllers/contentPaths.controller");
const router = express_1.default.Router();
router.get('/api/contentPaths/:contentOption', contentPaths_controller_1.getContentPathsController);
module.exports = router;
