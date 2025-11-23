import express from 'express';
import { mostrarLogin, procesarLogin, logout } from '../../controllers/admin/authController.js';

const router = express.Router();

router.get('/login', mostrarLogin);
router.post('/login', procesarLogin);
router.get('/logout', logout);

export default router;

