class HeroDiedHandler {
	static get ID() {
		return 12034;
	}

	constructor() {
		this._handler = function (e, a) {
			let parsedJson = JSON.parse(e.detail);
			a.markHeroAsDead();
			window.fleeFromEnemy = false;
			window.setTimeout(function () {
				if (parsedJson.options.length >= 2 && (window.globalSettings.reviveLimit == 0 || window.globalSettings.reviveLimit > window.reviveCount)) {
					if (window.globalSettings.reviveType == 0) {
						Injector.injectScript("document.getElementById('preloader').revive(0);");
					} else if (window.globalSettings.reviveType == 1) {
						Injector.injectScript("document.getElementById('preloader').revive(1);");
					} else if (window.globalSettings.reviveType == 2) {
						Injector.injectScript("document.getElementById('preloader').revive(2);");
					}
					window.settings.waitingAfterDead = true;
					setTimeout(function(){
						window.settings.waitingAfterDead = false;
					},window.globalSettings.waitafterRepair*1000*60);

					window.reviveCount++;
					a.isRepairing = true;
					let event = new CustomEvent("deathCounter", {
						detail: {
							death: 1,
						}
					});
					window.dispatchEvent(event);
				} else if (parsedJson.options.length == 1 && (window.globalSettings.reviveLimit == 0 || window.globalSettings.reviveLimit > window.reviveCount)) {
					if (window.globalSettings.reviveType == 0) {
						Injector.injectScript("document.getElementById('preloader').revive(0);");
					}
					window.settings.waitingAfterDead = true;
					setTimeout(function(){
						window.settings.waitingAfterDead = false;
					},window.globalSettings.waitafterRepair*1000*60);

					window.reviveCount++;
					a.isRepairing = true;
					let event = new CustomEvent("deathCounter", {
						detail: {
							death: 1,
						}
					});
					window.dispatchEvent(event);
				}
			}, window.globalSettings.waitBeforeRepair*1000);
		}
	}

	get handler() {
		return this._handler;
	}
}