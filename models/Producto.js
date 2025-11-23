import { DataTypes } from 'sequelize';
import { sequelize } from '../database/index.js';

export const Producto = sequelize.define('Producto', {
  Id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'Id'
  },
  Nombre: {
    type: DataTypes.STRING(100),
    allowNull: false,
    field: 'Nombre',
    validate: {
      notEmpty: true
    }
  },
  Precio: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    field: 'Precio',
    validate: {
      isDecimal: true,
      min: 0
    }
  },
  Imagen: {
    type: DataTypes.STRING(255),
    allowNull: true,
    field: 'Imagen'
  },
  Tipo: {
    type: DataTypes.STRING(20),
    allowNull: false,
    field: 'Tipo',
    validate: {
      isIn: [['remera', 'pantalon']]
    }
  },
  Activo: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    field: 'Activo'
  },
  Color: {
    type: DataTypes.STRING(50),
    allowNull: false,
    field: 'Color',
    validate: {
      notEmpty: true
    }
  },
  Descripcion: {
    type: DataTypes.TEXT,
    allowNull: true,
    field: 'Descripcion'
  }
}, {
  tableName: 'Productos',
  timestamps: true,
  createdAt: 'CreatedAt',
  updatedAt: 'UpdatedAt'
});




