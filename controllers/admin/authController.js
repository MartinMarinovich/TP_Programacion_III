import { Usuario } from '../../models/index.js';
import bcrypt from 'bcrypt';
import Endpoints from '../../config/endpoints.js';
import { generarToken } from '../../config/jwt.js';

export const mostrarLogin = (req, res) => {
  res.render('admin/login', {
    error: null,
    Endpoints
  });
};

export const procesarLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.render('admin/login', {
        error: 'Email y contraseña son requeridos',
        Endpoints
      });
    }

    const usuario = await Usuario.findOne({ where: { Email: email } });
    
    if (!usuario) {
      return res.render('admin/login', {
        error: 'Credenciales incorrectas',
        Endpoints
      });
    }

    const passwordValido = await bcrypt.compare(password, usuario.Password);
    
    if (!passwordValido) {
      return res.render('admin/login', {
        error: 'Credenciales incorrectas',
        Endpoints
      });
    }

    const token = generarToken({
      usuarioId: usuario.Id,
      usuarioNombre: usuario.Nombre,
      usuarioEmail: usuario.Email
    });

    res.cookie('token', token, {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: 'lax'
    });

    res.redirect(Endpoints.admin.dashboard.ver);
  } catch (error) {
    res.render('admin/login', {
      error: 'Error al procesar login',
      Endpoints
    });
  }
};

export const logout = (req, res) => {
  res.clearCookie('token');
  res.redirect(Endpoints.admin.auth.login);
};

