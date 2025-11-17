import { registrarVenta } from "./api.js";

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
const usuario = localStorage.getItem("usuario");

if (!usuario) window.location.href = "index.html";

function render() {
    const div = document.getElementById("lista");
    div.innerHTML = "";

    carrito.forEach((p, i) => {
        div.innerHTML += `
            <div class="item">
                ${p.nombre} ($${p.precio}) x ${p.cantidad}
                <button onclick="sumar(${i})">+</button>
                <button onclick="restar(${i})">-</button>
            </div>
        `;
    });
}

window.sumar = i => {
    carrito[i].cantidad++;
    localStorage.setItem("carrito", JSON.stringify(carrito));
    render();
};

window.restar = i => {
    carrito[i].cantidad--;
    if (carrito[i].cantidad === 0) carrito.splice(i, 1);

    localStorage.setItem("carrito", JSON.stringify(carrito));
    render();
};

window.confirmar = async function () {

    if (!confirm("¿Confirmás la compra?")) return;

    const total = carrito.reduce((t, p) => t + p.precio * p.cantidad, 0);

    await registrarVenta({
        usuario,
        productos: carrito,
        total
    });

    window.location.href = "ticket.html";
};

render();
