// src/controllers/login.controller.ts

import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';

export class LoginController {
  constructor(private authService: AuthService) {}

  async login(req: Request, res: Response) {
    const { phoneNumber, email, password } = req.body;
    try {
      const user = await this.authService.authenticateUser({ phoneNumber, email, password });
      res.status(200).json(user);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}