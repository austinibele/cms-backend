"use strict";
// routes/signUp.route.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const signup_controller_1 = require("../../src/controllers/signup.controller");
const signup_service_1 = require("../../src/services/signup.service");
const user_repository_1 = require("../../src/repository/user.repository");
const db_1 = __importDefault(require("../../src/services/db"));
const userRepository = new user_repository_1.UserRepository(db_1.default);
const signupService = new signup_service_1.SignupService(userRepository);
const signupController = new signup_controller_1.SignupController(signupService);
router.post('/api/signUp', signupController.signUp.bind(signupController));
module.exports = router;
