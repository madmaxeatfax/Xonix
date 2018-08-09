//игровые параметры
const scl = 10;
const indent = 2;
const fps = 20;
const set_timer = 80;
const LIFE = 3;

//цветовая палитра
const BLACK = '#000000';
const BLUE = '#57afb1';
const PURPLE = '#a236ad';
const WHITE = '#cecaca';

//инициализируем объекты
let field, xonix, enemy;
let enemys_coord;

function setup() {
	createCanvas( 50*scl, (40 + indent)*scl );
	height = 40*scl; //отводим место под консоль

	field = new Field();
	xonix = new Xonix();
	makeEnemys();

	frameRate(fps);
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
		alert("You Screwed Up \nScore: " + xonix_score);
		//highscore_table.push(xonix_score);
		xonix.life = LIFE;
		xonix_score = 0;

		field.default();
		number_of_enemys = 3;
		makeEnemys();
	}

	//переход на следующий уровень
	if (field.complete_percent >= 75) {
		xonix_score += 500;
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

	field.update();
	updateEnemys(field.array);
	xonix.update(field.array);
	if (xonix.onTheSea) xonix.grab(field.array);
	game_console();
}


let counter = 0;
function keyPressed() {
	//console.log(keyCode);
	if (keyCode === UP_ARROW) {

		if (xonix.onTheSea && xonix.lineSpeed == 1) return;
		xonix.dir(0, -1);

	} else if (keyCode === DOWN_ARROW) {

		if (xonix.onTheSea && xonix.lineSpeed == -1) return;
		xonix.dir(0, 1);

	} else if (keyCode === RIGHT_ARROW) {

		if (xonix.onTheSea && xonix.colSpeed == -1) return;
		xonix.dir(1, 0);

	} else if (keyCode === LEFT_ARROW) {

		if (xonix.onTheSea && xonix.colSpeed == 1) return;
		xonix.dir(-1, 0);

	} else if (keyCode == 32 && counter%2 == 0) {
		noLoop();
		counter++;

		clearInterval(timerId);
	} else if (keyCode == 32 && counter%2 != 0) {
		loop();
		counter++;

		timerId = setInterval(() => {seconds_left--;}, 1000);
	}
}

//таймер
let seconds_left = set_timer;
let timerId = setInterval(() => {seconds_left--;}, 1000);

let xonix_score = 0;
function game_console() {
	//if (seconds_left >= 77 && xonix.life == LIFE) showScores();

	//нарисовать консоль
	noStroke();
	fill(BLACK);
	rect(0, height, width, indent*scl);

	//заполняем консоль
	fill(WHITE);
	textSize(2*scl);

	//счет
	xonix_score += floor( pow(field.xonix_grab, 2) );
	if (field.xonix_grab < 8 && field.xonix_grab != 0) xonix_score += 30;
	text("Score: " + xonix_score, 0.05 * width, height+17);

	//количество жизней
	text("Xn: " + xonix.life, 0.34 * width, height+17);

	//процент захваченного поля
	text("Full: " + field.complete_percent + "%", 0.52 * width, height+17);

	//таймер
	text("Time: " + seconds_left, 0.8 * width, height+17);
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