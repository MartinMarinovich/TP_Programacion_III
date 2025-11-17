const body = document.body;
const temaGuardado = localStorage.getItem("tema");

if (temaGuardado) body.classList.add(temaGuardado);

document.addEventListener("click", e => {
    if (e.target.id === "temaBtn") {
        body.classList.toggle("dark");
        localStorage.setItem("tema", body.classList.contains("dark") ? "dark" : "light");
    }
});

