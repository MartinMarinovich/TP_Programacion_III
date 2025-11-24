import { Producto } from '../../models/index.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Endpoints from '../../config/endpoints.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const mostrarDashboard = async (req, res) => {
  try {
    const productos = await Producto.findAll({
      order: [['Tipo', 'ASC'], ['CreatedAt', 'DESC']]
    });

    const remeras = productos.filter(p => p.Tipo === 'remera');
    const pantalones = productos.filter(p => p.Tipo === 'pantalon');

    res.render('admin/dashboard', {
      usuario: req.usuario,
      remeras,
      pantalones,
      mensaje: req.query.mensaje || null,
      error: req.query.error || null,
      Endpoints
    });
  } catch (error) {
    res.render('admin/dashboard', {
      usuario: req.usuario,
      remeras: [],
      pantalones: [],
      mensaje: null,
      error: 'Error al cargar productos',
      Endpoints
    });
  }
};

export const mostrarFormularioNuevo = (req, res) => {
  res.render('admin/producto-form', {
    usuario: req.usuario,
    producto: null,
    accion: 'nuevo',
    error: null,
    Endpoints,
    rutaFormulario: Endpoints.admin.productos.nuevo
  });
};

export const procesarNuevoProducto = async (req, res) => {
  try {
    const { nombre, precio, tipo, color, descripcion } = req.body;
    const imagen = req.file ? `/uploads/productos/${req.file.filename}` : null;

    await Producto.create({
      Nombre: nombre,
      Precio: precio,
      Imagen: imagen,
      Tipo: tipo,
      Color: color,
      Descripcion: descripcion,
      Activo: true
    });

    res.redirect(`${Endpoints.admin.dashboard.ver}?mensaje=Producto creado exitosamente`);
  } catch (error) {
    res.render('admin/producto-form', {
      usuario: req.usuario,
      producto: null,
      accion: 'nuevo',
      error: 'Error al crear producto: ' + error.message,
      Endpoints,
      rutaFormulario: Endpoints.admin.productos.nuevo
    });
  }
};

export const mostrarFormularioEditar = async (req, res) => {
  try {
    const { id } = req.params;
    const producto = await Producto.findByPk(id);

    if (!producto) {
      return res.redirect(`${Endpoints.admin.dashboard.ver}?error=Producto no encontrado`);
    }

    res.render('admin/producto-form', {
      usuario: req.usuario,
      producto,
      accion: 'editar',
      error: null,
      Endpoints,
      rutaFormulario: Endpoints.admin.productos.editar(id)
    });
  } catch (error) {
    res.redirect(`${Endpoints.admin.dashboard.ver}?error=Error al cargar producto`);
  }
};

export const procesarEdicionProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, precio, tipo, color, descripcion } = req.body;

    const producto = await Producto.findByPk(id);

    if (!producto) {
      return res.redirect(`${Endpoints.admin.dashboard.ver}?error=Producto no encontrado`);
    }

    const datosActualizados = {
      Nombre: nombre,
      Precio: precio,
      Tipo: tipo,
      Color: color,
      Descripcion: descripcion
    };

    if (req.file) {
      if (producto.Imagen) {
        const imagenAnterior = path.join(__dirname, '../../public', producto.Imagen);
        if (fs.existsSync(imagenAnterior)) {
          fs.unlinkSync(imagenAnterior);
        }
      }
      datosActualizados.Imagen = `/uploads/productos/${req.file.filename}`;
    }

    await producto.update(datosActualizados);

    res.redirect(`${Endpoints.admin.dashboard.ver}?mensaje=Producto actualizado exitosamente`);
  } catch (error) {
    res.redirect(`${Endpoints.admin.productos.editar(req.params.id)}?error=Error al actualizar producto`);
  }
};

export const activarProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const producto = await Producto.findByPk(id);

    if (!producto) {
      return res.redirect(`${Endpoints.admin.dashboard.ver}?error=Producto no encontrado`);
    }

    await producto.update({ Activo: true });

    res.redirect(`${Endpoints.admin.dashboard.ver}?mensaje=Producto activado exitosamente`);
  } catch (error) {
    res.redirect(`${Endpoints.admin.dashboard.ver}?error=Error al activar producto`);
  }
};

export const desactivarProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const producto = await Producto.findByPk(id);

    if (!producto) {
      return res.redirect(`${Endpoints.admin.dashboard.ver}?error=Producto no encontrado`);
    }

    await producto.update({ Activo: false });

    res.redirect(`${Endpoints.admin.dashboard.ver}?mensaje=Producto desactivado exitosamente`);
  } catch (error) {
    res.redirect(`${Endpoints.admin.dashboard.ver}?error=Error al desactivar producto`);
  }
};

