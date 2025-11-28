import { Venta, Producto, ProductoVenta } from '../../models/index.js';
import { sequelize } from '../../database/index.js';

export const crearVenta = async (req, res) => {
  const transaction = await sequelize.transaction();
  
  try {
    const { nombreCliente, productos } = req.body;
    
    let precioTotal = 0;
    const productosVenta = [];

    for (const item of productos) {
      const producto = await Producto.findByPk(item.id);
      
      if (!producto) {
        await transaction.rollback();
        return res.status(404).json({
          success: false,
          error: `Producto con ID ${item.id} no encontrado`
        });
      }

      if (!producto.Activo) {
        await transaction.rollback();
        return res.status(400).json({
          success: false,
          error: `El producto ${producto.Nombre} no está activo`
        });
      }

      const subtotal = parseFloat(producto.Precio) * parseInt(item.cantidad);
      precioTotal += subtotal;

      productosVenta.push({
        productoId: producto.Id,
        cantidad: item.cantidad,
        precioUnitario: producto.Precio
      });
    }

    const venta = await Venta.create({
      NombreCliente: nombreCliente,
      FechaVenta: new Date(),
      PrecioTotal: precioTotal
    }, { transaction });

    for (const item of productosVenta) {
      await ProductoVenta.create({
        IdVenta: venta.Id,
        IdProducto: item.productoId,
        Cantidad: item.cantidad,
        PrecioUnitario: item.precioUnitario
      }, { transaction });
    }

    await transaction.commit();

    const ventaCompleta = await Venta.findByPk(venta.Id, {
      include: [{
        model: Producto,
        through: { attributes: ['Cantidad', 'PrecioUnitario'] }
      }]
    });

    res.status(201).json({
      success: true,
      data: ventaCompleta
    });
  } catch (error) {
    await transaction.rollback();
    res.status(500).json({
      success: false,
      error: 'Error al crear venta',
      details: error.message
    });
  }
};

export const listarVentas = async (req, res) => {
  try {
    const ventas = await Venta.findAll({
      include: [{
        model: Producto,
        through: { attributes: ['Cantidad', 'PrecioUnitario'] }
      }],
      order: [['FechaVenta', 'DESC']]
    });

    res.json({
      success: true,
      data: ventas
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error al listar ventas',
      details: error.message
    });
  }
};

export const obtenerVentaPorId = async (req, res) => {
  try {
    const { id } = req.params;
    
    const venta = await Venta.findByPk(id, {
      include: [{
        model: Producto,
        through: { attributes: ['Cantidad', 'PrecioUnitario'] }
      }]
    });
    
    if (!venta) {
      return res.status(404).json({
        success: false,
        error: 'Venta no encontrada'
      });
    }

    res.json({
      success: true,
      data: venta
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error al obtener venta',
      details: error.message
    });
  }
};

