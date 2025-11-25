import express from 'express';
import {
  crearVenta,
  listarVentas,
  obtenerVentaPorId
} from '../../controllers/api/ventasController.js';
import { validarVenta } from '../../middleware/validaciones.js';

const router = express.Router();

router.post('/', validarVenta, crearVenta);
router.get('/', listarVentas);
router.get('/:id', obtenerVentaPorId);

export default router;

