"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const saveData_controller_1 = require("../../src/controllers/saveData.controller");
const router = express_1.default.Router();
router.post('/api/saveData', saveData_controller_1.saveDataController);
module.exports = router;
