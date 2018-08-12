class Field {

	constructor() {
	 	this.complete_percent = 0;
		this.array = [];
	}
  // 1 - море, 0 - суша

	default() {
		const last_line = height/scl-1;
		const last_col = width/scl-1;

		this.complete_percent = 0;
		this.array.length = 0;
		for (let j = 0; j < height/scl; j++) {
			this.array[j] = [];
			for (let i = 0; i < width/scl; i++) {
				if (i >= indent && j >= indent && i <= last_col - indent && j <= last_line - indent)  {
					this.array[j][i] = 1;
					noStroke();
					fill(BLACK);
					rect(i*scl, j*scl, scl, scl);
				} else {
					this.array[j][i] = 0;
					noStroke();
					fill(BLUE);
					rect(i*scl, j*scl, scl, scl);
				}
			}
		}
	}


	update(enemys_ceils, xonix_ceils) {
		let ceils = enemys_ceils.concat(xonix_ceils);

		ceils.forEach((ceil) => {
			if (this.array[ceil.line][ceil.col] == 1) {
				noStroke();
				fill(BLACK);
				rect(ceil.col*scl, ceil.line*scl, scl, scl);
			} else {
				noStroke();
				fill(BLUE);
				rect(ceil.col*scl, ceil.line*scl, scl, scl);
			}
		});

		if (xonix_ceils.length > 1) {
			let sea_fullsquare = (width/scl - 2*indent) * (height/scl - 2*indent);
			let sea_grabsquare = xonix_ceils.length - 1;
			this.complete_percent += Math.floor( (sea_grabsquare/sea_fullsquare) * 100 );
		}
		// let sea_square = 0;
		//
		// for (let j = 0; j < height/scl; j++) {
		// 	for (let i = 0; i < width/scl; i++) {
		// 		if (this.array[j][i] == 1) {
		// 			noStroke();
		// 			fill(BLACK);
		// 			rect(i*scl, j*scl, scl, scl);
		//
		// 			sea_square += 1;
		// 		} else {
		// 			noStroke();
		// 			fill(BLUE);
		// 			rect(i*scl, j*scl, scl, scl);
		// 		}
		// 	}
		// }
		//
		// this.complete_percent = Math.floor( (1 - sea_square/this.sea_fullsquare) * 100 );
	}
}
