const Base = require("roles_Base");

class Architect extends Base {
	constructor(creep, newState = null, timeToDie = 100) {
		super(creep);
		this.newState = newState;
		this.timeToDie = timeToDie;
	}

	run() {
		this.controller();
		this.setState(this.newState);
		// console.log(this.creep.ticksToLive);
	}

	controller() {
		const {
			terminate,
			log,
			talk,
			architecting,
			freeCapacity,
			usedCapacity
		} = this.state;

		if (log) {
			this.logger([
				"log",
				"terminate",
				"freeCapacity",
				"architecting",
				"action"
			]);
		}

		if (talk) {
			this.talk();
		}

		if (this.creep.ticksToLive < this.timeToDie) {
			this.setState({ terminate: true });
		}

		if (terminate === true) {
			return this.recycle();
		}

		if (architecting && usedCapacity === 0) {
			this.setState({ architecting: false });
		}

		if (!architecting && freeCapacity === 0) {
			this.setState({ architecting: true });
		}

		if (architecting) {
			// return this.build();
		} else {
			// return this.harvest();
			// return this.pickupFromBase(Game.spawns["Spawn1"], RESOURCE_ENERGY);
		}
	}
}

module.exports = Architect;
