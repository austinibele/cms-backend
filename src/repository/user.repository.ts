// src/repository/user.repository.ts
const { Pool } = require('pg');

export class UserRepository {
  constructor(private pool: typeof Pool) {}

  async findUserByEmail(email: string) {
    return this.pool.query('SELECT * FROM users WHERE email = $1', [email]);
  }

  async findUserByPhoneNumber(phoneNumber: string) {
    return this.pool.query('SELECT * FROM users WHERE phonenumber = $1', [phoneNumber]);
  }

  async userExistsByEmail(email: string): Promise<boolean> {
    const res = await this.pool.query('SELECT * FROM users WHERE email = $1', [email]);
    return res.rows.length > 0;
  }

  async userExistsByPhoneNumber(phoneNumber: string): Promise<boolean> {
    const res = await this.pool.query('SELECT * FROM users WHERE phonenumber = $1', [phoneNumber]);
    return res.rows.length > 0;
  }

  async createUser(user_id: string, hashedPassword: string, email: string, phoneNumber: string): Promise<void> {
    await this.pool.query('INSERT INTO users (user_id, passhash, email, phonenumber, paid) VALUES ($1, $2, $3, $4, $5)', [user_id, hashedPassword, email, phoneNumber, false]);
  }
}