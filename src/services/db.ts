// server/services/db.js
const { Pool } = require('pg');
require("dotenv").config({ path: "../cms/.env.local" });

// Postgres Configuration
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.POSTGRES_PORT, // If we are using a docker network, we will always connect to the container's internal port
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
});

export default pool;