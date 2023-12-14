// routes/signUp.route.ts

import express from 'express';
const router = express.Router();
import { SignupController } from '../../src/controllers/signup.controller';
import { SignupService } from '../../src/services/signup.service';
import { UserRepository } from '../../src/repository/user.repository';
import pool from '../../src/services/db';

const userRepository = new UserRepository(pool);
const signupService = new SignupService(userRepository);
const signupController = new SignupController(signupService);

router.post('/api/signUp', signupController.signUp.bind(signupController));

module.exports = router;