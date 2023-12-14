"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// routes/pages.route.ts
const express_1 = __importDefault(require("express"));
const page_controller_1 = require("../../src/controllers/page.controller");
const router = express_1.default.Router();
router.get('/api/pages', page_controller_1.getPage);
module.exports = router;
