import { DataTypes } from 'sequelize';
import { sequelize } from '../database/index.js';

export const Producto = sequelize.define('Producto', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  precio: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      isDecimal: true,
      min: 0
    }
  },
  imagen: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  tipo: {
    type: DataTypes.ENUM('remera', 'pantalon'),
    allowNull: false,
    validate: {
      isIn: [['remera', 'pantalon']]
    }
  },
  activo: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  color: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'productos',
  timestamps: true
});




