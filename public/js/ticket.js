const carrito = JSON.parse(localStorage.getItem("carrito"));
const usuario = localStorage.getItem("usuario");

if (!usuario || !carrito) window.location.href = "index.html";

let total = carrito.reduce((t, p) => t + p.precio * p.cantidad, 0);

document.getElementById("ticket").innerHTML = `
    <h3>Cliente: ${usuario}</h3>
    <h4>Fecha: ${new Date().toLocaleDateString()}</h4>
    <hr>
    ${carrito.map(p => `<p>${p.nombre} x${p.cantidad} - $${p.precio * p.cantidad}</p>`).join("")}
    <hr>
    <h3>Total: $${total}</h3>
    `;

window.inicio = function () {
    localStorage.clear();
    window.location.href = "index.html";
};

window.descargarPDF = function () {
    const { jsPDF } = window.jspdf;

    const doc = new jsPDF();
    doc.text("Ticket de compra", 10, 10);

    let y = 20;
    carrito.forEach(p => {
        doc.text(`${p.nombre} x${p.cantidad} - $${p.precio * p.cantidad}`, 10, y);
        y += 10;
    });

    doc.text(`Total: $${total}`, 10, y + 10);

    doc.save("ticket.pdf");
};
