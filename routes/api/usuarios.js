import express from 'express';
import { crearUsuario } from '../../controllers/api/usuariosController.js';
import { validarUsuario } from '../../middleware/validaciones.js';

const router = express.Router();

router.post('/', validarUsuario, crearUsuario);

export default router;

