/**
 * Created by Alph4rd on 28.09.2018
 */

class HeroAffectedHandler {
	static get ID() {
		return 2049;
	}

	constructor(f) {
		this._handler = function (e, a) {
			let obj = JSON.parse(e.detail);
			
			/**
			 * 16 | Spectrum Hability | Hero
			 * 20 | Venom Hability | Target 
			 * Count: 1 - Activated | activated: true
			 * Count: 2 - Activated | activated: true
			 * Count: 0 - finished | activated: false
			 */
			
			if(obj.userId == window.hero.id && obj.modifier == 26){
				if(obj.count == 1 ){
					window.invertedMovement = true;
				}else{
					window.invertedMovement = false;
				}
			}
		}
	}
	get handler() {
		return this._handler;
	}
}