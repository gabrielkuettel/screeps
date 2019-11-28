const Creep = require("roles_Creep");

// inherits
// this.creep, this.state
// this.recycle(), this.logger(), this.setState()

class Harvester extends Creep {
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

		if (terminate === true) {
			return this.recycle();
		}

		if (freeCapacity > 0) {
			this.setState({ harvesting: true });
		} else if (freeCapacity === 0) {
			this.setState({ harvesting: false });
		}

		if (harvesting) {
			return this.harvest(1);
		}

		if (!harvesting) {
			return this.drop();
			// return this.deposit();
		}
	}
}

module.exports = Harvester;
