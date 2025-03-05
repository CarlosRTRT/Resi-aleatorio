document.querySelector('button').addEventListener('click', function changePosition() {
    var tabla = document.getElementById('table');
    var filas = Array.from(tabla.rows).slice(1); // Omitir el encabezado

    // Separar nombres, tareas y géneros
    var datos = filas.map(fila => ({
        nombre: fila.cells[0].innerText,
        tarea: fila.cells[1].innerText,
        genero: fila.dataset.genero
    }));

    // Filtrar hombres y mujeres
    var hombres = datos.filter(d => d.genero === "Masculino");
    var mujeres = datos.filter(d => d.genero === "Femenino");

    // Mezclar hombres y mujeres por separado
    function mezclar(array) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    mezclar(hombres);
    mezclar(mujeres);

    // Reasignar los nombres mezclados con animación
    let indiceHombres = 0, indiceMujeres = 0;
    filas.forEach(fila => {
        const genero = fila.dataset.genero; // Almacenamos el género una vez
        const nombreCelda = fila.cells[0];
        
        if (genero === "Masculino" && indiceHombres < hombres.length) {
            nombreCelda.style.opacity = 0; // Hacemos desaparecer el nombre
            setTimeout(() => {
                nombreCelda.innerText = hombres[indiceHombres++].nombre;
                nombreCelda.style.opacity = 1; // Hacemos aparecer el nuevo nombre
            }, 300); // Tiempo para el "fade out"
        } else if (genero === "Femenino" && indiceMujeres < mujeres.length) {
            nombreCelda.style.opacity = 0; // Hacemos desaparecer el nombre
            setTimeout(() => {
                nombreCelda.innerText = mujeres[indiceMujeres++].nombre;
                nombreCelda.style.opacity = 1; // Hacemos aparecer el nuevo nombre
            }, 300); // Tiempo para el "fade out"
        }
    });
});



