let productos = [];
let filtrados = [];
let pagina = 1;
const porPagina = 4;

const usuario = localStorage.getItem("usuario");
if (!usuario) window.location.href = "index.html";

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

importar();

async function importar() {
    productos = await obtenerProductos(); 
    cambiarCategoria("categoria1");
}

function cambiarCategoria(cat) {
    filtrados = productos.filter(p => p.categoria === cat);
    pagina = 1;
    mostrar();
}

function mostrar() {
    const cont = document.getElementById("productos");
    cont.innerHTML = "";

    let ini = (pagina - 1) * porPagina;
    let fin = ini + porPagina;

    filtrados.slice(ini, fin).forEach(p => {
        cont.innerHTML += `
            <div class="card">
                <img src="${p.imagen}">
                <h3>${p.nombre}</h3>
                <p>${p.descripcion}</p>
                <p><b>$${p.precio}</b></p>
                <button onclick="agregar('${p._id}', '${p.nombre}', ${p.precio})">Agregar</button>
            </div>
        `;
    });

    document.getElementById("paginaActual").textContent = "Página " + pagina;
}

window.agregar = function (id, nombre, precio) {
    const prod = carrito.find(p => p.id === id);

    if (prod) {
        prod.cantidad++;
    } else {
        carrito.push({ id, nombre, precio, cantidad: 1 });
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


