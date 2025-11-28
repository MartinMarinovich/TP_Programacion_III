const API_PRODUCTOS = "/api/productos";
const API_VENTAS = "/api/ventas";

export async function obtenerProductos() {
  const response = await fetch(API_PRODUCTOS);
  const result = await response.json();
  
  if (result.success && result.data && result.data.productos) {
    return result.data.productos.map(p => ({
      id: p.Id,
      nombre: p.Nombre,
      precio: parseFloat(p.Precio),
      imagen: p.Imagen || '/uploads/productos/default.png',
      tipo: p.Tipo,
      color: p.Color,
      descripcion: p.Descripcion
    }));
  }
  return [];
}

export async function registrarVenta(data) {
  const ventaData = {
    nombreCliente: data.usuario,
    productos: data.productos.map(p => ({
      id: parseInt(p.id),
      cantidad: p.cantidad
    }))
  };
  
  const response = await fetch(API_VENTAS, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(ventaData),
  });
  
  return await response.json();
}
