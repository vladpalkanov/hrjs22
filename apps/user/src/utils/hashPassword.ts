import * as bcrypt from 'bcrypt';

export function hashPassword(password: string) {
  return bcrypt.hash(password, 10);
}
