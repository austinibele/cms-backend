"use strict";
// src/services/signup.service.ts
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
exports.SignupService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const auth_service_1 = require("./auth.service");
class SignupService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    signUp({ phoneNumber, email, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            // Trim inputs
            phoneNumber = phoneNumber.trim();
            email = email.trim();
            password = password.trim();
            // Generate a unique user_id
            const user_id = email + Date.now().toString();
            // Hash the password
            const hashedPassword = yield bcrypt_1.default.hash(password, 10);
            // Insert the new user into the database
            yield this.userRepository.createUser(user_id, hashedPassword, email, phoneNumber);
            // Generate token using AuthService
            const authService = new auth_service_1.AuthService(this.userRepository);
            const payload = { user_id, email, paid: false };
            return {
                user_id,
                email,
                paid: false,
                token: authService.generateToken(payload)
            };
        });
    }
}
exports.SignupService = SignupService;
