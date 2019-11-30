const Base = require("roles_Base");

// inherits
// this.creep, this.state
// this.recycle(), this.logger(), this.setState()

class Hauler extends Base {
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

		if (this.creep.ticksToLive < 100) {
			this.setState({ terminate: true });
		}

		if (terminate === true) {
			return this.recycle();
		}

		if (freeCapacity > 0) {
			this.setState({ hauling: true });
		}

		if (freeCapacity === 0) {
			this.setState({ hauling: false });
		}

		if (hauling) {
			return this.haul();
		}

		if (!hauling) {
			return this.deposit();
		}
	}
}

module.exports = Hauler;
