import express from 'express';
import { Usuario } from '../../models/index.js';
import bcrypt from 'bcrypt';
import { generarToken } from '../../config/jwt.js';

const router = express.Router();

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Email y contraseña son requeridos'
      });
    }

    const usuario = await Usuario.findOne({ where: { Email: email } });

    if (!usuario) {
      return res.status(401).json({
        success: false,
        error: 'Credenciales incorrectas'
      });
    }

    const passwordValido = await bcrypt.compare(password, usuario.Password);

    if (!passwordValido) {
      return res.status(401).json({
        success: false,
        error: 'Credenciales incorrectas'
      });
    }

    const token = generarToken({
      usuarioId: usuario.Id,
      usuarioNombre: usuario.Nombre,
      usuarioEmail: usuario.Email
    });

    res.json({
      success: true,
      data: {
        token,
        usuario: {
          id: usuario.Id,
          nombre: usuario.Nombre,
          email: usuario.Email
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error al procesar login',
      details: error.message
    });
  }
});

export default router;

