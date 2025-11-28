import { registrarVenta } from "./api.js";

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
const usuario = localStorage.getItem("usuario");

if (!usuario) window.location.href = "/cliente";

function render() {
    const div = document.getElementById("lista");
    div.innerHTML = "";

    if (carrito.length === 0) {
        div.innerHTML = "<p>El carrito está vacío. Agregá productos desde la sección de productos.</p>";
        return;
    }

    carrito.forEach((p, i) => {
        div.innerHTML += `
            <div class="item">
                ${p.nombre} ($${p.precio.toFixed(2)}) x ${p.cantidad}
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
    if (carrito.length === 0) {
        alert("El carrito está vacío. Agregá productos antes de finalizar la compra.");
        return;
    }

    if (!confirm("¿Confirmás la compra?")) return;
    
    try {
        const resultado = await registrarVenta({
            usuario,
            productos: carrito
        });
        
        if (resultado.success) {
            localStorage.setItem("ultimaVenta", JSON.stringify(resultado.data));
            window.location.href = "/ticket";
        } else {
            alert("Error al procesar la venta: " + resultado.error);
        }
    } catch (error) {
        alert("Error al procesar la venta. Por favor, intentá nuevamente.");
        console.error(error);
    }
};

render();
