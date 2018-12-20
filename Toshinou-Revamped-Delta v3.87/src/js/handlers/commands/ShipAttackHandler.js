class ShipAttackHandler {
	static get ID() {
		return 9269;
	}

	constructor() {
		this._handler = function (e, a) {
			var shipAttackCmd = JSON.parse(e.detail);
			try {
				let attackerId = shipAttackCmd[Variables.attackerId];
				let attackedShipId = shipAttackCmd[Variables.heroAttackedId];
				let ship = a.ships[attackedShipId];

				if (attackerId == window.hero.id) {
					window.attackWindow.id(attackedShipId);
					window.attackWindow.hp(shipAttackCmd[Variables.attackHp]);
					window.attackWindow.shd(shipAttackCmd[Variables.attackShd]);
					window.attackWindow.targetName(ship.name);
				}

				if (attackedShipId == window.hero.id) {
					window.hero.hp = shipAttackCmd[Variables.attackHp];
					window.hero.shd = shipAttackCmd[Variables.attackShd];
				}

				if (api.targetShip && attackedShipId == api.targetShip.id) {
					api.lastAttack = $.now();
				}
				
				let npcshd = shipAttackCmd[Variables.selectMaxShd];
				if (ship) {
					ship.hp = shipAttackCmd[Variables.attackHp];
					ship.shd = shipAttackCmd[Variables.attackShd];
					ship.targetID = attackerId;

					if (attackerId != window.hero.id) {
						ship.isAttacked = true;
					} else {
						ship.isAttacked = false;
					}
				}
			} catch (exception) {
				console.log(exception.message);
				console.log(shipAttackCmd);
			};
		}
	}

	get handler() {
		return this._handler;
	}
}