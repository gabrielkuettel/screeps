const Creep = require("roles_Creep");

// inherits
// this.creep, this.state
// this.recycle(), this.logger(), this.setState()

class HarvesterSecondary extends Creep {
	constructor(creep, newState = null) {
		super(creep);
		this.newState = newState;
	}

	run() {
		this.controller();
		this.setState(this.newState);
	}

	controller() {
		const { terminate, log, talk, harvesting, freeCapacity } = this.state;

		if (log) {
			this.logger([
				"log",
				"terminate",
				"freeCapacity",
				"harvesting",
				"action"
			]);
		}

		if (talk) {
			this.talk();
		}

		if (this.creep.ticksToLive < 50) {
			this.setState({ terminate: true });
		}

		if (terminate === true) {
			return this.recycle();
		}

		if (freeCapacity > 0) {
			this.setState({ harvesting: true });
		} else {
			this.setState({ harvesting: false });
		}

		if (harvesting) {
			return this.harvest(0);
		}

		if (!harvesting) {
			// return this.drop();
			return this.deposit();
		}
	}
}

module.exports = HarvesterSecondary;
