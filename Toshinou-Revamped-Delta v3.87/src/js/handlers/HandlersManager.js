class HandlersManager {
	constructor(a) {
		this.handlers = {};
		this._api = a;
	}

	registerEvent(e, h) {
		$(document).on(e, h.handler);
	}

	registerCommand(id, h) {
		this.handlers[id] = h.handler;
	}

	listen() {
		let self = this;
		$(document).on("commandRec", function (e) {
			let s = e.detail.split("|");
			let id = parseInt(s[0]);
			let cmd = s[1];
			let h = self.handlers[id];

			/*var l = e.detail.indexOf("150000446");
			if(l != null && l>0){
				console.log(e.detail);
			}*/

			if (h != null) {
				h({
					detail: cmd,
					wholeMessage: e.detail
				}, self._api);
			}
		});
	}
}