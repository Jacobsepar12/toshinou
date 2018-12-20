class Settings {
	constructor(pause, 
			refresh, gatestonpc,
			lockNpcs, lockPlayers, autoAttack, autoAttackNpcs,
			ggbot, palladium, piratebot, cubibot) 
			{
		this._pause = pause === true;
		this._refresh = refresh === true;
		this.npcCircleRadius = 600;
		this._gatestonpc = gatestonpc === true;
		this._lockNpcs = lockNpcs === true;
		this._lockPlayers = lockPlayers === true;
		this._autoAttack = autoAttack === true;
		this._palladium = palladium === true;
		this._ggbot = ggbot === true;
		this._piratebot = piratebot === true;
		this._cubibot = cubibot === true;

		this._npcs = new Array();
			}

	get pause() {
		return this._pause;
	}

	set pause(value) {
		this._pause = value === true;
	}

	get palladium() {
		return this._palladium;
	}

	set palladium(value) {
		this._palladium = value === true;
	}

	get refresh() {
		return this._refresh;
	}

	set refresh(value) {
		this._refresh = value === true;
	}

	get gatestonpc() {
		return this._gatestonpc;
	}

	set gatestonpc(value) {
		this._gatestonpc = value;
	}

	get ggbot() {
		return this._ggbot;
	}

	set ggbot(value) {
		this._ggbot = value === true;
	}

	get lockNpcs() {
		return this._lockNpcs;
	}

	set lockNpcs(value) {
		this._lockNpcs = value === true;
	}

	get lockPlayers() {
		return this._lockPlayers;
	}

	set lockPlayers(value) {
		this._lockPlayers = value === true;
	}

	get autoAttack() {
		return this._autoAttack;
	}

	set autoAttack(value) {
		this._autoAttack = value === true;
	}

	get cubibot() {
		return this._cubibot;
	}

	set cubibot(value) {
		this._cubibot = value === true;
	}

	get piratebot() {
		return this._piratebot;
	}

	set piratebot(value) {
		this._piratebot = value === true;
	}

	get npcs() {
		return this._npcs;
	}

	set npcs(value) {
		this._npcs = value;
	}

	setNpc(name,val) {
		if (this._npcs.hasOwnProperty(name)){
			this._npcs[name]["priority"] = val;
		} else {
			var npcdata = {"name": name, "range": this.npcCircleRadius, "ammo": "1", "priority": val};
			this._npcs[name] = npcdata;
		}
	}

	updateNpc(name, val) {
		this._npcs[name] = val;
	}

	getNpc(name) {
		if (this._npcs.hasOwnProperty(name)){
			return this._npcs[name];
		} else {
			var npcdata = {"name": name, "range": this.npcCircleRadius, "ammo": "0", "priority": "1"};
			return npcdata;
		}
	}

	getPriority(name){
		let npc = this.getNpc(ship.name);
	}

}