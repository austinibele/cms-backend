"use strict";
// src/services/auth.service.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class AuthService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    authenticateUser({ phoneNumber, email, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            // Normalize email
            email = email ? email.toLowerCase() : '';
            let res;
            // Check if user exists
            if (email && !phoneNumber) {
                res = yield this.userRepository.findUserByEmail(email);
            }
            else if (!email && phoneNumber) {
                res = yield this.userRepository.findUserByPhoneNumber(phoneNumber);
            }
            else if (email && phoneNumber) {
                throw new Error(`Please enter either an email or a phone number, not both`);
            }
            else {
                throw new Error(`Please enter either an email or a phone number`);
            }
            if (res.rows.length === 0) {
                throw new Error('User not found');
            }
            // Compare the password
            const user = res.rows[0];
            password = password + (process.env.SALT_STRING || 'default_salt');
            const validPassword = yield bcrypt_1.default.compare(password, user.passhash);
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
        });
    }
    generateToken(payload) {
        const secretOrPrivateKey = process.env.JWT_SECRET_KEY || 'default_jwt_secret_key';
        const options = { expiresIn: '3h' };
        return jsonwebtoken_1.default.sign(payload, secretOrPrivateKey, options);
    }
}
exports.AuthService = AuthService;
