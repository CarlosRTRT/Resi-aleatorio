document.querySelector('button').addEventListener('click', function changePosition() {
    var tabla = document.getElementById('table');
    var filas = Array.from(tabla.rows);
    var encabezados = filas.splice(0, 1); // Eliminar encabezados

    // Separar nombres y tareas
    var nombres = filas.map(fila => fila.cells[0].innerText);
    var tareas = filas.map(fila => fila.cells[1].innerText);

    // Mezclar nombres
    var nombresMezclados = nombres.slice(); // Copy array
    for (var i = nombres.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        // Ensure that the same task is not assigned to the same person consecutively
        if (tareas[i] !== tareas[j]) {
            var temp = nombresMezclados[i];
            nombresMezclados[i] = nombresMezclados[j];
            nombresMezclados[j] = temp;
        }
    }

    // Reconstruir filas
    var filasMezcladas = filas.map((fila, i) => {
        fila.cells[0].innerText = nombresMezclados[i];
        return fila;
    });

    filasMezcladas.unshift(encabezados[0]); // Agregar encabezados al inicio
    tabla.innerHTML = filasMezcladas.map(fila => fila.outerHTML).join('');
});

