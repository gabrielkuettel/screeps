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
			return this.deposit();
		}
	}

	deposit(index = 0) {
		this.setState({ action: "➡️" });
		const targets = this.creep.room.find(FIND_STRUCTURES, {
			filter: structure => {
				return (
					(structure.structureType == STRUCTURE_EXTENSION ||
						structure.structureType == STRUCTURE_SPAWN ||
						structure.structureType == STRUCTURE_TOWER) &&
					structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
				);
			}
		});

		if (targets.length > 0) {
			if (
				this.creep.transfer(targets[index], RESOURCE_ENERGY) ==
				ERR_NOT_IN_RANGE
			) {
				this.creep.moveTo(targets[index]);
			}
		} else {
			this.setState({ action: undefined });
			this.creep.moveTo(targets[index]);
		}

		return targets[index];
	}
}

module.exports = Harvester;
