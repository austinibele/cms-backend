// routes/login.route.ts

import express from 'express';
const router = express.Router();
import { LoginController } from '../../src/controllers/login.controller';
import { AuthService } from '../../src/services/auth.service';
import { UserRepository } from '../../src/repository/user.repository';
import pool from '../../src/services/db';

const userRepository = new UserRepository(pool);
const authService = new AuthService(userRepository);
const loginController = new LoginController(authService);

router.post('/api/login', loginController.login.bind(loginController));

module.exports = router;