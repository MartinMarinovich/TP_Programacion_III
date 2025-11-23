import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;

export const generarToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET_KEY, {
    expiresIn: JWT_EXPIRES_IN,
    algorithm: 'HS256'
  });
};

export const verificarToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET_KEY);
  } catch (error) {
    return null;
  }
};

export default {
  generarToken,
  verificarToken,
  JWT_SECRET_KEY,
  JWT_EXPIRES_IN
};

