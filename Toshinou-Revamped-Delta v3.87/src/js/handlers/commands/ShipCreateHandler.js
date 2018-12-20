class ShipCreateHandler {
	static get ID() {
		return 5794;
	}

	constructor() {
		this._handler = function (e, a) {
			e.detail = e.wholeMessage.split("|").slice(1).join("");

			let shipCreateCmd = JSON.parse(e.detail);
			if (!a.ships.hasOwnProperty(shipCreateCmd.userId)){
				let name = shipCreateCmd.userName;
				if (name == null) {
					name = "No-Name";
				}
				a.ships[shipCreateCmd.userId] = new Ship(shipCreateCmd.x, shipCreateCmd.y, shipCreateCmd.userId, shipCreateCmd.npc, name, shipCreateCmd.factionId, shipCreateCmd.modifier, shipCreateCmd[Variables.clanDiplomacy].type, shipCreateCmd.cloaked);
			}
		}
	}

	get handler() {
		return this._handler;
	}
}