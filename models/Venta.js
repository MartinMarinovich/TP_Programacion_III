import { DataTypes } from 'sequelize';
import { sequelize } from '../database/index.js';

export const Venta = sequelize.define('Venta', {
  Id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'Id'
  },
  NombreCliente: {
    type: DataTypes.STRING(100),
    allowNull: false,
    field: 'NombreCliente',
    validate: {
      notEmpty: true
    }
  },
  FechaVenta: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
    field: 'FechaVenta'
  },
  PrecioTotal: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    field: 'PrecioTotal',
    validate: {
      isDecimal: true,
      min: 0
    }
  }
}, {
  tableName: 'Ventas',
  timestamps: true,
  createdAt: 'CreatedAt',
  updatedAt: 'UpdatedAt'
});




