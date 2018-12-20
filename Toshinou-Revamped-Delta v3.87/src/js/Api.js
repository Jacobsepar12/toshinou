class Api {
	constructor() {
		this._blackListedBoxes = [];
		this.gates = [];
		this.boxes = {};
		this.ships = {};
		this.battlestation = null;
		this.lastMovement = 0;
		this.isDisconnected = false;
		this.disconnectTime = null;
		this.reconnectTime = null;
		this.jumpTime = $.now();
		this.resetBlackListTime = $.now();
		this.blackListTimeOut = 150000
		this.rute = null;
		this.starSystem = [];
		this.workmap = null;
		this.changeConfigTime = $.now();
		this.autoLocked = false;
		this.lastAutoLock = $.now();
		this.habilityCoolDown = 1;
		this.habilityCoolDownTwo = 1;
		this.habilityCoolDownThree = 1;
		this.habilityCoolDownFour = 1;
		this.changeFormationTime = $.now();
		this.RSBTime = $.now();
		this.formation = -1;
		this.ammunition = -1;
		this.resetTargetWhenHpBelow25Percent = false;
		this.sentinelship = null;
		this.attacking = false;
		this.map53 = [];
		this.map52 = [];
		this.map51 = [];
		this.lowMap = [];
		this.rutePirateMaps = null;
		this.pet = null;
		this.jumped = false;
		this.petHasFuel = true;
	}
	
	changePetModule(module_id){
		if(this.pet.currentModule != module_id){
			Injector.injectScript('document.getElementById("preloader").petModule(parseInt('+module_id+'), "");');
			this.pet.currentModule = module_id;
		}
	}

	callPet(n){
		// 0 = activate
		// 1 = deactivate
		// 4 = repair
		Injector.injectScript('document.getElementById("preloader").petCall('+parseInt(n)+');');
		this.pet.currentModule = -1;
	}

	useHability() {
		var cooldownlist = {"cyborg":311000,"solace":141000,"diminisher":162000,"venom":181000,"sentinel":236000,"spectrum":211000,"v-lightning":186000,"aegis":101000,"spearhead":401000,"citadel":46000,"mimesis":361000,"hammerclaw":171000,"tartarus":28000};
		if (this.habilityCoolDown && $.now() - this.habilityCoolDown > cooldownlist[window.hero.skillName]) {
			this.quickSlot(window.globalSettings.habilitySlot);
			this.habilityCoolDown = $.now();
			return true;
		}
		return false;
	}

	useHabilityTwo() {
		var cooldownlist = {"aegis":36000,"spearhead":200000,"citadel":51000, "mimesis":301000,"hammerclaw":101000,"tartarus":71000};
		if (this.habilityCoolDownTwo && $.now() - this.habilityCoolDownTwo > cooldownlist[window.hero.skillName]) {
			this.quickSlot(window.globalSettings.habilitySlotTwo);
			this.habilityCoolDownTwo = $.now();
			return true;
		}
		return false;
	}

	useHabilityThree() {
		var cooldownlist = {"aegis":131000,"spearhead":56000,"citadel":71000, "hammerclaw":147000};
		if (this.habilityCoolDownThree && $.now() - this.habilityCoolDownThree > cooldownlist[window.hero.skillName]) {
			this.quickSlot(window.globalSettings.habilitySlotThree);
			this.habilityCoolDownThree = $.now();
			return true;
		}
		return false;
	}

	useHabilityFour() {
		var cooldownlist = {"citadel":370000,"spearhead":150000};
		if (this.habilityCoolDownFour && $.now() - this.habilityCoolDownFour > cooldownlist[window.hero.skillName]) {
			this.quickSlot(window.globalSettings.habilitySlotFour);
			this.habilityCoolDownFour = $.now();
			return true;
		}
		return false;
	}

	getShipName(fullname) {
		let namelist = /ship_(.*?)(_|$)/g;
		let rname = namelist.exec(fullname);
		let shipType = "";
		if (rname != null) {
			if (rname[1] == "a-veteran" || rname[1] == "a-elite") {
				shipType = "aegis";
			} else if (rname[1] == "c-veteran" || rname[1] == "c-elite") {
				shipType = "citadel";
			} else if (rname[1] == "s-veteran" || rname[1] == "s-elite") {
				shipType = "spearhead";
			} else {
				shipType = rname[1];
			}
			return shipType;
		} else {
			return false;
		}
	}

	changeFormation(n) {
		if (this.changeFormationTime && $.now() - this.changeFormationTime > 3000 && this.changeConfigTime && $.now() - this.changeConfigTime > 10000) {
			this.changeFormationTime = $.now();
			this.formation = n;
			this.quickSlot(n);
			return true;
		} else {
			return false;
		}
	}

	quickSlot(n) {
		if (n>=0 && n< 10) {
			let slots = [48,49,50,51,52,53,54,55,56,57];
			this.pressKey(slots[n]);
			setTimeout(() => {
				this.pressKey(slots[n]);
			}, 700);
		}
	}

	pressKey(n) {
		Injector.injectScript('document.getElementById("preloader").pressKey('+n+');');
	}

	changeRefreshCount(n) {
		chrome.storage.local.set({"refreshCount": n});
	}

	changeAmmunition(ammo) {
		if(this.ammunition != ammo) {
			switch(ammo) {
				case 1:
					this.quickSlot(window.globalSettings.x1Slot);
					break;
				case 2:
					this.quickSlot(window.globalSettings.x2Slot);
					break;
				case 3:
					this.quickSlot(window.globalSettings.x3Slot);
					break;
				case 4:
					this.quickSlot(window.globalSettings.x4Slot);
					break;
				case 6:
					this.quickSlot(window.globalSettings.sabSlot);
					break;
				case 45:
					if ($.now() - this.RSBTime > 3000) {
						this.quickSlot(window.globalSettings.rsbSlot);
						this.ammunition = ammo;
						this.RSBTime = $.now();
						setTimeout(() => {
							this.quickSlot(window.globalSettings.x4Slot);
							this.ammunition = 4;
						}, 500);
					} else {
						this.quickSlot(window.globalSettings.x4Slot);
						this.ammunition = 4;
					}
					break;
				default:
					this.quickSlot(window.globalSettings.x1Slot);
			}	
			this.ammunition = ammo;
		}
	}

	lockShip(ship) {
		if (!(ship instanceof Ship))
			return;

		if (this.ships[ship.id] == null)
			return;

		ship.update();
		let pos = ship.position;
		let scr = 'document.getElementById("preloader").lockShip(' + ship.id + ',' + Math.round(pos.x) + ',' + Math.round(pos.y) + ',' + Math.round(window.hero.position.x) + ',' + Math.round(window.hero.position.y) + ');';
		Injector.injectScript(scr);

		this.lockTime = $.now();
	}

	lockNpc(ship) {
		if (!(ship instanceof Ship))
			return;

		if (this.ships[ship.id] == null)
			return;

		this.lockTime = $.now();

		this.lockShip(ship);
	}

	reconnect() {
		Injector.injectScript('document.getElementById("preloader").reconnect();');
		this.reconnectTime = $.now();
	}

	collectBox(box) {
		if (!(box instanceof Box))
			return;

		if (this.boxes[box.hash] == null)
			return;

		if (MathUtils.random(1, 100) >= window.settings.collectionSensitivity) {
			return;
		}

		Injector.injectScript('document.getElementById("preloader").collectBox' + box.hash + '()');

		this.collectTime = $.now();
	}

	moveWithFilter(x, y) {
		if (window.hero.mapId == 93 || window.hero.mapId == 92 || window.hero.mapId == 91 || window.hero.mapId == 200) {
			this.moveForSpecialMap(x, y, window.hero.mapId);
		} else if (!window.bigMap && !window.settings.ggbot && ((x < 200 || x > 20800) || (y < 200 || y > 12900))) {
			x = MathUtils.random(200, 20800);
			y = MathUtils.random(200, 12900);
			this.move(x, y);
			window.movementDone = false;
		}  else if (window.bigMap && !window.settings.ggbot && ((x < 500 || x > 41500) || (y < 500 || y > 25700))) {
			x = MathUtils.random(500, 41500);
			y = MathUtils.random(500, 25700);
			this.move(x, y);
			window.movementDone = false;
		} else {
			this.move(x, y);
			window.movementDone = false;
		}
	}

	move(x, y) {
		if (!isNaN(x) && !isNaN(y)) {
			if(window.invertedMovement){
				x = x + ((window.hero.position.x - x)*2);
				y = y + ((window.hero.position.y - y)*2);
			}
			window.hero.move(new Vector2D(x, y));
		}
	}

	blackListHash(hash) {
		this._blackListedBoxes.push(hash);
	}

	isOnBlacklist(hash) {
		return this._blackListedBoxes.includes(hash);
	}

	startLaserAttack() {
		if (window.globalSettings.actionsMode == 2) {
			Injector.injectScript('document.getElementById("preloader").laserAttack()');
		} else {
			this.pressKey(17);
		}
	}

	jumpGate() {
		if (window.globalSettings.actionsMode == 2) {
			Injector.injectScript('document.getElementById("preloader").jumpGate();');
		} else {
			this.pressKey(74);
		}
	}

	changeConfig() {
		if (this.changeConfigTime && $.now() - this.changeConfigTime > 5000) {
			this.changeConfigTime = $.now();
			if (window.globalSettings.actionsMode == 2) {
				Injector.injectScript('document.getElementById("preloader").changeConfig();');
			} else {
				this.pressKey(67);
			}
			return true;
		} else {
			return false;
		}
	}

	resetTarget(target) {
		if (target == "enemy") {
			this.targetShip = null;
			this.attacking = false;
			this.triedToLock = false;
			this.lockedShip = null;
			this.ammunition = -1;
		} else if (target == "box") {
			this.targetBoxHash = null;
		} else if (target == "all") {
			this.targetShip = null;
			this.attacking = false;
			this.triedToLock = false;
			this.lockedShip = null;
			this.targetBoxHash = null;
			this.ammunition = -1;
		}
	}

	jumpInGateByType(gateType, settings) {
		if (settings) {
			let box = this.findNearestBox;
			if (!box.box || window.X1Map) {
				let gate = this.findNearestGatebyGateType(gateType);
				if (gate.gate) {
					let x = gate.gate.position.x;
					let y = gate.gate.position.y;
					if (!this.jumped && window.hero.position.distanceTo(gate.gate.position) < 200 && this.jumpTime && $.now() - this.jumpTime > 3000) {
						this.jumpGate();
						this.jumpTime = $.now();
					}
					this.resetTarget("all");
					this.moveWithFilter(x, y);
					window.movementDone = false;
				}
			}
		}
	}

	jumpInGateByID(gateId){
		let hasJumped = false;
		let gate = this.findGatebyID(gateId);
		if (gate.gate) {
			let x = gate.gate.position.x + MathUtils.random(-100, 100);
			let y = gate.gate.position.y + MathUtils.random(-100, 100);
			if (!this.jumped && window.hero.position.distanceTo(gate.gate.position) < 200 && this.jumpTime && $.now() - this.jumpTime > 3000) {
				this.jumpGate();
				this.jumpTime = $.now();
				hasJumped = true;
			}
			this.resetTarget("all");
			this.moveWithFilter(x, y);
			window.movementDone = false;
		}
		return hasJumped;
	}

	jumpAndGoBack(gateId){
		if (window.globalSettings.workmap != null) {
			this.workmap = window.globalSettings.workmap;
		} else {
			this.workmap = window.hero.mapId;
		}
		let hasJumped = this.jumpInGateByID(gateId);
		return hasJumped;
	}

	ggDeltaFix() {
		let shipsCount = Object.keys(this.ships).length;
		for (let property in this.ships) {
			let ship = this.ships[property];
			if (ship && (ship.name == "-=[ StreuneR ]=- δ4" || 
					ship.name == "-=[ Lordakium ]=- δ9" || 
					ship.name == "-=[ Sibelon ]=- δ14" || 
					ship.name == "-=[ Kristallon ]=- δ19")) {
				this.resetTargetWhenHpBelow25Percent = false;
				if (shipsCount > 1) {
					window.settings.setNpc(ship.name, "0");
					if (this.targetShip == ship) {
						this.resetTarget("enemy");
					}
				} else {
					window.settings.setNpc(ship.name, "9");
					this.targetShip = ship;
				}
			} else if (ship && (ship.name == "..::{ Boss Lordakium }::... δ25" ||
					ship.name == "..::{ Boss Lordakium }::... δ21" ||
					ship.name == "..::{ Boss Lordakium }::... δ23")) {
				this.resetTargetWhenHpBelow25Percent = false;
				if (shipsCount > 3) {
					window.settings.setNpc(ship.name, "0");
					if (this.targetShip == ship) {
						this.resetTarget("enemy");
					}
				} else {
					window.settings.setNpc(ship.name, "9");
					this.targetShip = ship;
				}
			}
		}
	}

	ggZetaFix() {
		let shipsCount = Object.keys(this.ships).length;
		for (let property in this.ships) {
			let ship = this.ships[property];
			if (ship && (ship.name == "-=[ Devourer ]=- ζ25" || ship.name == "-=[ Devourer ]=- ζ27")) {
				this.resetTargetWhenHpBelow25Percent=false;
				if (shipsCount > 1) {
					window.settings.setNpc(ship.name, "0");
					if (this.targetShip == ship) {
						this.resetTarget("enemy");
					}
				} else {
					window.settings.setNpc(ship.name, "9");
					this.targetShip = ship;
				}
			}
		}
	}

	protegitmode() {
		for (let property in this.ships) {
			let ship = this.ships[property];
			if (ship && (ship.name == "-=[ Cubikon ]=-") && ship.distanceTo(window.hero.position) < 1000) {
				let shipsCount = this.countNpcAroundByName("-=[ Protegit ]=-", 2000);
				if (shipsCount > 1 && !(lockedShip && lockedShip.percentOfHp < 5 && lockedShip.name == "-=[ Cubikon ]=-")) {
					window.settings.setNpc(ship.name, true);
					if (lockedShip && lockedShip.percentOfHp < 99 && lockedShip.name == "-=[ Cubikon ]=-") {
						this.resetTarget("enemy");
						window.settings.setNpc(ship.name, false);
					}
					if (this.targetShip == ship) {
						this.resetTarget("enemy");
					}
				} else {
					window.settings.setNpc(ship.name, false);
					this.targetShip = ship;
				}
			}
		}
	}

	countNpcAroundByName(name, distance){
		let shipsCount = Object.keys(this.ships).length;
		let shipsAround = 0;
		for (let property in this.ships) {
			let ship = this.ships[property];
			if (ship && (ship.distanceTo(window.hero.position) < distance) && (ship.name == name)) {
				shipsAround++;
			}
		}
		return shipsAround;
	}

	countNpcAround(distance){
		let shipsCount = Object.keys(this.ships).length;
		let shipsAround = 0;
		for (let property in this.ships) {
			let ship = this.ships[property];
			if (ship && ship.distanceTo(window.hero.position) <= distance) {
				shipsAround++;
			}
		}
		return shipsAround;
	}

	findNearestBox() {
		let minDist = 100000;
		let finalBox;

		if (!window.globalSettings.bonusBox && !window.globalSettings.materials && !window.settings.palladium && !window.globalSettings.cargoBox && !window.globalSettings.greenOrGoldBooty && !window.globalSettings.redBooty && !window.globalSettings.blueBooty && !window.globalSettings.masqueBooty) {
			return {
				box: null,
				distance: minDist
			};
		}

		if (window.settings.palladium) {
			minDist = 1000;
		}

		for (let property in this.boxes) {
			let box = this.boxes[property];
			let dist = box.distanceTo(window.hero.position);
			if (dist < minDist) {
				if (!box.isResource() && ((box.isCollectable() && window.globalSettings.bonusBox) ||
						((box.isMaterial() || box.isDropRes()) && window.globalSettings.materials) ||
						(box.isPalladium() && window.settings.palladium) ||
						(box.isCargoBox() && window.globalSettings.cargoBox) ||
						(box.isGreenOrGoldBooty() && window.globalSettings.greenOrGoldBooty && window.greenOrGoldBootyKeyCount > 0) ||
						(box.isRedBooty() && window.globalSettings.redBooty && window.redBootyKeyCount > 0) ||
						(box.isBlueBooty() && window.globalSettings.blueBooty && window.blueBootyKeyCount > 0) ||
						(box.isMasqueBooty() && window.globalSettings.masqueBooty && window.masqueBootyKeyCount > 0))) {
					finalBox = box;
					minDist = dist;
				}
			}
		}
		return {
			box: finalBox,
			distance: minDist
		};
	}


	findNearestShip() {
		let minDist = 100000;
		let finalShip;
		let minPriority = 1;

		if (!window.settings.killNpcs) {
			return {
				ship: null,
				distance: minDist
			};
		}

		for (let property in this.ships) {
			let ship = this.ships[property];
			ship.update();
			if ((ship.isNpc  && ((!window.globalSettings.onlyAnswerAttacks || !window.settings.palladium) || (window.globalSettings.onlyAnswerAttacks && ship.attacksUs && window.settings.palladium))) || 
					(!ship.isNpc && window.globalSettings.respondPlayerAttacks && ship.attacksUs && ship.isEnemy) || (!ship.isNpc && ship.isEnemy && window.globalSettings.attackEnemyPlayers)) {
				if (!ship.isNpc) {
					finalShip = ship;
					let dist = ship.distanceTo(window.hero.position);
					return {
						ship: finalShip,
						distance: dist
					};
				}
				let npcdata =  window.settings.getNpc(ship.name);
				let priority = npcdata["priority"];
				if (priority >= minPriority) {
					if (!ship.isAttacked) {
						finalShip = ship;
						minPriority = priority;
					}
				}
			}
		}

		for (let property in this.ships) {
			let ship = this.ships[property];
			ship.update();
			if ((ship.isNpc  && (!window.globalSettings.onlyAnswerAttacks || (window.globalSettings.onlyAnswerAttacks && ship.attacksUs)))) {
				let npcdata =  window.settings.getNpc(ship.name);
				let priority = npcdata["priority"];
				if (priority >= minPriority) {
					let dist = ship.distanceTo(window.hero.position);
					if (dist < minDist) {
						if (!ship.isAttacked) {
							finalShip = ship;
							minDist = dist;
							minPriority = priority;
						}
					}
				}
			}
		}

		return {
			ship: finalShip,
			distance: minDist
		};
	}

	findNearestGate() {
		let minDist = 100000;
		let finalGate;

		this.gates.forEach(gate => {
			if (gate.gateId != 150000409 && gate.gateId != 150000410 && gate.gateId != 150000411 && (gate.gateType == 1 || gate.gateType == 51 || gate.gateType == 52)) {
				let dist = window.hero.distanceTo(gate.position);
				if (dist < minDist) {
					finalGate = gate;
					minDist = dist;
				}
			}
		});

		return {
			gate: finalGate,
			distance: minDist
		};
	}

	findNearestGateForRunAway(enemy) {
		let minDist = 100000;
		let finalGate;
		this.gates.forEach(gate => {
			if (gate.gateId != 150000409 && gate.gateId != 150000410 && gate.gateId != 150000411 && (gate.gateType == 1 || gate.gateType == 51 || gate.gateType == 52)) {
				let pvpgates = [150000299, 150000319,150000330, 150000191, 150000192, 150000193];
				if(!(window.globalSettings.jumpFromEnemy && pvpgates.indexOf(gate.gateId) != -1)){
					let enemyDistance = enemy.distanceTo(gate.position);
					let dist = window.hero.distanceTo(gate.position);
					if (enemyDistance < dist) {
						return;
					}

					if (dist < minDist) {
						finalGate = gate;
						minDist = dist;
					}
				}
			}
		});

		return {
			gate: finalGate,
			distance: minDist
		};
	}

	findNearestGatebyGateType(gateType) {
		let minDist = 100000;
		let finalGate;

		this.gates.forEach(gate => {
			let dist = window.hero.distanceTo(gate.position);
			if (dist < minDist && gate.gateType == gateType) {
				finalGate = gate;
				minDist = dist;
			}
		});

		return {
			gate: finalGate,
			distance: minDist
		};
	}

	markHeroAsDead() {
		this.heroDied = true;
		Injector.injectScript("window.heroDied = true;");
	}

	checkForCBS(){
		let result = {
				walkAway: false,
				cbsPos: null,
		};
		result.cbsPos = this.battlestation.position;
		let dist = this.battlestation.distanceTo(window.hero.position);
		if (dist < 1500) {
			result.walkAway = true;
		}
		return result;
	}

	checkForEnemy() {
		let result = {
				run: false,
				enemy: null,
				edist: 100000
		};
		let enemyDistance = 100000;
		let enemyShip;
		for (let property in this.ships) {
			let ship = this.ships[property];
			ship.update();
			if (!ship.isNpc && ship.isEnemy) {
				let dist = ship.distanceTo(window.hero.position);
				if (enemyDistance > dist) {
					enemyDistance = dist;
					result.edist = dist;
					result.enemy = ship;
				}
			}
		}
		if (enemyDistance < 2000) {
			result.run = true;
			return result;
		}
		return result;
	}

	countShipsAround(distance) {
		let shipsCount = Object.keys(this.ships).length;
		let shipsAround = 0;
		for (let property in this.ships) {
			let ship = this.ships[property];
			if (ship && ship.distanceTo(window.hero.position) < distance && !ship.isNpc) {
				shipsAround++;
			}
		}
		return shipsAround;
	}

	findGatebyID(gateId) {
		let finalGate;

		this.gates.forEach(gate => {
			if (gate.gateId == gateId) {
				finalGate = gate;
			}
		});

		return {
			gate: finalGate,
		};
	}

	goToMap(idWorkMap){
		if (this.rute == null) {
			this.fillStarSystem();
			let mapSystem = {1:{2:1},2:{1:1,3:1,4:1},3:{2:1,7:1,4:1},4:{2:1,3:1,13:2,13:1},13:{4:1,14:2,15:2,16:2},5:{6:1},6:{5:1,7:1,8:1},7:{6:1,3:1,8:1},8:{6:1,7:1,14:2,11:1},14:{8:1,13:2,15:2,16:2},9:{10:1},10:{9:1,12:1,11:1},
					11:{10:1,8:1,12:1},12:{10:1,11:1,15:2,4:1},15:{12:1,14:2,13:2,16:2},16:{13:2,14:2,15:2,17:1,21:1,25:1},29:{17:1,21:1,25:1,91:1},17:{16:2,29:3,19:1,18:1},18:{17:1,20:1},19:{17:1,20:1},20:{18:1,19:1},21:{16:2,29:3,22:1,23:1},22:{21:1,24:1},23:{21:1,24:1},24:{23:1,22:1},25:{29:3,16:2,27:1,26:1},27:{25:1,28:1},26:{25:1,28:1},28:{26:1,27:1},91:{92:1},92:{93:1},93:{16:1}},
					graph = new Graph(mapSystem);
			let imcompleteRute = graph.findShortestPath(window.hero.mapId, idWorkMap);
			if (imcompleteRute != null) {
				this.rute = this.completeRute(imcompleteRute);
			}
		} else {
			let map = this.rute[0];
			let portal = map.portals[0];
			if (window.hero.mapId == map.mapId) {
				this.jumpInGateByID(portal.gateId);
			} else if (window.hero.mapId == portal.idLinkedMap) {
				this.rute.shift(); 
			} else if (window.hero.mapId != map.mapId && window.hero.mapId == portal.idLinkedMap) {
			  this.rute = null;
			}
		}
	}

	fillStarSystem(){
		this.starSystem = [];
		let portals11 = [];
		portals11.push(new Portal(150000159,2));
		this.starSystem.push(new Map(1, portals11));
		let portals12 = [];
		portals12.push(new Portal(150000160,1));
		portals12.push(new Portal(150000161,3));
		portals12.push(new Portal(150000163,4));
		this.starSystem.push(new Map(2, portals12));
		let portals13 = [];
		portals13.push(new Portal(150000162,2));
		portals13.push(new Portal(150000185,4));
		portals13.push(new Portal(150000165,7));
		this.starSystem.push(new Map(3, portals13));
		let portals14 = [];
		portals14.push(new Portal(150000164,2));
		portals14.push(new Portal(150000186,3));
		portals14.push(new Portal(150000189,13));
		portals14.push(new Portal(150000169,12));
		this.starSystem.push(new Map(4, portals14));
		let portals21 = [];
		portals21.push(new Portal(150000174,6)); /* 2-1 | 2-2 */
		this.starSystem.push(new Map(5, portals21));
		let portals22 = [];
		portals22.push(new Portal(150000168,7)); /* 2-2 | 2-3 */
		portals22.push(new Portal(150000175,8)); // 2-2 | 2-4
		portals22.push(new Portal(150000173,5)); // 2-2 | 2-4
		this.starSystem.push(new Map(6, portals22));
		let portals23 = [];
		portals23.push(new Portal(150000166,3)); // 2-3 | 1-3
		portals23.push(new Portal(150000183,8)); // 2-3 | 2-4
		portals23.push(new Portal(150000167,6)); // 2-3 | 2-2
		this.starSystem.push(new Map(7, portals23));
		let portals24 = [];
		portals24.push(new Portal(150000184,7)); // 2-4 | 2-3
		portals24.push(new Portal(150000191,14)); // 2-4 | 4-2
		portals24.push(new Portal(150000176,6)); // 2-4 | 2-2
		portals24.push(new Portal(150000177,11)); // 2-4 | 3-3
		this.starSystem.push(new Map(8, portals24));
		let portals31 = [];
		portals31.push(new Portal(150000182,10)); // 3-1 | 3-2
		this.starSystem.push(new Map(9, portals31));
		let portals32 = [];
		portals32.push(new Portal(150000180,11)); // 3-2 | 3-3
		portals32.push(new Portal(150000172,12)); // 3-2 | 3-4
		portals32.push(new Portal(150000181,9)); // 3-2 | 3-1
		this.starSystem.push(new Map(10, portals32));
		let portals33 = [];
		portals33.push(new Portal(150000178,8)); // 3-3 | 2-4
		portals33.push(new Portal(150000188,12)); // 3-3 | 3-4
		portals33.push(new Portal(150000179,10)); // 3-3 | 3-2
		this.starSystem.push(new Map(11, portals33));
		let portals34 = [];
		portals34.push(new Portal(150000170,4));
		portals34.push(new Portal(150000193,15));
		portals34.push(new Portal(150000187,11));
		portals34.push(new Portal(150000171,10));
		this.starSystem.push(new Map(12, portals34));
		let portals43 = [];
		portals43.push(new Portal(150000194,12)); // 4-3 | 3-4
		portals43.push(new Portal(150000198,14)); // 4-3 | 4-2
		portals43.push(new Portal(150000199,13)); // 4-3 | 4-1
		portals43.push(new Portal(150000293,16)); // 4-3 | 4-4
		this.starSystem.push(new Map(15, portals43));
		let portals41 = [];
		portals41.push(new Portal(150000190,4)); // 4-1 | 1-4
		portals41.push(new Portal(150000195,14)); // 4-1 | 4-2
		portals41.push(new Portal(150000200,15)); // 4-1 | 4-3
		portals41.push(new Portal(150000289,16)); // 4-1 | 4-4
		this.starSystem.push(new Map(13, portals41));
		let portals42 = [];
		portals42.push(new Portal(150000192,8)); // 4-2 | 2-4
		portals42.push(new Portal(150000196,13)); // 4-2 | 4-1
		portals42.push(new Portal(150000197,15)); // 4-2 | 4-3
		portals42.push(new Portal(150000291,16)); // 4-2 | 4-4
		this.starSystem.push(new Map(14, portals42));
		let portals44 = [];
		portals44.push(new Portal(150000318,25)); // 4-4 | 3-5
		portals44.push(new Portal(150000294,15)); // 4-4 | 4-3
		portals44.push(new Portal(150000292,14)); // 4-4 | 4-2
		portals44.push(new Portal(150000308,21)); // 4-4 | 2-5
		portals44.push(new Portal(150000298,17)); // 4-4 | 1-5
		portals44.push(new Portal(150000290,13)); // 4-4 | 4-1
		this.starSystem.push(new Map(16, portals44));
		let portals45 = [];
		portals45.push(new Portal(150000329,17)); // 4-5 | 1-5
		portals45.push(new Portal(150000331,21)); // 4-5 | 2-5
		portals45.push(new Portal(150000333,25)); // 4-5 | 3-5
		portals45.push(new Portal(150000428,91)); // 4-5 | 5-1 MMO
		portals45.push(new Portal(150000430,91)); // 4-5 | 5-1 EIC
		portals45.push(new Portal(150000432,91)); // 4-5 | 5-1 VRU
		this.starSystem.push(new Map(29, portals45));
		let portals15 = [];
		portals15.push(new Portal(150000299,16)); // 1-5 | 4-4
		portals15.push(new Portal(150000328,29)); // 1-5 | 4-5
		portals15.push(new Portal(150000300,18)); // 1-5 | 1-6
		portals15.push(new Portal(150000302,19)); // 1-5 | 1-7
		this.starSystem.push(new Map(17, portals15));
		let portals16 = [];
		portals16.push(new Portal(150000301,17)); //1-6 | 1-5
		portals16.push(new Portal(150000304,20)); //1-6 | 1-8
		this.starSystem.push(new Map(18, portals16));
		let portals17 = [];
		portals17.push(new Portal(150000306,20)); //1-7 | 1-8
		portals17.push(new Portal(150000303,17)); //1-7 | 1-5
		this.starSystem.push(new Map(19, portals17));
		let portals18 = [];
		portals18.push(new Portal(150000305,18)); //1-8 | 1-6
		portals18.push(new Portal(150000307,19)); //1-8 | 1-7
		portals18.push(new Portal(150000201,306)); // 1-8 | 1-BL
		this.starSystem.push(new Map(20, portals18));
		let portals1B = [];
		portals1B.push(new Portal(150000202,20)); // 1-BL | 1-8
		this.starSystem.push(new Map(306, portals1B));
		let portals25 = [];
		portals25.push(new Portal(150000330,16)); //2-5 | 4-4
		portals25.push(new Portal(150000309,29)); //2-5 | 4-5
		portals25.push(new Portal(150000310,22)); //2-5 | 2-6
		portals25.push(new Portal(150000312,23)); //2-5 | 2-7
		this.starSystem.push(new Map(21, portals25));
		let portals26 = [];
		portals26.push(new Portal(150000311,21)); //2-6 | 2-5
		portals26.push(new Portal(150000314,24)); //2-6 | 2-8
		this.starSystem.push(new Map(22, portals26));
		let portals27 = [];
		portals27.push(new Portal(150000313,21)); //2-7 | 2-5
		portals27.push(new Portal(150000316,24)); //2-7 | 2-8
		this.starSystem.push(new Map(23, portals27));
		let portals28 = [];
		portals28.push(new Portal(150000315,22)); //2-8 | 2-6
		portals28.push(new Portal(150000317,23)); //2-8 | 2-7
		this.starSystem.push(new Map(24, portals28));
		let portals35 = [];
		portals35.push(new Portal(150000319,16)); //3-5 | 4-4
		portals35.push(new Portal(150000332,29)); //3-5 | 4-5
		portals35.push(new Portal(150000320,26)); //3-5 | 3-6
		portals35.push(new Portal(150000322,27)); //3-5 | 3-7
		this.starSystem.push(new Map(25, portals35));
		let portals36 = [];
		portals36.push(new Portal(150000321,25)); //3-6 | 3-5
		portals36.push(new Portal(150000324,28)); //3-6 | 3-8
		this.starSystem.push(new Map(26, portals36));
		let portals37 = [];
		portals37.push(new Portal(150000323,25)); //3-7 | 3-5
		portals37.push(new Portal(150000326,28)); //3-7 | 3-8
		this.starSystem.push(new Map(27, portals37));
		let portals38 = [];
		portals38.push(new Portal(150000327,27)); //3-8 | 3-7
		portals38.push(new Portal(150000325,26)); //3-8 | 3-6
		this.starSystem.push(new Map(28, portals38));
		let portals51 = [];
		portals51.push(new Portal(150000434,92)); // 5-1 | 5-2 MMO
		portals51.push(new Portal(150000438,92)); // 5-1 | 5-2 VRU
		portals51.push(new Portal(150000436,92)); // 5-1 | 5-2 EIC
		this.starSystem.push(new Map(91, portals51));
		let portals52 = [];
		portals52.push(new Portal(150000442,93)); // 5-2 | 5-3 EIC
		portals52.push(new Portal(150000440,93)); // 5-2 | 5-3 MMO 15
		portals52.push(new Portal(150000444,93)); // 5-2 | 5-3 VRU
		this.starSystem.push(new Map(92, portals52));
		let portals53 = [];
		portals53.push(new Portal(150000448,16)); // 5-3 | 4-4
		portals53.push(new Portal(150000446,16)); // 5-3 | 4-4
		portals53.push(new Portal(150000450,16)); // 5-3 | 4-4
		this.starSystem.push(new Map(93, portals53));
	}

	completeRute(imcompleteRute){
		let rute = [];
		for (let i = 0;i < imcompleteRute.length; i++) {
			let idWorkMap = imcompleteRute[i];
			let nextMap = imcompleteRute[i + 1];
			for (let e = 0;e < this.starSystem.length;e++) {
				if (this.starSystem[e].mapId == idWorkMap) {
					let map = this.starSystem[e];
					let portalschosen = this.returnANextPortal(map.portals,nextMap);
					let arrayPortals = [];
					arrayPortals.push(portalschosen);
					rute.push(new Map(map.mapId,arrayPortals));
				}
			}
		}
		return rute;
	}

	returnANextPortal(portals,idGoMap){
		for (let i = 0;i < portals.length; i++) {
			if (portals[i].idLinkedMap == idGoMap) {
				return portals[i];
			}
		}
	}

	attackMode() {
		if (window.globalSettings.autoChangeConfig && window.globalSettings.attackConfig != window.hero.shipconfig) {
			this.changeConfig();
		}
		if (window.globalSettings.changeFormation && window.globalSettings.attackFormation != this.formation) {
			this.changeFormation(window.globalSettings.attackFormation);
		}
	}

	speedMode() {
		if (window.globalSettings.autoChangeConfig) {
			if(window.globalSettings.flyingConfig != window.hero.shipconfig) {
				this.changeConfig();
			}
		}
		if (window.globalSettings.changeFormation && this.formation != window.globalSettings.flyingFormation) {
			this.changeFormation(window.globalSettings.flyingFormation);
		}
	}

	escapeMode() {
		if (window.globalSettings.autoChangeConfig) {
			if (window.globalSettings.escapeConfig != window.hero.shipconfig) {
				this.changeConfig();
			}
		}
		if (window.globalSettings.changeFormation && this.formation != window.globalSettings.escapeFormation) {
			this.changeFormation(window.globalSettings.escapeFormation);
		}
	}

	chooseAmmunition() {
		let ammunition;
		if (this.targetShip.isNpc) {
			ammunition = parseInt(window.settings.getNpc(this.targetShip.name)["ammo"]);
		} else {
			ammunition = parseInt(window.globalSettings.playerAmmo);
		}
		if (ammunition != null && ammunition > 0) {
			if (this.targetShip.shd > 200 && (ammunition == 11 || ammunition == 21 || ammunition == 31 || ammunition == 41)) {
				this.changeAmmunition(6);
			} else if (this.targetShip.shd < 200 && (ammunition == 11 || ammunition == 21 || ammunition == 31 || ammunition == 41)) {
				switch(ammunition) {
					case 11:
						this.changeAmmunition(1);
				        break;
					case 21:
						this.changeAmmunition(2);
				        break;
					case 31:
						this.changeAmmunition(3);
				        break;
					case 41:
						this.changeAmmunition(4);
				        break;
				}
			} else {
				this.changeAmmunition(ammunition);
			}
		}
	}
	
	moveForSpecialMap(finX, finY, idMap) {
		let map = null;
		let graph;
		let connectors;
		if (idMap == 91) {
			connectors = {1:{2:1},2:{1:1,3:1},3:{2:1}};
			if (this.map51 == null || this.map51.length <= 0) {
				this.completeMap51();
				return;
			} else {
			  map = this.map51;
			}
		} else if (idMap == 92) {
			connectors = {1:{2:1},2:{1:1,3:1},3:{2:1}};
			if (this.map52 == null || this.map52.length <= 0) {
				this.completeMap52();
				return;
			} else {
			  map = this.map52;
			}
		} else if (idMap == 93) {
			connectors = {1:{2:1},2:{1:1,3:1},3:{2:1,4:1},4:{3:1,5:1},5:{4:1,6:1},6:{5:1,7:5},7:{6:1,8:1},8:{7:5,9:1},9:{8:1}};
			if (this.map53 == null || this.map53.length <= 0) {
				this.completeMap53();
				return;
			} else {
			  map = this.map53;
			}
		} else if (idMap == 200) {
			connectors = {1:{2:1},2:{1:1,3:1},3:{2:1,4:1,6:1,8:1},4:{3:1,5:1},5:{4:1},6:{3:1,7:1},7:{6:1},8:{3:1,9:1},9:{8:1}};
			if (this.lowMap == null || this.lowMap.length <= 0) {
				this.completeLowMap();
				return;
			} else {
			  map = this.lowMap;
			}
		}
		
		if (map != null || map.length > 0) {
			let startZone = this.getMapIDZone(window.hero.position.x, window.hero.position.y, map);
			if (startZone != null && startZone != 0) {
				let endZone = this.getMapIDZone(finX, finY, map);
				if (endZone !=0 && startZone != endZone) {
					if (this.rutePirateMaps != null) {
						let nextZone = api.getMapZone(this.rutePirateMaps[0],map);
						if (nextZone != null) {
							if (window.hero.position.x == nextZone.conectorX && window.hero.position.y == nextZone.conectorY) {
								this.rutePirateMaps.shift();
							}
							this.move(nextZone.conectorX, nextZone.conectorY);
							window.movementDone = false;
						} else {
							this.rutePirateMaps = null;
						}
					} else {
						graph = new Graph(connectors);
						this.rutePirateMaps = graph.findShortestPath(startZone, endZone);
					}
				} else {
					this.rutePirateMaps = null;
					this.move(finX, finY);
					window.movementDone = false;
				}
			} else {
				this.rutePirateMaps = null;
				this.move(finX, finY);
				window.movementDone = false;
			}
		}
	}

	getMapZone(id, map) {
		for (let i = 0;i < map.length; i++) {
			if (map[i].id == id) {
				return map[i];
			}
		} 
	}

	getMapIDZone(x, y, map) {
		let id = 0;
		for (let i = 0;i < map.length; i++) {
			if (map[i].minX < x && map[i].maxX > x && map[i].minY < y && map[i].maxY > y) {
				id = map[i].id;
				return id;
			}
		}
		return id;
	}

	completeMap51() {
		var portals45 = {
			id: 1,
			minX: 29360,
			minY: 480,
			maxX: 41760,
			maxY: 25920,
			conectorX: 29370,
			conectorY: 23920
		};
		
		var hall1 = {
			id: 2,
			minX: 12880,
			minY: 21760,
			maxX: 29040,
			maxY: 25920,
			conectorX: 13600,
			conectorY: 23360
		};
		
		var portals52 = {
			id: 3,
			minX: 240,
			minY: 320,
			maxX: 12870,
			maxY: 25760,
			conectorX: 11760,
			conectorY: 23760
		};
		this.map51.push(portals45);
		this.map51.push(hall1);
		this.map51.push(portals52);
	}
	
	completeMap52() {
		var portals51 = {
			id: 1,
			minX: 15240,
			minY: 160,
			maxX: 20760,
			maxY: 12880,
			conectorX: 15360,
			conectorY: 11960
		};
		
		var hall1 = {
			id: 2,
			minX: 5400,
			minY: 10640,
			maxX: 15120,
			maxY: 12920,
			conectorX: 5520,
			conectorY: 11840
		};
		
		var portals53 = {
			id: 3,
			minX: 240,
			minY: 120,
			maxX: 5000,
			maxY: 12960,
			conectorX: 4640,
			conectorY: 12040
		};
		
		var base = {
			id: 4,
			minX: 9757,
			minY: 6390,
			maxX: 11212,
			maxY: 7008,
			conectorX: 11142,
			conectorY: 6810
		};
		this.map52.push(portals51);
		this.map52.push(hall1);
		this.map52.push(portals53);
		this.map52.push(base);
	}
	
	completeMap53() {
		var zone1 = {
			id: 1,
			minX: 33205,
			minY: 204,
			maxX: 41640,
			maxY: 14160,
			conectorX: 32715,
			conectorY: 13998
		};
		var hall1 = {
			id: 2,
			minX: 28747,
			minY: 13642,
			maxX: 32716,
			maxY: 14261,
			conectorX: 28932,
			conectorY: 14266
		};
		var hall2 = {
			id: 3,
			minX: 28747,
			minY: 14264,
			maxX: 29087,
			maxY: 16821,
			conectorX: 28933,
			conectorY: 16449
		};
		var hall3 = {
			id: 4,
			minX: 29304,
			minY: 16203,
			maxX: 29950,
			maxY: 16859,
			conectorX: 29915,
			conectorY: 16401
		};
		var prePalla = {
			id: 5,
			minX: 30114,
			minY: 16203,
			maxX: 32180,
			maxY: 17851,
			conectorX: 31547,
			conectorY: 17830
		};
		var palla = {
			id: 6,
			minX: 11934,
			minY: 18105,
			maxX: 32294,
			maxY: 25514,
			conectorX: 30300,
			conectorY: 18200
		};
		var mineZone = {
			id: 7,
			minX: 5214,
			minY: 210,
			maxX: 11744,
			maxY: 26346,
			conectorX: 11569,
			conectorY: 17966
		};
		var hall4 = {
			id: 8,
			minX: 3181,
			minY: 15083,
			maxX: 5156,
			maxY: 15547,
			conectorX: 5150,
			conectorY: 15379
		};
		var zone2 = {
			id: 9,
			minX: 360,
			minY: 7801,
			maxX: 2887,
			maxY: 19200,
			conectorX: 2880,
			conectorY: 15271
		};
		this.map53.push(zone1);
		this.map53.push(hall1);
		this.map53.push(hall2);
		this.map53.push(hall3);
		this.map53.push(prePalla);
		this.map53.push(palla);
		this.map53.push(mineZone);
		this.map53.push(hall4);
		this.map53.push(zone2);
	}
	
	completeLowMap() {
		//Portal ID: 150000163
		//Map ID: 200
		var hall1 = { //2
			id: 1,
			minX: 137,
			minY: 119,
			maxX: 2997,
			maxY: 13237,
			conectorX: 2576,
			conectorY: 2389
		};
		var hall2 = { //1 y 3
			id: 2,
			minX: 2939,
			minY: 117,
			maxX: 5086,
			maxY: 3904,
			conectorX: 3809,
			conectorY: 2679
		};
		var center = { //2 , 4, 6 , 8
			id: 3,
			minX: 4670,
			minY: 2796,
			maxX: 14434,
			maxY: 8188,
			conectorX: 9900,
			conectorY: 4230
		};
		var hall3 = { //3 y 5
			id: 4,
			minX: 11083,
			minY: 8502,
			maxX: 12870,
			maxY: 13050,
			conectorX: 11880,
			conectorY: 9090
		};
		var hall4 = { //4
			id: 5,
			minX: 4683,
			minY: 10045,
			maxX: 11250,
			maxY: 12870,
			conectorX: 10710,
			conectorY: 11880
		};
		var hall5 = { //3 y 7
			id: 6,
			minX: 14609,
			minY: 5963,
			maxX: 16020,
			maxY: 8820,
			conectorX: 15210,
			conectorY: 7560
		};
		var hall6 = { //6
			id: 7,
			minX: 16200,
			minY: 7020,
			maxX: 20896,
			maxY: 13209,
			conectorX: 16830,
			conectorY: 9180
		};
		var hall7 = { //3 y 9
			id: 8,
			minX: 11179,
			minY: 233,
			maxX: 16124,
			maxY: 2485,
			conectorX: 13050,
			conectorY: 1530
		};
		var hall8 = { //8
			id: 9,
			minX: 16470,
			minY: 270,
			maxX: 20861,
			maxY: 5206,
			conectorX: 17487,
			conectorY: 1324
		};
		this.lowMap.push(hall1);
		this.lowMap.push(hall2);
		this.lowMap.push(center);
		this.lowMap.push(hall3);
		this.lowMap.push(hall4);
		this.lowMap.push(hall5);
		this.lowMap.push(hall6);
		this.lowMap.push(hall7);
		this.lowMap.push(hall8);
	}
	
	attackSkills() {
		if ((window.hero.skillname == "cyborg" && this.targetShip.hp > window.globalSettings.cyborgHp)||
				(window.hero.skillName == "venom" && this.targetShip.hp > window.globalSettings.venomHp)) { 
			this.useHability();
		} else if (window.hero.skillName == "diminisher" && this.targetShip.shd > window.globalSettings.diminisherSHD){
			this.useHability();
		} else if (window.hero.skillname == "sentinel" || window.hero.skillname == "tartarus"){
			this.useHability();
		} else if (window.hero.skillname == "spearhead") {
			this.useHabilityThree();   
		}
	}
}