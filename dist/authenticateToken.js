"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv").config({ path: "../.env" });
function authenticateToken({ req, res }, next) {
    // Get token from the Authorization header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) {
        // If no token, return 401 Unauthorized
        return res.sendStatus(401);
    }
    // If a token is provided, verify it
    jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) {
            // If the token is not valid or has expired, return 403 Forbidden
            return res.sendStatus(403);
        }
        // If the token is valid, attach the user_id to the request object
        req.user_id = user.user_id;
        next();
    });
}
module.exports = authenticateToken;
