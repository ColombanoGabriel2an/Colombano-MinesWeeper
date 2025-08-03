var selectorDificultad = document.getElementById('selectorDificultad');

selectorDificultad.addEventListener('change', function () {
	var nivel = selectorDificultad.value;

	switch (nivel) {
		case 'facil':
			filas = 8;
			columnas = 8;
			totalMinas = 10;
			break;
		case 'medio':
			filas = 12;
			columnas = 12;
			totalMinas = 25;
			break;
		case 'dificil':
			filas = 16;
			columnas = 16;
			totalMinas = 40;
			break;
	}

	// Reiniciar juego con la nueva dificultad
	iniciarJuego();
});
