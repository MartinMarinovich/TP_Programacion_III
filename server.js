import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import cookieParser from 'cookie-parser';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { sequelize, conectarDB } from './database/index.js';
import { Usuario } from './models/index.js';

import Endpoints from './config/endpoints.js';

import productosApiRouter from './routes/api/productos.js';
import ventasApiRouter from './routes/api/ventas.js';
import usuariosApiRouter from './routes/api/usuarios.js';
import authApiRouter from './routes/api/auth.js';

import authRouter from './routes/admin/auth.js';
import dashboardRouter from './routes/admin/dashboard.js';

import { verificarJWTAdmin } from './middleware/auth.js';

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(Endpoints.api.productos.base, productosApiRouter);
app.use(Endpoints.api.ventas.base, ventasApiRouter);
app.use(Endpoints.api.usuarios.base, usuariosApiRouter);
app.use('/api/auth', authApiRouter);

app.use('/admin', authRouter);
app.use('/admin', verificarJWTAdmin, dashboardRouter);

app.get('/cliente', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'html', 'index.html'));
});

app.get('/productos', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'html', 'productos.html'));
});

app.get('/carrito', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'html', 'carrito.html'));
});

app.get('/ticket', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'html', 'ticket.html'));
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'html', 'index.html'));
});

const inicializarDatos = async () => {
  try {
    const usuarioExistente = await Usuario.findOne({ where: { Email: 'sysadmin@pilchas.com' } });
    
    if (!usuarioExistente) {
      const response = await fetch(`http://localhost:${PORT}/api/usuarios`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: 'sysadmin@pilchas.com',
          password: 'admin123',
          nombre: 'Administrador Sistema'
        })
      });
    
    }
  } catch (error) {
    console.error('Error al inicializar datos:', error);
  }
};

const iniciarServidor = async () => {
  try {
    await conectarDB();
    await sequelize.sync({ alter: false });
    
    app.listen(PORT, async () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
      await inicializarDatos();
    });
    
  } catch (error) {
    console.error('Error al iniciar servidor:', error);
    process.exit(1);
  }
};

iniciarServidor();




