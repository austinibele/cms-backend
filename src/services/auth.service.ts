// src/services/auth.service.ts

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserRepository } from '../repository/user.repository';
import { AccountCredentials } from '../types/auth';

export class AuthService {
  constructor(private userRepository: UserRepository) {}

  async authenticateUser({ phoneNumber, email, password }: AccountCredentials) {
    // Normalize email
    email = email ? email.toLowerCase() : '';
    let res;

    // Check if user exists
    if (email && !phoneNumber) {
      res = await this.userRepository.findUserByEmail(email);
    } else if (!email && phoneNumber) {
      res = await this.userRepository.findUserByPhoneNumber(phoneNumber);
    } else if (email && phoneNumber) {
      throw new Error(`Please enter either an email or a phone number, not both`);
    } else {
      throw new Error(`Please enter either an email or a phone number`);
    }

    if (res.rows.length === 0) {
      throw new Error('User not found');
    }

    // Compare the password
    const user = res.rows[0];
    password = password + (process.env.SALT_STRING || 'default_salt');
    
    const validPassword = await bcrypt.compare(password, user.passhash);
  
    if (!validPassword) {
      throw new Error('Invalid password');
    }

    // Determine if the user is an admin
    const isAdmin = !!user.admin;

    // Generate a new token
    const payload = { 
      user_id: user.user_id, 
      email: user.email, 
      paid: user.paid,
      isAdmin
    };

    const token = this.generateToken(payload);

    return { 
      user_id: user.user_id, 
      email: user.email, 
      paid: user.paid,
      isAdmin,
      token 
    };
  }

  public generateToken(payload: any): string {
    const secretOrPrivateKey = process.env.JWT_SECRET_KEY || 'default_jwt_secret_key';
    const options = { expiresIn: '3h' };
    
    return jwt.sign(payload, secretOrPrivateKey, options);
  }
}