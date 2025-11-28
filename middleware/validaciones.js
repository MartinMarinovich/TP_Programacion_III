export const validarProducto = (req, res, next) => {
  const { nombre, precio, tipo, color } = req.body;
  const errors = [];

  if (!nombre || nombre.trim() === '') {
    errors.push('El nombre es requerido');
  }

  if (!precio || isNaN(precio) || parseFloat(precio) <= 0) {
    errors.push('El precio debe ser un número mayor a 0');
  }

  if (!tipo || !['remera', 'pantalon'].includes(tipo)) {
    errors.push('El tipo debe ser "remera" o "pantalon"');
  }

  if (!color || color.trim() === '') {
    errors.push('El color es requerido');
  }

  if (errors.length > 0) {
    return res.status(400).json({ success: false, errors });
  }

  next();
};

export const validarVenta = (req, res, next) => {
  const { nombreCliente, productos } = req.body;
  const errors = [];

  if (!nombreCliente || nombreCliente.trim() === '') {
    errors.push('El nombre del cliente es requerido');
  }

  if (!productos || !Array.isArray(productos) || productos.length === 0) {
    errors.push('Debe incluir al menos un producto en la venta');
  }

  if (productos && Array.isArray(productos)) {
    productos.forEach((producto, index) => {
      if (!producto.id || isNaN(producto.id)) {
        errors.push(`El producto en posición ${index + 1} no tiene un ID válido`);
      }
      if (!producto.cantidad || isNaN(producto.cantidad) || parseInt(producto.cantidad) <= 0) {
        errors.push(`El producto en posición ${index + 1} debe tener una cantidad válida mayor a 0`);
      }
    });
  }

  if (errors.length > 0) {
    return res.status(400).json({ success: false, errors });
  }

  next();
};

export const validarUsuario = (req, res, next) => {
  const { email, password, nombre } = req.body;
  const errors = [];

  if (!email || email.trim() === '') {
    errors.push('El email es requerido');
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push('El email no es válido');
  }

  if (!password || password.trim() === '') {
    errors.push('La contraseña es requerida');
  } else if (password.length < 6) {
    errors.push('La contraseña debe tener al menos 6 caracteres');
  }

  if (!nombre || nombre.trim() === '') {
    errors.push('El nombre es requerido');
  }

  if (errors.length > 0) {
    return res.status(400).json({ success: false, errors });
  }

  next();
};

