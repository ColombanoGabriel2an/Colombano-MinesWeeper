MINESWEEPER WEB

https://colombanogabriel2an.github.io/Colombano-MinesWeeper/

Versión web interactiva del clásico juego de Buscaminas, desarrollado con HTML, CSS y JavaScript.

FUNCIONALIDAD GENERAL 

El juego genera automáticamente un tablero con minas distribuidas aleatoriamente y números que indican la cantidad de minas adyacentes. Permite al usuario interactuar con las celdas haciendo click para descubrirlas. Las celdas con valor 0 se expanden automáticamente, revelando las celdas adyacentes sin minas. El jugador gana al descubrir todas las celdas sin minas. Si selecciona una celda con mina, pierde la partida.

FUNCIONALIDADES SECUNDARIAS

- Temporizador desde el inicio hasta ganar o perder.
- Modo claro / oscuro con cambio dinámico desde el botón.
- Tablero responsive, con ajustes visuales por dificultad.

NIVELES DE DIFICULTAD 

- Fácil: 8x8 con 10 minas
- Media: 12x12 con 25 minas
- Difícil: 16x16 con 40 minas

Cada dificultad ajusta automáticamente el tamaño del tablero y la cantidad de minas.

RANKING DE PARTIDAS

- Se almacena en la victoria el nombre del jugador, el tiempo que tardó en finalizar la partida y la fecha en que jugó.
- El ranking se almacena localmente en el navegador, separado por dificultad.
- Desde el botón "Ver ranking" se abre un modal con los mejores resultados de la dificultad actual.
- Se puede ordenar el ranking por Tiempo (puntaje) o por Fecha de la Partida

COMPATIBILIDAD 

Funciona en navegadores modernos de escritorio. Se recomienda resoluciones amplias para visualizar correctamente el tablero en dificultades medias y altas.

TECNOLOGIAS UTILIZADAS 

- HTML5
- CSS3
- JavaScript

ALMACENAMIENTO 

Todos los datos se guardan en el almacenamiento local (`localStorage`). No requiere conexión a internet ni base de datos externa.
