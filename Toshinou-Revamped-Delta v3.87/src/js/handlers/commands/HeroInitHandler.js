class HeroInitHandler {
	static get ID() {
		return 10810;
	}

	constructor(f) {
		this._handler = function (e, a) {
			e.detail = e.wholeMessage.split("|").slice(1).join("");
			a.ships = [];
			a.boxes = {};
			a.gates = [];
			a.heroDied = false;
			a.resetTarget("all");
			a.battlestation = null;
			a.pet = null;
			a.jumped = false;
			a.jumpTime = $.now();
			Injector.injectScript("window.heroDied = false;");
			
			if (window.globalSettings.enablePet) {
				a.pet = new Pet(0);
			}

			let heroJson = JSON.parse(e.detail);
			if (window.hero == null) {
				if (!(window.globalSettings.blackList).includes(heroJson.userId.toString())) {
					window.hero = new Hero(heroJson.x, heroJson.y, heroJson.factionId, heroJson.userId, heroJson.mapId);;
				}
			}
			window.hero.maxHp = heroJson[Variables.heroInitMaxHp];
			window.hero.hp = heroJson[Variables.heroInitHp];
			window.hero.maxShd = heroJson[Variables.heroInitMaxShd];
			window.hero.shd = heroJson["shield"];
			window.hero.mapId = heroJson["mapId"];
			window.hero.skillName  = a.getShipName(heroJson["typeId"]);

			if (window.hero.mapId == 16 || window.hero.mapId == 29 || window.hero.mapId == 91 || window.hero.mapId == 93) {
				window.b1 = 42000 / 300;
				window.b2 = 26200 / 150;
				window.b3 = 700;
				window.bigMap = true;
			} else {
				window.b1 = 21000 / 300;
				window.b2 = 13100 / 150;
				window.b3 = 350;
				window.bigMap = false;
			}

			if (window.hero.mapId == 1 || window.hero.mapId == 5 || window.hero.mapId == 9) {
				window.X1Map = true;
			} else {
				window.X1Map = false;
			}

			f();
			window.initialized = true;
		}
	}

	get handler() {
		return this._handler;
	}
}

