document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("cita-form");
    const table = document.getElementById("citas-table").getElementsByTagName('tbody')[0];
    const mostrarFormularioButton = document.getElementById("mostrar-formulario");

    function obtenerHoraActual() {
        const now = new Date();
        const hora = String(now.getHours()).padStart(2, '0');
        const minutos = String(now.getMinutes()).padStart(2, '0');
        const segundos = String(now.getSeconds()).padStart(2, '0');
        return `${hora}:${minutos}:${segundos}`;
    }

    const citasGuardadas = JSON.parse(localStorage.getItem("citas")) || [];

    function llenarTabla() {
        table.innerHTML = ""; 

        citasGuardadas.forEach(function (cita, index) {
            agregarCita(cita.fecha, cita.nombre, cita.sintomas, index);
        });
    }

    function agregarCita(fecha, nombre, sintomas, index) {
        const row = table.insertRow(table.rows.length);
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        const cell3 = row.insertCell(2);
        const cell4 = row.insertCell(3);

        cell1.innerHTML = fecha;
        cell2.innerHTML = nombre;
        cell3.innerHTML = sintomas;
        cell4.innerHTML = `<button class="eliminar-button" data-index="${index}">Eliminar</button>`;
    }

    function eliminarCita(index) {
        citasGuardadas.splice(index, 1);
        localStorage.setItem("citas", JSON.stringify(citasGuardadas));
        llenarTabla();
    }

    llenarTabla();

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const nombre = document.getElementById("nombre").value;
        const sintomas = document.getElementById("sintomas").value;

        const fecha = obtenerHoraActual();
        agregarCita(fecha, nombre, sintomas, citasGuardadas.length);
        citasGuardadas.push({ fecha, nombre, sintomas });
        localStorage.setItem("citas", JSON.stringify(citasGuardadas));

        form.reset();
    });

    mostrarFormularioButton.addEventListener("click", function () {
        if (form.style.display === "none") {
            form.style.display = "block";
        } else {
            form.style.display = "none";
        }
    });

    table.addEventListener("click", function (e) {
        if (e.target.classList.contains("eliminar-button")) {
            const index = e.target.getAttribute("data-index");
            eliminarCita(index);
        }
    });
});
