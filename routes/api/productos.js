import express from 'express';
import {
  listarProductosActivos,
  listarTodosLosProductos,
  obtenerProductoPorId,
  crearProducto,
  modificarProducto,
  activarProducto,
  desactivarProducto
} from '../../controllers/api/productosController.js';
import { validarProducto } from '../../middleware/validaciones.js';
import { upload } from '../../middleware/upload.js';

const router = express.Router();

router.get('/', listarProductosActivos);
router.get('/todos', listarTodosLosProductos);
router.get('/:id', obtenerProductoPorId);
router.post('/', upload.single('imagen'), validarProducto, crearProducto);
router.put('/:id', upload.single('imagen'), validarProducto, modificarProducto);
router.patch('/:id/activar', activarProducto);
router.patch('/:id/desactivar', desactivarProducto);

export default router;

