class Pet {
    constructor(id) {
		this.id = id;
		this.destroyed = false;
		this.activated = false;
		this.currentModule = -1;
		this.activateTimer = $.now();
		this.moduleCooldown = -1;
	}
}