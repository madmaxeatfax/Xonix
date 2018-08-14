//игровые параметры
const scl = 10;
const indent = 2;
const fps = 20;
const set_timer = 80;
const LIFE = 3;
const width = 50*scl;
const height = 40*scl;

//цветовая палитра
const BLACK = '#000000';
const BLUE = '#57afb1';
const PURPLE = '#a236ad';
const WHITE = '#cecaca';

//инициализируем объекты
let field, xonix, enemy, ctx;
//здесь хранятся клетки для обновления на очередном шаге
let enemys_coord, xonix_coord;

function setup() {
	let canvas = document.getElementById('canvas');
	canvas.width = width;
	canvas.height = height + indent*scl;
	ctx = canvas.getContext('2d');

	field = new Field();
	xonix = new Xonix();
	makeEnemys(); //new seaEnemy() и new landEnemy()

	field.default();
}

function draw() {
	//потеря жизни
	if (xonix.isDead) {
		xonix.life--;
		xonix.toDefault();
		enemy[0].toDefault();
		seconds_left = set_timer;
	}

	//дополнительные изменения, если потерял все жизни
	if (xonix.life == 0) {
		alert("You Screwed Up \nScore: " + xonix.score);
		//highscore_table.push(xonix_score);
		xonix.life = LIFE;
		xonix.score = 0;

		field.default();
		number_of_enemys = 3;
		makeEnemys();
	}

	//переход на следующий уровень
	if (field.complete_percent >= 75) {
		xonix.score += 500;
		xonix.life++;

		xonix.toDefault();
		enemy[0].toDefault();
		field.default();
		seconds_left = set_timer;

		number_of_enemys++;
		makeEnemys();
	}

	if (seconds_left == 0) {
		alert("Watch the time. \nYou only have " + set_timer + " seconds");
		xonix.isDead = true;
	}

	field.update(enemys_coord, xonix_coord);
	updateEnemys(field.array);
	xonix.update(field.array);

	game_console();
}

setup();
let animation = setInterval(draw, 1000/fps);


let counter = 0;
window.addEventListener('keydown', event => {
	//console.log(keyCode);
	if (event.code === 'ArrowUp') {
		if (xonix.onTheSea && xonix.lineSpeed == 1) return;
		xonix.dir(0, -1);

	} else if (event.code === 'ArrowDown') {
		if (xonix.onTheSea && xonix.lineSpeed == -1) return;
		xonix.dir(0, 1);

	} else if (event.code === 'ArrowRight') {
		if (xonix.onTheSea && xonix.colSpeed == -1) return;
		xonix.dir(1, 0);

	} else if (event.code === 'ArrowLeft') {
		if (xonix.onTheSea && xonix.colSpeed == 1) return;
		xonix.dir(-1, 0);

	} else if (event.code == 'Space' && counter%2 == 0) {
		counter++;

		clearInterval(animation);
		clearInterval(timer);
	} else if (event.code == 'Space' && counter%2 != 0) {
		counter++;

		animation = setInterval(draw, 1000/fps);
		timer = setInterval(() => {seconds_left--;}, 1000);
	}
});

//таймер
let seconds_left = set_timer;
let timer = setInterval(() => {seconds_left--;}, 1000);


function game_console() {
	//if (seconds_left >= 77 && xonix.life == LIFE) showScores();

	//нарисовать консоль
	ctx.fillStyle = BLACK;
	ctx.fillRect(0, height, width, indent*scl);

	//заполняем консоль
	ctx.fillStyle = WHITE;
	ctx.font = '20px Arial';

	//счет
	ctx.fillText("Score: " + xonix.score, 0.05 * width, height+17);

	//количество жизней
	ctx.fillText("Xn: " + xonix.life, 0.34 * width, height+17);

	//процент захваченного поля
	ctx.fillText("Full: " + field.complete_percent + "%", 0.52 * width, height+17);

	//таймер
	ctx.fillText("Time: " + seconds_left, 0.8 * width, height+17);
}

// let highscore_table = [];
// function showScores() {
// 	noStroke();
// 	fill(BLUE);
// 	textSize(1.5*scl);
// 	text("Scores", 70*scl, 4*scl);

// 	sort( highscore_table );
// 	reverse ( highscore_table );
// 	for (let i = 0; i < highscore_table.length; i++) {
// 		text( highscore_table[i], 70*scl, 6*scl + i*2*scl);
// 	}
// }
