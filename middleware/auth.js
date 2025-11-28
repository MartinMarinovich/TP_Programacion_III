import { verificarToken } from '../config/jwt.js';
import Endpoints from '../config/endpoints.js';

export const verificarJWT = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1] || req.headers['x-access-token'];

  if (!token) {
    return res.status(401).json({
      success: false,
      error: 'Token no proporcionado'
    });
  }

  const decoded = verificarToken(token);

  if (!decoded) {
    return res.status(401).json({
      success: false,
      error: 'Token inválido o expirado'
    });
  }

  req.usuario = decoded;
  next();
};

export const verificarJWTAdmin = (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.redirect(Endpoints.admin.auth.login);
  }

  const decoded = verificarToken(token);

  if (!decoded) {
    res.clearCookie('token');
    return res.redirect(Endpoints.admin.auth.login);
  }

  req.usuario = decoded;
  next();
};

