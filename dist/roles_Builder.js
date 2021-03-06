const Base = require("roles_Base");

// inherits
// this.creep, this.state
// this.recycle(), this.logger(), this.setState()

class Builder extends Base {
	constructor(creep, newState = null, timeToLive = 100) {
		super(creep);
		this.newState = newState;
		this.timeToLive = timeToLive;
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
			building,
			freeCapacity,
			usedCapacity
		} = this.state;

		if (log) {
			this.logger([
				"log",
				"terminate",
				"freeCapacity",
				"building",
				"action"
			]);
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

		if (building && usedCapacity === 0) {
			this.setState({ building: false });
		}

		if (!building && freeCapacity === 0) {
			this.setState({ building: true });
		}

		if (building) {
			return this.build();
		} else {
			// return this.harvest();
			return this.pickupFromBase(Game.spawns["Spawn1"], RESOURCE_ENERGY);
		}
	}

	build() {
		this.setState({ action: "🚧" });
		const targets = this.creep.room.find(FIND_CONSTRUCTION_SITES);
		if (targets.length) {
			if (this.creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
				this.creep.moveTo(targets[0], {
					visualizePathStyle: { stroke: "#ffffff" }
				});
			}
		}
	}
}

module.exports = Builder;
