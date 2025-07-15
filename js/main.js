'use strict';

/* Parámetros del juego */
var filas = 8;
var columnas = 8;
var totalMinas = 10;

/* Variables del DOM */
var tableroElemento = document.getElementById('tablero');

var botonIniciar = document.getElementById('btnIniciar');
botonIniciar.addEventListener('click', iniciarJuego);

function iniciarJuego() {
	tableroElemento.innerHTML = '';     //Limpia el tablero actual

	// Definir columnas del grid dinámicamente
	tableroElemento.style.gridTemplateColumns = 'repeat(' + columnas + ', 1fr)';

	// Crear celdas
	for (var f = 0; f < filas; f++) {
		for (var c = 0; c < columnas; c++) {
			var celda = document.createElement('div');
			celda.classList.add('celda');
			celda.dataset.fila = f;
			celda.dataset.columna = c;
			tableroElemento.appendChild(celda);
		}
	}
}
