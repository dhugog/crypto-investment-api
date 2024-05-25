import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

const { JWT_SECRET = '' } = process.env;

export class Encryption {
  static async encryptPassword(password: string) {
    return bcrypt.hash(password, 12);
  }

  static async comparePassword(hashPassword: string, password: string) {
    return bcrypt.compare(password, hashPassword);
  }

  static generateToken(userId: number) {
    return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '1d' });
  }
}
