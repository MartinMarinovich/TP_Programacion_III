import { DataTypes } from 'sequelize';
import { sequelize } from '../database/index.js';

export const ProductoVenta = sequelize.define('ProductoVenta', {
  Id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'Id'
  },
  IdVenta: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'IdVenta',
    references: {
      model: 'Ventas',
      key: 'Id'
    }
  },
  IdProducto: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'IdProducto',
    references: {
      model: 'Productos',
      key: 'Id'
    }
  },
  Cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'Cantidad',
    validate: {
      min: 1
    }
  },
  PrecioUnitario: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    field: 'PrecioUnitario',
    validate: {
      isDecimal: true,
      min: 0
    }
  }
}, {
  tableName: 'ProductosVentas',
  timestamps: true,
  createdAt: 'CreatedAt',
  updatedAt: 'UpdatedAt'
});




