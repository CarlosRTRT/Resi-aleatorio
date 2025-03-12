document.querySelector('button').addEventListener('click', function changePosition() {
    var tabla = document.getElementById('table');
    var filas = Array.from(tabla.rows).slice(1); // Omitimos el encabezado

    // Extraer nombres, tareas y géneros
    var datos = filas.map(fila => ({
        nombre: fila.cells[0].innerText,
        tarea: fila.cells[1].innerText,
        genero: fila.dataset.genero
    }));

    // Filtrar hombres y mujeres
    var hombres = datos.filter(d => d.genero === "Masculino").map(d => d.nombre);
    var mujeres = datos.filter(d => d.genero === "Femenino").map(d => d.nombre);

    // Función para mezclar asegurando que nadie quede con su mismo nombre
    function mezclarSinRepetir(array, original) {
        let mezclado;
        do {
            mezclado = [...array].sort(() => Math.random() - 0.5);
        } while (mezclado.some((nombre, i) => nombre === original[i])); // Repetir si hay coincidencias en la misma posición
        return mezclado;
    }

    hombres = mezclarSinRepetir(hombres, hombres);
    mujeres = mezclarSinRepetir(mujeres, mujeres);

    // Reasignar los nombres con animación
    let indiceHombres = 0, indiceMujeres = 0;
    filas.forEach(fila => {
        const genero = fila.dataset.genero; 
        const nombreCelda = fila.cells[0];

        nombreCelda.style.opacity = 0; // Fade out
        setTimeout(() => {
            if (genero === "Masculino") {
                nombreCelda.innerText = hombres[indiceHombres++];
            } else {
                nombreCelda.innerText = mujeres[indiceMujeres++];
            }
            nombreCelda.style.opacity = 1; // Fade in
        }, 300);
    });
});
