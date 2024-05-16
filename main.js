

document.querySelector('button').addEventListener('click', function changePosition() {
    var tabla = document.getElementById('table');
    var filas = Array.from(tabla.rows);
    var encabezados = filas.splice(0, 1); // Eliminar encabezados

    // Separar nombres y tareas
    var nombres = filas.map(fila => fila.cells[0].innerText);
    var tareas = filas.map(fila => fila.cells[1].innerText);

    // Mezclar nombres
    var nombresMezclados = nombres.sort(function() { return 0.5 - Math.random() });

    // Reconstruir filas
    var filasMezcladas = filas.map((fila, i) => {
        fila.cells[0].innerText = nombresMezclados[i];
        return fila;
    });

    filasMezcladas.unshift(encabezados[0]); // Agregar encabezados al inicio
    tabla.innerHTML = filasMezcladas.map(fila => fila.outerHTML).join('');
});



