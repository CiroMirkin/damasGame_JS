# Damas game

Este repositorio es un sitio web que te permite jugar a las damas.
This repository is a web site where you can play damas.

## The struct of the table game

La cuadrícula del tablero está conformada por un contenedor con diez listas, cuyos IDs van desde **a-row** hasta **j-row**.

```html
	<div class="table-game" id="tableGame">
		<ul id="a-row" class="row"></ul>
	</div>
```

También cada ítem de la lista tiene un ID, que se compone de la letra de la fila, un número que indica su lugar en la fila y la palabra "-cell".

```html
	<div class="table-game" id="tableGame">
		<ul id="a-row" class="row">
			<li id="a0-cell"></li>
			<li id="a1-cell"></li>
			<li id="a2-cell"></li>
		</ul>
	</div>
```

## Table game view

![Table game](./src/screenshot.png)