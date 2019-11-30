const Base = require("roles_Base");

// inherits
// this.creep, this.state
// this.recycle(), this.logger(), this.setState()

class Hauler extends Base {
	constructor(creep, newState = null, timeToLive = 100) {
		super(creep);
		this.newState = newState;
		this.timeToLive = timeToLive;
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

		if (this.creep.ticksToLive < this.timeToLive) {
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
