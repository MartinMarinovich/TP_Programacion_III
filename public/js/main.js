window.redirigir = function() { 
    const nombre = document.getElementById('ingreso').value.trim();

    if (nombre === "") {
        alert('Por favor, ingresa tu nombre.');
        return;
    }

    // Guardar en localStorage para usar en todo el flujo
    localStorage.setItem("usuario", nombre);

    window.location.href = "/productos";
}

window.cambiarAdmin = function() {
    window.location.href = "/admin/login";
}

