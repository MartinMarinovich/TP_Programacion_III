import { Producto } from './Producto.js';
import { Usuario } from './Usuario.js';
import { Venta } from './Venta.js';
import { ProductoVenta } from './ProductoVenta.js';

Producto.belongsToMany(Venta, { through: ProductoVenta, foreignKey: 'IdProducto' });
Venta.belongsToMany(Producto, { through: ProductoVenta, foreignKey: 'IdVenta' });

Venta.hasMany(ProductoVenta, { foreignKey: 'IdVenta', onDelete: 'CASCADE' });
ProductoVenta.belongsTo(Venta, { foreignKey: 'IdVenta' });

Producto.hasMany(ProductoVenta, { foreignKey: 'IdProducto', onDelete: 'CASCADE' });
ProductoVenta.belongsTo(Producto, { foreignKey: 'IdProducto' });

export { Producto, Usuario, Venta, ProductoVenta };




