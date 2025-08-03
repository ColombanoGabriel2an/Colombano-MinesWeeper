

var modalRanking = document.getElementById('modalRanking');
var modalEstado = document.getElementById('modalEstado');
var mensajeEstado = document.getElementById('mensajeEstado');

function mostrarModalEstado(mensaje) {
	mensajeEstado.textContent = mensaje;
	modalEstado.classList.remove('oculto');
}

function cerrarModalEstado() {
	modalEstado.classList.add('oculto');
}

function cerrarRanking() {
	modalRanking.classList.add('oculto');
}
