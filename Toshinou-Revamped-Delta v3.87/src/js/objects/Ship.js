class Ship extends Movable {
	constructor(x, y, id, isnpc, name, factionId, modifier, clanDiplomacy, cloaked) {
		super(x, y);
		this.id = id;
		this.isNpc = isnpc;
		this.name = name;
		this.factionId = factionId;
		this.isAttacked = false;
		this.modifier = modifier;
		this.clanDiplomacy = clanDiplomacy;
		this.cloaked = cloaked;
		this.targetID = 0;
		this.mapId = 0;
		this.attacksUs = false;
	}

	setTarget(targetX, targetY, time) {
		this.target = new Vector2D(targetX, targetY);
		this.timeToTarget = parseInt(time);
		this.lastUpdate = $.now();
	}

	get isEnemy() {
		if ((window.globalSettings.blackList).includes(this.id.toString())) {
			return true;
		} else if ((window.globalSettings.whiteList).includes(this.id.toString())){
			return false;
		} else if (window.hero.factionId != this.factionId && this.clanDiplomacy != 1 && this.clanDiplomacy != 2 || this.clanDiplomacy == 3) {
			return true;
		} else {
			return false;
		}
	}
	
	get onTheBlackList() {
		if ((window.globalSettings.blackList).includes(this.id.toString())) {
			return true;
		} else {
			return false;
		}
	}

	get percentOfHp() {
		return (this.hp && this.maxHp) ? MathUtils.percentFrom(this.hp, this.maxHp) : 100;
	}

	update() {
		if (this.target == null)
			return;

		let diff = $.now() - this.lastUpdate;

		if (diff > this.timeToTarget) {
			this.position.set(this.target.x, this.target.y);
			return this.position;
		}

		let dx = this.target.x - this.position.x;
		let dy = this.target.y - this.position.y;

		let sx = dx / this.timeToTarget;
		let sy = dy / this.timeToTarget;

		this.lastUpdate = $.now();
		this.position.set(this.position.x + sx * diff, this.position.y + sy * diff);
	}
}