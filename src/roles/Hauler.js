const Creep = require("roles_Creep");

// inherits
// this.creep, this.state
// this.recycle(), this.logger(), this.setState()

class Hauler extends Creep {
	constructor(creep, newState = null) {
		super(creep);
		this.newState = newState;
	}

	run() {
		this.controller();
		this.setState(this.newState);
	}

	controller() {
		const { terminate, log, talk, hauling, freeCapacity } = this.state;

		if (log) {
			this.logger(["log", "terminate", "freeCapacity", "hauling", "action"]);
		}

		if (talk) {
			this.talk();
		}

		if (terminate === true) {
			return this.recycle();
		}

		if (freeCapacity > 0) {
			this.setState({ hauling: true });
		} else if (freeCapacity === 0) {
			this.setState({ hauling: false });
		}

		if (hauling) {
			return this.haul();
		}

		if (!hauling) {
			return this.deposit();
		}
	}

	haul() {
		this.setState({ action: "🧺" });
		const target = this.creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES);
		if (target && this.creep.pickup(target) === ERR_NOT_IN_RANGE) {
			this.creep.moveTo(target);
		} else {
			this.setState({ action: undefined });
		}
	}
}

module.exports = Hauler;