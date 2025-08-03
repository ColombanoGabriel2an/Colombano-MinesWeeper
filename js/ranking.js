var btnRanking = document.getElementById('btnRanking');
var contenidoRanking = document.getElementById('contenidoRanking');
var btnFecha = document.getElementById('ordenarPorFecha');
var btnTiempo = document.getElementById('ordenarPorTiempo');


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


function convertirTiempo(tiempoStr) {
	var partes = tiempoStr.split(':');
	var minutos = parseInt(partes[0]);
	var segundos = parseInt(partes[1]);
	return minutos * 60 + segundos;
}

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
