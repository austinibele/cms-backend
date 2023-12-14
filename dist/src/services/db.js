"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// server/services/db.js
const { Pool } = require('pg');
require("dotenv").config({ path: "../cms/.env.local" });
// Postgres Configuration
const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.POSTGRES_PORT,
    database: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
});
exports.default = pool;
