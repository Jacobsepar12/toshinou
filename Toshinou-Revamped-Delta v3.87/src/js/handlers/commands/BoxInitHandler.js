class BoxInitHandler {
	static get ID() {
		return 27217;
	}

	constructor() {
		this._handler = function (e, a) {
			let box = JSON.parse(e.detail);

			if (box.hash.length == 7) {
				return;
			}

			if (a.isOnBlacklist(box.hash)) {
				return;
			}
			try {
				let pBox = new Box(box.x, box.y, box.hash, box[Variables.boxType]);
				a.boxes[box.hash] = pBox;
			} catch (exception) {
				console.error(exception);
				console.log(box);  
			};
		};
	}

	get handler() {
		return this._handler;
	}
}