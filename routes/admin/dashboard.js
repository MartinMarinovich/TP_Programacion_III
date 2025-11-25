import express from 'express';
import {
  mostrarDashboard,
  mostrarFormularioNuevo,
  procesarNuevoProducto,
  mostrarFormularioEditar,
  procesarEdicionProducto,
  activarProducto,
  desactivarProducto
} from '../../controllers/admin/dashboardController.js';
import { upload } from '../../middleware/upload.js';

const router = express.Router();

router.get('/dashboard', mostrarDashboard);
router.get('/productos/nuevo', mostrarFormularioNuevo);
router.post('/productos/nuevo', upload.single('imagen'), procesarNuevoProducto);
router.get('/productos/editar/:id', mostrarFormularioEditar);
router.post('/productos/editar/:id', upload.single('imagen'), procesarEdicionProducto);
router.post('/productos/activar/:id', activarProducto);
router.post('/productos/desactivar/:id', desactivarProducto);

export default router;

