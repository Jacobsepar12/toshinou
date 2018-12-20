class HeroConnectedEventHandler {
	constructor() {
		this._handler = function (e) {
			api.isDisconnected = false;
			api.disconnectTime = 0;
			console.log("Connected!");
		}
	}

	get handler() {
		return this._handler;
	}
}