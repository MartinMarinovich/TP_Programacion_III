function redirigir(){ 
    const nombre = document.getElementById('ingreso').value.trim();

    if (nombre === "") {
        alert('Por favor, ingresa tu nombre.');
        return;
    }

    // Guardar en localStorage para usar en todo el flujo
    localStorage.setItem("usuario", nombre);

    // Redirigir al listado de productos
    window.location.href = "productos.html";
}

