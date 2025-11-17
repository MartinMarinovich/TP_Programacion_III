const API_URL = "http://localhost:3000/api/productos";

export async function obtenerProductos() {
  return await fetch(API_URL).then(r => r.json());
}

export async function registrarVenta(data) {
  return await fetch(API_URL + "/sale", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then(r => r.json());
}
