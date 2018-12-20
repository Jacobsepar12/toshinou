class GroupShipUpdatePosHandler {
	static get ID() {
		return 12989;
	}

	constructor(f) {
		this._handler = function (e, a) {
			if (window.settings.sentinelMode) {
				let parsedCmd = JSON.parse(e.detail);
				let id = parsedCmd[Variables.groupShipID];
				if (id == window.globalSettings.sentinelid) {
					if (parsedCmd.updates[0] != null) {
						if (a.sentinelship == null) {
							a.sentinelship = {mapId: parsedCmd.updates[0].mapId, x: parsedCmd.updates[0].x, y: parsedCmd.updates[0].y, targetId: null, attackerID: null};
						} else {
							a.sentinelship.mapId =  parsedCmd.updates[0].mapId;
							a.sentinelship.x =  parsedCmd.updates[0].x;
							a.sentinelship.y =  parsedCmd.updates[0].y;
						}
					}
				}
			}
		}
	}

	get handler() {
		return this._handler;
	}
}