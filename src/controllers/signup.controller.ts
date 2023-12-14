// src/controllers/signup.controller.ts

import { Request, Response } from 'express';
import { SignupService } from '../services/signup.service';

export class SignupController {
  constructor(private signupService: SignupService) {}

  async signUp(req: Request, res: Response) {
    const { phoneNumber, email, password } = req.body;
    
    try {
      const newUser = await this.signupService.signUp({ phoneNumber, email, password });
      res.status(200).json(newUser);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}