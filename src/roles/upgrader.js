const Creep = require("roles_Creep");

class Upgrader extends Creep {
	constructor(creep, newState = null) {
		super(creep);
		this.newState = newState;
	}

	run() {
		this.controller();
		this.setState(this.newState);
	}

	controller() {
		const { terminate, log, talk, upgrading, freeCapacity } = this.state;

		if (log) {
			this.logger([
				"log",
				"terminate",
				"freeCapacity",
				"upgrading",
				"action"
			]);
		}

		if (talk) {
			this.talk();
		}

		if (this.creep.ticksToLive < 100) {
			this.setState({ terminate: true });
		}

		if (terminate === true) {
			return this.recycle();
		}

		const usedCapacity = this.creep.store[RESOURCE_ENERGY];

		if (upgrading && usedCapacity === 0) {
			this.setState({ upgrading: false });
		}

		if (!upgrading && freeCapacity === 0) {
			this.setState({ upgrading: true });
		}

		if (upgrading) {
			return this.upgrade();
		} else {
			// return this.harvest();
			return this.pickupFromBase(Game.spawns["Spawn1"], RESOURCE_ENERGY);
		}
	}

	upgrade() {
		this.setState({ action: "⚡" });
		if (
			this.creep.upgradeController(this.creep.room.controller) ==
			ERR_NOT_IN_RANGE
		) {
			this.creep.moveTo(this.creep.room.controller, {
				visualizePathStyle: { stroke: "#ffffff" }
			});
		}
	}
}

module.exports = Upgrader;
