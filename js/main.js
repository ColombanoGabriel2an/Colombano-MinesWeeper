'use strict';

/* Parámetros del juego */
var filas = 8;
var columnas = 8;
var totalMinas = 10;

/* Variables del DOM */
var tableroElemento = document.getElementById('tablero');
var botonIniciar = document.getElementById('btnIniciar');

/* Variables internas del juego */
var tablero = []; // Matriz para guardar el estado del tablero

botonIniciar.addEventListener('click', iniciarJuego);

/* Iniciar una nueva partida */
function iniciarJuego() {
	// Reiniciar estructuras
	tableroElemento.innerHTML = '';
	tablero = [];

	// Definir columnas del grid
	tableroElemento.style.gridTemplateColumns = 'repeat(' + columnas + ', 1fr)';

	// Inicializar tablero vacío
	for (var f = 0; f < filas; f++) {
		tablero[f] = [];
		for (var c = 0; c < columnas; c++) {
			tablero[f][c] = {
				mina: false,
				revelada: false,
				bandera: false,
				numero: 0
			};

			// Crear celda visual
			var celda = document.createElement('div');
			celda.classList.add('celda');
			celda.dataset.fila = f;
			celda.dataset.columna = c;
			tableroElemento.appendChild(celda);
		}
	}

	// Colocar minas aleatoriamente
	colocarMinas();
}

/* Función que coloca minas aleatorias en el tablero */
function colocarMinas() {
	var minasColocadas = 0;

	while (minasColocadas < totalMinas) {
		var filaAleatoria = Math.floor(Math.random() * filas);
		var columnaAleatoria = Math.floor(Math.random() * columnas);

		// Si no hay mina en esa posición, colocarla
		if (!tablero[filaAleatoria][columnaAleatoria].mina) {
			tablero[filaAleatoria][columnaAleatoria].mina = true;
			minasColocadas++;
		}
	}
}
