class MessagesHandler {

	static get ID() {
		return 10725;
	}

	constructor() {
		this._handler = (e, a) => {

			let _events = {
					'CRE': 'credits',
					'BAT': 'ammo',
					'XEN': 'ggEnergy',
					'URI': 'uridium',
					'EP': 'experience',
					'HON': 'honor',
			};
			let s = e.wholeMessage.split("|");
			s.splice(0, 1);
			s = JSON.parse(s.join('|'));
			let message = s.message.split('|');

			if ("KIK" == message[1]) {
				this.connection({
					connected: false,
					status: 'off'
				});
			}

			if("SLA" == message[2]){
				if(message.length == 5) {
					this.palladium(message);
				}
				this.connection({
					connected: true,
					status: 'on'
				});
			}
			
			if ("A" == message[1]) {
				if(message[2] == "STM"){
					if(message[3] == "msg_pet_out_of_fuel"){
						if (a.pet != null) {
							a.petHasFuel = false;
							a.pet.activated = false;
							a.pet.currentModule = -1;
						}
					}
				}
				this.connection({
					connected: true,
					status: 'on'
				});
			}
			
			if ("f" == message[1]) {
				window.hero.cargoIsFull = true;
			}
			
			if (_events.hasOwnProperty(message[3])) {
				this[_events[message[3]]](message);
			}
		};
	}

	credits(message) {
		let event = new CustomEvent("addCredits", {
			detail: {
				credits: message[4],
				totatCredits: message[5]
			}
		});
		window.dispatchEvent(event);
	}

	ammo(message) {

		let ammoTypes = {
				'ammunition_laser_lcb-10': 'LCB-10',
				'ammunition_laser_mcb-25': 'MCB-25',
				'ammunition_laser_mcb-50': 'MCB-50',
		};

		let event = new CustomEvent("addAmmo", {
			detail: {
				ammo: message[5],
				ammoType: ammoTypes[message[4]] ? ammoTypes[message[4]] : message[4]
			}
		});
		window.dispatchEvent(event);
	}

	ggEnergy(message) {
		let event = new CustomEvent("addGgEnergy", {
			detail: {
				energy: message[4]
			}
		});
		window.dispatchEvent(event);
	}

	uridium(message) {
		let event = new CustomEvent("addUridium", {
			detail: {
				uridium: message[4],
				totatUridium: message[5]
			}
		});
		window.dispatchEvent(event);
	}

	experience(message) {
		let event = new CustomEvent("addExperience", {
			detail: {
				experience: message[4],
				totalExperience: message[5],
				lvl: message[6]
			}
		});
		window.dispatchEvent(event);
	}

	honor(message) {
		let event = new CustomEvent("addHonor", {
			detail: {
				honor: message[4],
				totalHonor: message[5]
			}
		});
		window.dispatchEvent(event);
	}

	palladium(message) {
		let event = new CustomEvent("addPalladium", {
			detail: {
				palladium: 1
			}
		});
		window.dispatchEvent(event);
	}

	connection({
		connected,
		status
	}) {
		window.dispatchEvent(new CustomEvent("connection", {
			detail: {
				connected,
				status
			}
		}));
	}

	get handler() {
		return this._handler;
	}

}