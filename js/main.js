'use strict';

var filas = 8;
var columnas = 8;
var totalMinas = 10;

var tableroElemento = document.getElementById('tablero');
var botonIniciar = document.getElementById('btnIniciar');

var tablero = [];
var celdasRestantes = filas * columnas - totalMinas;

var cronometro;
var tiempoInicio;
var temporizadorElemento = document.getElementById('temporizador');
var reiniciarBtn = document.getElementById('btnReiniciar');
var primerClick = true;

var btnTema = document.getElementById('btnTema');

var contadorMinasElemento = document.getElementById('minasRestantes');
var banderasColocadas = 0;

botonIniciar.addEventListener('click', iniciarJuego);

function iniciarJuego() {
	tableroElemento.innerHTML = '';
	tablero = [];
	celdasRestantes = filas * columnas - totalMinas;
	temporizadorElemento.textContent = '00:00';
	detenerCronometro();
	primerClick = true;

	banderasColocadas = 0;
	contadorMinasElemento.textContent = 'Minas: ' + totalMinas;

	tableroElemento.style.gridTemplateColumns = 'repeat(' + columnas + ', 1fr)';

	for (var f = 0; f < filas; f++) {
		tablero[f] = [];
		for (var c = 0; c < columnas; c++) {
			var celda = document.createElement('div');
			celda.classList.add('celda');
			celda.dataset.fila = f;
			celda.dataset.columna = c;

			celda.addEventListener('click', manejarClickIzquierdo);
			celda.addEventListener('contextmenu', manejarClickDerecho);

			tableroElemento.appendChild(celda);

			tablero[f][c] = {
				mina: false,
				revelada: false,
				bandera: false,
				numero: 0,
				elemento: celda
			};
		}
	}

	colocarMinas();
	calcularNumeros();
}

function colocarMinas() {
	var minasColocadas = 0;

	while (minasColocadas < totalMinas) {
		var f = Math.floor(Math.random() * filas);
		var c = Math.floor(Math.random() * columnas);

		if (!tablero[f][c].mina) {
			tablero[f][c].mina = true;
			minasColocadas++;
		}
	}
}

function calcularNumeros() {
	for (var f = 0; f < filas; f++) {
		for (var c = 0; c < columnas; c++) {
			if (tablero[f][c].mina) continue;

			var cantidad = 0;
			for (var df = -1; df <= 1; df++) {
				for (var dc = -1; dc <= 1; dc++) {
					var nf = f + df;
					var nc = c + dc;

					if (
						nf >= 0 &&
						nf < filas &&
						nc >= 0 &&
						nc < columnas &&
						tablero[nf][nc].mina
					) {
						cantidad++;
					}
				}
			}
			tablero[f][c].numero = cantidad;
		}
	}
}

function manejarClickIzquierdo(e) {
	var f = parseInt(this.dataset.fila);
	var c = parseInt(this.dataset.columna);

	revelarCelda(f, c);
}

function manejarClickDerecho(e) {
	e.preventDefault();

	var f = parseInt(this.dataset.fila);
	var c = parseInt(this.dataset.columna);
	var celda = tablero[f][c];

	if (celda.revelada) return;

	celda.bandera = !celda.bandera;

	if (celda.bandera) {
		banderasColocadas++;
		celda.elemento.textContent = '🚩';
	} else {
		banderasColocadas--;
		celda.elemento.textContent = '';
	}

	// Mostrar minas restantes (puede quedar negativo)
	var minasRestantes = totalMinas - banderasColocadas;
	contadorMinasElemento.textContent = 'Minas: ' + minasRestantes;
}


function revelarCelda(f, c) {
	var celda = tablero[f][c];

	if (celda.revelada || celda.bandera) return;

	iniciarCronometro();

	celda.revelada = true;
	celda.elemento.classList.add('revelada');

	if (celda.mina) {
		celda.elemento.textContent = '💣';
		finalizarJuego(false);
		return;
	}

	celdasRestantes--;
	if (celda.numero > 0) {
		celda.elemento.textContent = celda.numero;
	} else {
		expansionRecursiva(f, c);
	}

	if (celdasRestantes === 0) {
		finalizarJuego(true);
	}
}
function finalizarJuego(gano) {
	for (var f = 0; f < filas; f++) {
		for (var c = 0; c < columnas; c++) {
			var celda = tablero[f][c];
			celda.elemento.removeEventListener('click', manejarClickIzquierdo);
			celda.elemento.removeEventListener('contextmenu', manejarClickDerecho);

			if (celda.mina && !celda.revelada) {
				celda.elemento.textContent = '💣';
			}
		}
	}

	if (gano) {
		alert('¡Felicidades! Ganaste la partida.');
	} else {
		alert('Perdiste. Hiciste clic en una mina.');
	}
}

reiniciarBtn.addEventListener('click', iniciarJuego);

function iniciarCronometro() {
	if (!primerClick) return;
	primerClick = false;

	tiempoInicio = Date.now();
	cronometro = setInterval(function () {
		var tiempoActual = Date.now();
		var segundos = Math.floor((tiempoActual - tiempoInicio) / 1000);
		var minutos = Math.floor(segundos / 60);
		segundos = segundos % 60;

		temporizadorElemento.textContent =
			(minutos < 10 ? '0' : '') +
			minutos +
			':' +
			(segundos < 10 ? '0' : '') +
			segundos;
	}, 1000);
}

function detenerCronometro() {
	clearInterval(cronometro);
}

btnTema.addEventListener('click', function () {
	document.body.classList.toggle('modo-oscuro');

	if (document.body.classList.contains('modo-oscuro')) {
		btnTema.textContent = '☀️ Modo claro';
	} else {
		btnTema.textContent = '🌙 Modo oscuro';
	}
});
