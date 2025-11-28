const carrito = JSON.parse(localStorage.getItem("carrito"));
const usuario = localStorage.getItem("usuario");

if (!usuario || !carrito || carrito.length === 0) {
    window.location.href = "/cliente";
}

let total = carrito.reduce((t, p) => t + p.precio * p.cantidad, 0);

document.getElementById("ticket").innerHTML = `
    <h3>Cliente: ${usuario}</h3>
    <h4>Fecha: ${new Date().toLocaleDateString()}</h4>
    <hr>
    ${carrito.map(p => `<p>${p.nombre} x${p.cantidad} - $${(p.precio * p.cantidad).toFixed(2)}</p>`).join("")}
    <hr>
    <h3>Total: $${total.toFixed(2)}</h3>
    `;

window.inicio = function () {
    localStorage.clear();
    window.location.href = "/cliente";
};

window.descargarPDF = function () {
    const { jsPDF } = window.jspdf;

    const doc = new jsPDF();
    doc.text("PilchasAutoservicio - Ticket de compra", 10, 10);
    doc.text(`Cliente: ${usuario}`, 10, 20);
    doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 10, 30);

    let y = 45;
    carrito.forEach(p => {
        doc.text(`${p.nombre} x${p.cantidad} - $${(p.precio * p.cantidad).toFixed(2)}`, 10, y);
        y += 10;
    });

    doc.text(`Total: $${total.toFixed(2)}`, 10, y + 10);

    doc.save("ticket-pilchas.pdf");
};
