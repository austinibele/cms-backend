// @ts-nocheck
import jwt from 'jsonwebtoken';
require("dotenv").config({ path: "../cms/.env.local" });
import { user } from '../types/auth';
import { Request } from '../types/requests';

function authenticateToken( { req, res }: Request, next: any) {
    // Get token from the Authorization header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) {
      // If no token, return 401 Unauthorized
      return res.sendStatus(401);
    }
  
    // If a token is provided, verify it
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err: any, user: user) => {
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
