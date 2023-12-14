"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
// src/repository/user.repository.ts
const { Pool } = require('pg');
class UserRepository {
    constructor(pool) {
        this.pool = pool;
    }
    findUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.pool.query('SELECT * FROM users WHERE email = $1', [email]);
        });
    }
    findUserByPhoneNumber(phoneNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.pool.query('SELECT * FROM users WHERE phonenumber = $1', [phoneNumber]);
        });
    }
    userExistsByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.pool.query('SELECT * FROM users WHERE email = $1', [email]);
            return res.rows.length > 0;
        });
    }
    userExistsByPhoneNumber(phoneNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.pool.query('SELECT * FROM users WHERE phonenumber = $1', [phoneNumber]);
            return res.rows.length > 0;
        });
    }
    createUser(user_id, hashedPassword, email, phoneNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.pool.query('INSERT INTO users (user_id, passhash, email, phonenumber, paid) VALUES ($1, $2, $3, $4, $5)', [user_id, hashedPassword, email, phoneNumber, false]);
        });
    }
}
exports.UserRepository = UserRepository;
