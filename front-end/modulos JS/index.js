function redirigir(){
    let ingreso = document.getElementById('ingreso').value;

     if (ingreso) {
                // Redirigir a otra página, pasando el nombre como parámetro en la URL
                window.location.href = "productos.html?nombre=" + encodeURIComponent(ingreso);
            } else {
                alert('Por favor, ingresa tu nombre.');
            }
}


