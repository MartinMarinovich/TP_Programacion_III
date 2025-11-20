import { Producto } from '../../models/index.js';
import { Op } from 'sequelize';

export const listarProductosActivos = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const { count, rows } = await Producto.findAndCountAll({
      where: { Activo: true },
      limit,
      offset,
      order: [['CreatedAt', 'DESC']]
    });

    res.json({
      success: true,
      data: {
        productos: rows,
        pagination: {
          total: count,
          page,
          limit,
          totalPages: Math.ceil(count / limit)
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error al listar productos',
      details: error.message
    });
  }
};

export const listarTodosLosProductos = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const { count, rows } = await Producto.findAndCountAll({
      limit,
      offset,
      order: [['CreatedAt', 'DESC']]
    });

    res.json({
      success: true,
      data: {
        productos: rows,
        pagination: {
          total: count,
          page,
          limit,
          totalPages: Math.ceil(count / limit)
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error al listar productos',
      details: error.message
    });
  }
};

export const obtenerProductoPorId = async (req, res) => {
  try {
    const { id } = req.params;
    
    const producto = await Producto.findByPk(id);
    
    if (!producto) {
      return res.status(404).json({
        success: false,
        error: 'Producto no encontrado'
      });
    }

    res.json({
      success: true,
      data: producto
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error al obtener producto',
      details: error.message
    });
  }
};

export const crearProducto = async (req, res) => {
  try {
    const { nombre, precio, tipo, color, descripcion } = req.body;
    const imagen = req.file ? `/uploads/productos/${req.file.filename}` : null;

    const producto = await Producto.create({
      Nombre: nombre,
      Precio: precio,
      Imagen: imagen,
      Tipo: tipo,
      Color: color,
      Descripcion: descripcion,
      Activo: true
    });

    res.status(201).json({
      success: true,
      data: producto
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error al crear producto',
      details: error.message
    });
  }
};

export const modificarProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, precio, tipo, color, descripcion } = req.body;
    
    const producto = await Producto.findByPk(id);
    
    if (!producto) {
      return res.status(404).json({
        success: false,
        error: 'Producto no encontrado'
      });
    }

    const datosActualizados = {
      Nombre: nombre,
      Precio: precio,
      Tipo: tipo,
      Color: color,
      Descripcion: descripcion
    };

    if (req.file) {
      datosActualizados.Imagen = `/uploads/productos/${req.file.filename}`;
    }

    await producto.update(datosActualizados);

    res.json({
      success: true,
      data: producto
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error al modificar producto',
      details: error.message
    });
  }
};

export const activarProducto = async (req, res) => {
  try {
    const { id } = req.params;
    
    const producto = await Producto.findByPk(id);
    
    if (!producto) {
      return res.status(404).json({
        success: false,
        error: 'Producto no encontrado'
      });
    }

    await producto.update({ Activo: true });

    res.json({
      success: true,
      data: producto
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error al activar producto',
      details: error.message
    });
  }
};

export const desactivarProducto = async (req, res) => {
  try {
    const { id } = req.params;
    
    const producto = await Producto.findByPk(id);
    
    if (!producto) {
      return res.status(404).json({
        success: false,
        error: 'Producto no encontrado'
      });
    }

    await producto.update({ Activo: false });

    res.json({
      success: true,
      data: producto
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error al desactivar producto',
      details: error.message
    });
  }
};

