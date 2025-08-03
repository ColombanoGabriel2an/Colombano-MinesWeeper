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

var btnRanking = document.getElementById('btnRanking');
var modalRanking = document.getElementById('modalRanking');
var contenidoRanking = document.getElementById('contenidoRanking');
var btnFecha = document.getElementById('ordenarPorFecha');
var btnTiempo = document.getElementById('ordenarPorTiempo');

botonIniciar.addEventListener('click', iniciarJuego);

function iniciarJuego() {
	
	var nombre = document.getElementById('nombreJugador').value.trim();

	// Validación de nombre (mínimo 3 letras)
	if (!/^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]{3,}$/.test(nombre)) {
		alert('Por favor, ingresá un nombre de letras solamente (mínimo 3).');
		return;
	}

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

function expansionRecursiva(f, c) {
	for (var df = -1; df <= 1; df++) {
		for (var dc = -1; dc <= 1; dc++) {
			var nf = f + df;
			var nc = c + dc;

			if (
				nf >= 0 &&
				nf < filas &&
				nc >= 0 &&
				nc < columnas &&
				!(df === 0 && dc === 0)
			) {
				var celdaVecina = tablero[nf][nc];
				if (!celdaVecina.revelada && !celdaVecina.mina && !celdaVecina.bandera) {
					celdaVecina.revelada = true;
					celdaVecina.elemento.classList.add('revelada');
					celdasRestantes--;

					if (celdaVecina.numero > 0) {
						celdaVecina.elemento.textContent = celdaVecina.numero;
					} else {
						expansionRecursiva(nf, nc);
					}
				}
			}
		}
	}
}

function finalizarJuego(gano) {
	detenerCronometro();

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
		guardarPartida();
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

function guardarPartida() {
	var nombre = document.getElementById('nombreJugador').value.trim();
	if (nombre.length < 3) return; // No guarda si el nombre no es válido

	var tiempoFinal = temporizadorElemento.textContent;
	var fecha = new Date();
	var fechaFormateada = fecha.toLocaleString('es-AR');

	var nuevaPartida = {
		nombre: nombre,
		tiempo: tiempoFinal,
		timestamp: Date.now(),
		fecha: fechaFormateada
	};

	var partidasGuardadas = JSON.parse(localStorage.getItem('rankingBuscaminas')) || [];
	partidasGuardadas.push(nuevaPartida);
	localStorage.setItem('rankingBuscaminas', JSON.stringify(partidasGuardadas));
}

btnRanking.addEventListener('click', function () {
	mostrarRanking('tiempo');
	});

btnFecha.addEventListener('click', function () {
	mostrarRanking('fecha');
	});

btnTiempo.addEventListener('click', function () {
	mostrarRanking('tiempo');
	});

function mostrarRanking(criterio) {
	var partidas = JSON.parse(localStorage.getItem('rankingBuscaminas')) || [];

	if (criterio === 'tiempo') {
		partidas.sort((a, b) => convertirTiempo(a.tiempo) - convertirTiempo(b.tiempo));
	} else if (criterio === 'fecha') {
		partidas.sort((a, b) => b.timestamp - a.timestamp);
	}

	var html = '<ul>';
	partidas.forEach(p => {
		html += `<li><strong>${p.nombre}</strong> – ${p.tiempo} (${p.fecha})</li>`;
	});
	html += '</ul>';

	contenidoRanking.innerHTML = html;
	modalRanking.classList.remove('oculto');
}

function cerrarRanking() {
	modalRanking.classList.add('oculto');
}

function convertirTiempo(tiempoStr) {
	var partes = tiempoStr.split(':');
	var minutos = parseInt(partes[0]);
	var segundos = parseInt(partes[1]);
	return minutos * 60 + segundos;
}

