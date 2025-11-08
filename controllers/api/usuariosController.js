import { Usuario } from '../../models/index.js';
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 5;

export const crearUsuario = async (req, res) => {
  try {
    const { email, password, nombre } = req.body;
    
    const usuarioExistente = await Usuario.findOne({ where: { email } });
    
    if (usuarioExistente) {
      return res.status(400).json({
        success: false,
        error: 'El email ya está registrado'
      });
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const usuario = await Usuario.create({
      email,
      password: hashedPassword,
      nombre
    });

    const usuarioRespuesta = {
      id: usuario.id,
      email: usuario.email,
      nombre: usuario.nombre,
      createdAt: usuario.createdAt
    };

    res.status(201).json({
      success: true,
      data: usuarioRespuesta
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error al crear usuario',
      details: error.message
    });
  }
};




