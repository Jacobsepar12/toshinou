class GroupCreateHandler {
	static get ID() {
		return 27620;
	}

	constructor(f) {
		this._handler = function (e, a) {
			if (window.settings.sentinelMode) {
				let shipCreateCmd = JSON.parse(e.detail);
				if (shipCreateCmd.id == window.globalSettings.sentinelid) {
					a.sentinelship = {mapId: shipCreateCmd.location.mapId, x: shipCreateCmd.location.x, y: shipCreateCmd.location.y, targetId: null, attackerID: null};
				}
			}
		}
	}

	get handler() {
		return this._handler;
	}
}