"use strict";
// routes/login.route.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const login_controller_1 = require("../../src/controllers/login.controller");
const auth_service_1 = require("../../src/services/auth.service");
const user_repository_1 = require("../../src/repository/user.repository");
const db_1 = __importDefault(require("../../src/services/db"));
const userRepository = new user_repository_1.UserRepository(db_1.default);
const authService = new auth_service_1.AuthService(userRepository);
const loginController = new login_controller_1.LoginController(authService);
router.post('/api/login', loginController.login.bind(loginController));
module.exports = router;
