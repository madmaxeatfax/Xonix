class seaEnemy {

	constructor() {
		this.col = Math.round(Math.random() * (width/scl - 4*indent) + 2*indent); //случайный столбец поля
		this.line = Math.round(Math.random() * (height/scl - 4*indent) + 2*indent); //случайная строка
		this.colSpeed = [-1, 1][ Math.round(Math.random()) ]; //1ые квадр. скобки - массив
		this.lineSpeed = [-1, 1][ Math.round(Math.random()) ]; //2ые - элемент массива
	}

	//arr[..][..] == 0 - клетка суши arr[..][..] == 1 - клетка моря
	updateAndDraw(arr) {
		if (arr[this.line + this.lineSpeed][this.col] == 0
		&& arr[this.line][this.col + this.colSpeed] == 0) {
			//внешний угол
			this.lineSpeed = -this.lineSpeed;
			this.colSpeed = -this.colSpeed;
		} else if (arr[this.line][this.col + this.colSpeed] == 0) {
			//правая или левая грань
			this.colSpeed = -this.colSpeed;
		} else if (arr[this.line + this.lineSpeed][this.col] == 0) {
			//нижняя или верхняя грань
			this.lineSpeed = -this.lineSpeed;
		} else if (arr[this.line + this.lineSpeed][this.col + this.colSpeed] == 0
			&& arr[this.line + this.lineSpeed][this.col] != 0
			&& arr[this.line][this.col + this.colSpeed] != 0) {
			//внутренний угол
			this.lineSpeed = -this.lineSpeed;
			this.colSpeed = -this.colSpeed;
		}

		this.col += this.colSpeed;
		this.line += this.lineSpeed;

		let xc = (this.col + this.col + 1)/2;
		let yc = (this.line + this.line + 1)/2;


		ctx.lineWidth = 3;
		ctx.strokeStyle = WHITE;
		ctx.fillStyle = BLUE;
		ctx.beginPath();
		ctx.arc(xc*scl, yc*scl, (scl-3)/2, 0, 2*Math.PI);
		ctx.stroke();
		ctx.fill();
	}

}

class landEnemy {

	constructor() {
		this.col = 1;
		this.line = 3;
		this.colSpeed = 1;
		this.lineSpeed = 1;
	}

	//arr[..][..] == 0 - клетка суши arr[..][..] == 1 - клетка моря
	updateAndDraw(arr) {
		if ((this.col + this.colSpeed == width/scl
			|| this.col + this.colSpeed == -1)
		&& (this.line + this.lineSpeed == height/scl
			|| this.line + this.lineSpeed == -1)) {
			//углы суши
			this.colSpeed = -this.colSpeed;
			this.lineSpeed = -this.lineSpeed;
		} else if (this.col + this.colSpeed == width/scl
			|| this.col + this.colSpeed == -1) {
			//правый или левый край
			this.colSpeed = -this.colSpeed;
		} else if (this.line + this.lineSpeed == height/scl
			|| this.line + this.lineSpeed == -1) {
			//верхний или нижний край
			this.lineSpeed = -this.lineSpeed;
		} else if (arr[this.line + this.lineSpeed][this.col + this.colSpeed] == 1
			&& arr[this.line][this.col + this.colSpeed] != 1
			&& arr[this.line + this.lineSpeed][this.col] != 1) {
			//внешний угол моря
			this.lineSpeed = -this.lineSpeed;
			this.colSpeed = -this.colSpeed;
		} else if (arr[this.line + this.lineSpeed][this.col] == 1
			&& arr[this.line][this.col + this.colSpeed] == 1) {
			//внутренний угол моря
			this.lineSpeed = -this.lineSpeed;
			this.colSpeed = -this.colSpeed;
		} else if (arr[this.line + this.lineSpeed][this.col] == 1) {
			//боковые стороны моря
			this.lineSpeed = -this.lineSpeed;
		} else if (arr[this.line][this.col + this.colSpeed] == 1) {
			//верхняя или нижняя сторона моря
			this.colSpeed = -this.colSpeed;
		}


		this.col += this.colSpeed;
		this.line += this.lineSpeed;

		ctx.lineWidth = 3;
		ctx.lineJoin = 'round';
		ctx.strokeStyle = BLACK;
		ctx.fillStyle = BLUE;
		ctx.beginPath();
		ctx.rect(this.col*scl+1.5, this.line*scl+1.5, scl-3, scl-3);
		ctx.stroke();
		ctx.fill();
	}

	toDefault() {
		this.col = 1;
		this.line = 3;
	}
}

let number_of_enemys = 3;
function makeEnemys() {
	enemy = [];
	enemys_coord = [];

	for (let i = 0; i < number_of_enemys; i++) {
		if (i == 0) enemy[i] = new landEnemy();
		else enemy[i] = new seaEnemy();

		enemys_coord.push( {col: enemy[i].col, line: enemy[i].line} );
	}
}


function updateEnemys(arr) {
	for (let i = 0; i < number_of_enemys; i++) {
		enemy[i].updateAndDraw(arr);

		enemys_coord[i].col = enemy[i].col;
		enemys_coord[i].line = enemy[i].line ;
	}

	//обрабатываем столкновения
	for (let i = 1; i < number_of_enemys - 1; i++) {
		for (let j = i + 1; j < number_of_enemys; j++) {
			if ( Math.abs(enemy[i].col - enemy[j].col) <= 1
			&& Math.abs(enemy[i].line - enemy[j].line) <= 1) {
				enemy[i].colspeed = -enemy[i].colspeed;
				enemy[j].lineSpeed = -enemy[j].lineSpeed;
				enemy[j].colspeed = -enemy[j].colspeed;
			}
		}
	}
}
