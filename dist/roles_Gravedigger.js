const Base = require("roles_Base");

// inherits
// this.creep, this.state
// this.recycle(), this.logger(), this.setState()

class Gravedigger extends Base {
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
		const { terminate, log, talk, digging, freeCapacity } = this.state;

		if (log) {
			this.logger(["log", "terminate", "freeCapacity", "digging", "action"]);
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
			this.setState({ digging: true });
		}

		if (freeCapacity === 0) {
			this.setState({ digging: false });
		}

		if (digging) {
			console.log("digging now");
			return this.withdrawFromSource(FIND_TOMBSTONES, "⚰️");
		}

		if (!digging) {
			console.log("deposit now");
			return this.deposit(0, "Flag1");
		}
	}
}

module.exports = Gravedigger;
