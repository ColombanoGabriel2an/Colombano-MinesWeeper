var btnRanking = document.getElementById('btnRanking');
var contenidoRanking = document.getElementById('contenidoRanking');
var btnFecha = document.getElementById('ordenarPorFecha');
var btnTiempo = document.getElementById('ordenarPorTiempo');

btnRanking.addEventListener('click', function () {
	mostrarRanking();
});

btnFecha.addEventListener('click', function () {
	mostrarRanking('fecha');
});

btnTiempo.addEventListener('click', function () {
	mostrarRanking('tiempo');
});

btnCerrarModalRanking.addEventListener('click', function () {
	document.getElementById('modalRanking').classList.add("oculto");
});


function mostrarRanking() {
	var modalRanking = document.getElementById('modalRanking');
	var contenidoRanking = document.getElementById('contenidoRanking');

	var dificultad = document.getElementById('selectorDificultad').value; // corregido
	var rankingBuscaminas = `ranking-${dificultad}`;
	var partidas = JSON.parse(localStorage.getItem(rankingBuscaminas)) || [];

	if (partidas.length === 0) {
		contenidoRanking.innerHTML = "<p>No hay partidas registradas en esta dificultad.</p>";
	} else {
		partidas.sort((a, b) => a.tiempoTotalSegundos - b.tiempoTotalSegundos);

		var html = `<p><strong>Dificultad actual:</strong> ${dificultad}</p>`;
		html += '<ul>';
		partidas.forEach(p => {
			html += `<li><strong>${p.nombre}</strong> – ${p.tiempo} (${p.fecha})</li>`;
		});
		html += '</ul>';
		contenidoRanking.innerHTML = html;
	}

	modalRanking.classList.remove("oculto");
}

function mostrarRanking(criterio = 'tiempo') {
	const modalRanking = document.getElementById('modalRanking');
	const contenidoRanking = document.getElementById('contenidoRanking');

	const dificultad = document.getElementById('selectorDificultad').value;
	const claveStorage = `ranking-${dificultad}`;
	let partidas = JSON.parse(localStorage.getItem(claveStorage)) || [];

	if (partidas.length === 0) {
		contenidoRanking.innerHTML = "<p>No hay partidas registradas en esta dificultad.</p>";
	} else {
		if (criterio === 'tiempo') {
			partidas.sort((a, b) => a.tiempoTotalSegundos - b.tiempoTotalSegundos);
		} else if (criterio === 'fecha') {
			partidas.sort((a, b) => b.timestamp - a.timestamp);
		}

		let html = `<p><strong>Dificultad actual:</strong> ${dificultad}</p>`;
		html += '<ul>';
		partidas.forEach(p => {
			html += `<li><strong>${p.nombre}</strong> – ${p.tiempo} (${p.fecha})</li>`;
		});
		html += '</ul>';
		contenidoRanking.innerHTML = html;
	}

	modalRanking.classList.remove("oculto");
}


function convertirTiempo(tiempoStr) {
	var partes = tiempoStr.split(':');
	var minutos = parseInt(partes[0]);
	var segundos = parseInt(partes[1]);
	return minutos * 60 + segundos;
}

function guardarPartida() {
	var nombre = document.getElementById('nombreJugador').value.trim();
	if (nombre.length < 3) return;

	var tiempoFinal = temporizadorElemento.textContent;
	var fecha = new Date();
	var fechaFormateada = fecha.toLocaleString('es-AR');

	var dificultad = document.getElementById('selectorDificultad').value; // corregido
	var rankingBuscaminas = `ranking-${dificultad}`;

	var nuevaPartida = {
		nombre: nombre,
		tiempo: tiempoFinal,
		timestamp: Date.now(),
		fecha: fechaFormateada,
		dificultad: dificultad,
		tiempoTotalSegundos: convertirTiempo(tiempoFinal)
	};

	var partidasGuardadas = JSON.parse(localStorage.getItem(rankingBuscaminas)) || [];
	partidasGuardadas.push(nuevaPartida);
	localStorage.setItem(rankingBuscaminas, JSON.stringify(partidasGuardadas));
}
