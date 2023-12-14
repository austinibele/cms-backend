"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fetchContent_controller_1 = require("../../src/controllers/fetchContent.controller");
const router = express_1.default.Router();
router.get('/api/fetchContent/:contentOption/:segment', fetchContent_controller_1.fetchContentController);
module.exports = router;
