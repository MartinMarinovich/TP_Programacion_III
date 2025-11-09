import { DataTypes } from 'sequelize';
import { sequelize } from '../database/index.js';

export const Usuario = sequelize.define('Usuario', {
  Id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'Id'
  },
  Email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
    field: 'Email',
    validate: {
      isEmail: true,
      notEmpty: true
    }
  },
  Password: {
    type: DataTypes.STRING(255),
    allowNull: false,
    field: 'Password',
    validate: {
      notEmpty: true
    }
  },
  Nombre: {
    type: DataTypes.STRING(100),
    allowNull: false,
    field: 'Nombre',
    validate: {
      notEmpty: true
    }
  }
}, {
  tableName: 'Usuarios',
  timestamps: true,
  createdAt: 'CreatedAt',
  updatedAt: 'UpdatedAt'
});




