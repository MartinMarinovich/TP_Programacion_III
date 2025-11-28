import { obtenerProductos } from './api.js';

let productos = [];
let filtrados = [];
let pagina = 1;
const porPagina = 4;

const usuario = localStorage.getItem("usuario");
if (!usuario) window.location.href = "/cliente";

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

importar();

async function importar() {
    productos = await obtenerProductos();
    if (productos.length === 0) {
        document.getElementById("productos").innerHTML = "<p>No hay productos disponibles en este momento.</p>";
        return;
    }
    cambiarCategoria("remeras");
}

window.cambiarCategoria = function(cat) {
    if (cat === 'remeras') {
        filtrados = productos.filter(p => p.tipo === 'remera');
    } else if (cat === 'pantalones') {
        filtrados = productos.filter(p => p.tipo === 'pantalon');
    } else {
        filtrados = productos;
    }
    pagina = 1;
    mostrar();
}

function mostrar() {
    const cont = document.getElementById("productos");
    cont.innerHTML = "";

    let ini = (pagina - 1) * porPagina;
    let fin = ini + porPagina;

    filtrados.slice(ini, fin).forEach(p => {
        const nombreEscapado = p.nombre.replace(/'/g, "\\'");
        cont.innerHTML += `
            <div class="card">
                <img src="${p.imagen}" alt="${p.nombre}">
                <h3>${p.nombre}</h3>
                <p>${p.descripcion || ''}</p>
                <p><b>$${p.precio.toFixed(2)}</b></p>
                <button onclick="agregar(${p.id}, '${nombreEscapado}', ${p.precio})">Agregar</button>
            </div>
        `;
    });

    document.getElementById("paginaActual").textContent = "Página " + pagina;
}

window.agregar = function (id, nombre, precio) {
    const idNum = typeof id === 'string' ? parseInt(id) : id;
    const prod = carrito.find(p => p.id === idNum);

    if (prod) {
        prod.cantidad++;
    } else {
        carrito.push({ id: idNum, nombre, precio, cantidad: 1 });
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    alert("Producto agregado al carrito");
};

window.siguiente = () => {
    if ((pagina * porPagina) < filtrados.length) pagina++;
    mostrar();
};

window.anterior = () => {
    if (pagina > 1) pagina--;
    mostrar();
};


