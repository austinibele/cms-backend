// src/services/signup.service.ts

import bcrypt from 'bcrypt';
import { UserRepository } from '../repository/user.repository';
import { AccountCredentials } from '../types/auth';
import { AuthService } from './auth.service';

export class SignupService {
  constructor(private userRepository: UserRepository) {}

  async signUp({ phoneNumber, email, password }: AccountCredentials) {
    // Trim inputs
    phoneNumber = phoneNumber.trim();
    email = email.trim();
    password = password.trim();

    // Generate a unique user_id
    const user_id = email + Date.now().toString();

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user into the database
    await this.userRepository.createUser(user_id, hashedPassword, email, phoneNumber);
    
    // Generate token using AuthService
    const authService = new AuthService(this.userRepository);
    const payload = { user_id, email, paid: false };
    
    return {
      user_id,
      email,
      paid: false,
      token: authService.generateToken(payload)
    };
  }
}